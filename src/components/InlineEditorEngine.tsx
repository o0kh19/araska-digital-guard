import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useEditMode } from "./EditModeProvider";

/**
 * Non-invasive inline editor:
 * - Walks the DOM and marks leaf text elements as contentEditable when edit mode is on.
 * - Persists edited text to localStorage keyed by a stable selector path.
 * - Restores saved text on every render.
 * - Detects "card grids" (a parent whose direct children are visually similar blocks)
 *   and injects an "Add card" button + per-card delete (×) buttons.
 *
 * Existing component code is untouched. Buttons keep their click handlers because we
 * only set contentEditable on their inner text — not replace the element.
 */

const STORAGE_KEY = "araska_inline_edits_v1";
const CARD_REMOVED_KEY = "araska_removed_cards_v1";
const CARD_ADDED_KEY = "araska_added_cards_v1";

type EditMap = Record<string, string>;

const loadMap = (k: string): EditMap => {
  try {
    return JSON.parse(localStorage.getItem(k) || "{}");
  } catch {
    return {};
  }
};
const saveMap = (k: string, m: EditMap) => localStorage.setItem(k, JSON.stringify(m));

const loadArr = (k: string): string[] => {
  try {
    return JSON.parse(localStorage.getItem(k) || "[]");
  } catch {
    return [];
  }
};
const saveArr = (k: string, a: string[]) => localStorage.setItem(k, JSON.stringify(a));

/** Build a stable selector path for an element relative to <main> / <footer> / <header>. */
const getPath = (el: Element): string => {
  const parts: string[] = [];
  let cur: Element | null = el;
  while (cur && cur !== document.body) {
    const parent: Element | null = cur.parentElement;
    if (!parent) break;
    const siblings = Array.from(parent.children);
    const idx = siblings.indexOf(cur);
    parts.unshift(`${cur.tagName.toLowerCase()}:${idx}`);
    cur = parent;
  }
  return parts.join(">");
};

const TEXT_TAGS = new Set([
  "H1", "H2", "H3", "H4", "H5", "H6",
  "P", "SPAN", "A", "BUTTON", "LI", "STRONG", "EM", "LABEL", "SMALL",
]);

/** Returns true if element contains only text (no element children that should be kept editable separately). */
const isPureTextLeaf = (el: Element): boolean => {
  if (!TEXT_TAGS.has(el.tagName)) return false;
  if (el.childElementCount === 0 && (el.textContent || "").trim().length > 0) return true;
  return false;
};

const InlineEditorEngine = () => {
  const { editMode } = useEditMode();
  const editsRef = useRef<EditMap>(loadMap(STORAGE_KEY));
  const removedRef = useRef<string[]>(loadArr(CARD_REMOVED_KEY));
  const addedRef = useRef<EditMap>(loadMap(CARD_ADDED_KEY)); // path -> serialized html

  // Restore saved text + apply removed/added cards. Runs on mount + when edit mode toggles + on mutations.
  useEffect(() => {
    let mo: MutationObserver | null = null;
    let raf = 0;

    const apply = () => {
      // 1) Restore text edits
      const edits = editsRef.current;
      Object.entries(edits).forEach(([path, val]) => {
        const el = resolvePath(path);
        if (el && el.textContent !== val) el.textContent = val;
      });

      // 2) Hide removed cards
      removedRef.current.forEach((path) => {
        const el = resolvePath(path);
        if (el) (el as HTMLElement).style.display = "none";
      });

      // 3) Editable wiring
      const root = document.querySelector("main") || document.body;
      const candidates = root.querySelectorAll<HTMLElement>(
        "h1,h2,h3,h4,h5,h6,p,li,button,a,span,label,small,strong,em"
      );
      candidates.forEach((el) => {
        if (el.closest("[data-no-edit]")) return;
        if (el.closest(".edit-toolbar")) return;
        if (!isPureTextLeaf(el)) return;
        // Don't make icon-only buttons editable
        if (el.tagName === "BUTTON" && (el.textContent || "").trim().length === 0) return;

        const path = getPath(el);
        el.dataset.editPath = path;

        if (editMode) {
          el.setAttribute("contenteditable", "true");
          el.classList.add("inline-editable");
          el.addEventListener("blur", onBlur);
          el.addEventListener("keydown", onKeyDown);
          el.addEventListener("click", stopIfButton);
        } else {
          el.removeAttribute("contenteditable");
          el.classList.remove("inline-editable");
          el.removeEventListener("blur", onBlur);
          el.removeEventListener("keydown", onKeyDown);
          el.removeEventListener("click", stopIfButton);
        }
      });

      // 4) Card grid controls
      injectCardControls(editMode);
    };

    const onBlur = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const path = el.dataset.editPath;
      if (!path) return;
      const val = el.textContent || "";
      editsRef.current[path] = val;
      saveMap(STORAGE_KEY, editsRef.current);
    };
    const onKeyDown = (e: Event) => {
      const ke = e as KeyboardEvent;
      if (ke.key === "Enter" && !(ke.shiftKey)) {
        ke.preventDefault();
        (e.currentTarget as HTMLElement).blur();
      }
    };
    // Prevent clicks on links/buttons from navigating while editing the text inside.
    const stopIfButton = (e: Event) => {
      if (!editMode) return;
      const el = e.currentTarget as HTMLElement;
      if (el.tagName === "A" || el.tagName === "BUTTON") {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const resolvePath = (path: string): Element | null => {
      const parts = path.split(">");
      let cur: Element = document.body;
      for (const p of parts) {
        const [, idxStr] = p.split(":");
        const idx = parseInt(idxStr, 10);
        const child = cur.children[idx];
        if (!child) return null;
        cur = child;
      }
      return cur;
    };

    const injectCardControls = (active: boolean) => {
      // Cleanup previous controls
      document.querySelectorAll(".edit-card-delete, .edit-card-add").forEach((n) => n.remove());
      document.querySelectorAll(".edit-card-host").forEach((n) => n.classList.remove("edit-card-host"));

      if (!active) return;

      // Heuristic: find grid containers (Tailwind "grid" class) with >=2 element children of similar tag.
      const grids = document.querySelectorAll<HTMLElement>("main [class*='grid-cols']");
      grids.forEach((grid) => {
        const children = Array.from(grid.children).filter(
          (c) => (c as HTMLElement).style.display !== "none"
        );
        if (children.length < 2) return;
        // Same tag for first two children → treat as card grid
        if (children[0].tagName !== children[1].tagName) return;

        children.forEach((card) => {
          const cardEl = card as HTMLElement;
          cardEl.classList.add("edit-card-host");
          // delete button
          const del = document.createElement("button");
          del.className = "edit-card-delete";
          del.setAttribute("data-no-edit", "");
          del.setAttribute("aria-label", "Delete card");
          del.textContent = "×";
          del.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const visible = Array.from(grid.children).filter(
              (c) => (c as HTMLElement).style.display !== "none" && c !== cardEl
            );
            if (visible.length < 1) {
              toast.error("Cannot delete the last card");
              return;
            }
            cardEl.style.transition = "opacity .25s ease, transform .25s ease";
            cardEl.style.opacity = "0";
            cardEl.style.transform = "scale(.95)";
            setTimeout(() => {
              cardEl.style.display = "none";
              const path = getPath(cardEl);
              if (!removedRef.current.includes(path)) {
                removedRef.current.push(path);
                saveArr(CARD_REMOVED_KEY, removedRef.current);
              }
              toast.success("Card deleted");
            }, 250);
          });
          cardEl.appendChild(del);
        });

        // add button
        const add = document.createElement("button");
        add.className = "edit-card-add";
        add.setAttribute("data-no-edit", "");
        add.setAttribute("aria-label", "Add new card");
        add.innerHTML = "<span>+ Add card</span>";
        add.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const template = Array.from(grid.children).find(
            (c) => (c as HTMLElement).style.display !== "none" && !c.classList.contains("edit-card-add")
          ) as HTMLElement | undefined;
          if (!template) return;
          const clone = template.cloneNode(true) as HTMLElement;
          // wipe deletion controls inside clone and reset
          clone.querySelectorAll(".edit-card-delete, .edit-card-add").forEach((n) => n.remove());
          clone.style.display = "";
          clone.style.opacity = "0";
          // Replace text content of leaf text nodes with placeholders
          const titleEl = clone.querySelector("h1,h2,h3,h4,h5,h6");
          if (titleEl) titleEl.textContent = "New Title";
          const paraEl = clone.querySelector("p");
          if (paraEl) paraEl.textContent = "Description goes here";
          // Insert before the add button
          grid.insertBefore(clone, add);
          requestAnimationFrame(() => {
            clone.style.transition = "opacity .3s ease";
            clone.style.opacity = "1";
            apply(); // re-wire editable + add delete button to new card
          });
          toast.success("Card added");
        });
        grid.appendChild(add);
      });
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };

    schedule();
    mo = new MutationObserver(() => schedule());
    mo.observe(document.body, { childList: true, subtree: true, characterData: false });

    return () => {
      mo?.disconnect();
      cancelAnimationFrame(raf);
      // Cleanup attributes when unmounting
      document.querySelectorAll<HTMLElement>(".inline-editable").forEach((el) => {
        el.removeAttribute("contenteditable");
        el.classList.remove("inline-editable");
      });
      document.querySelectorAll(".edit-card-delete, .edit-card-add").forEach((n) => n.remove());
    };
  }, [editMode]);

  return null;
};

export default InlineEditorEngine;
