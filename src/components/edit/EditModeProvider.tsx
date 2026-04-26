import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Pencil, Plus, X } from "lucide-react";
import { cardStore, pathFor, textStore } from "./editStore";
import ToastHost, { showToast } from "./Toast";

const EDIT_KEY = "lov_edit_mode_v1";

// Tags whose direct text content we treat as editable.
const TEXT_TAGS = new Set([
  "H1","H2","H3","H4","H5","H6",
  "P","SPAN","A","BUTTON","LI","STRONG","EM","SMALL","LABEL","BLOCKQUOTE",
]);

// Skip our own UI + nav controls we don't want broken.
function isInEditUI(el: Element) {
  return !!el.closest("[data-edit-ui]");
}

// Heuristic for "card grids": a container whose children are sibling card-like blocks.
// We mark them with data-card-grid via a manual list of selectors below.
const CARD_GRID_SELECTORS = [
  "[data-card-grid]", // explicit opt-in if components add it
];

function getEditableTextEls(root: HTMLElement): HTMLElement[] {
  const out: HTMLElement[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) => {
      const el = n as HTMLElement;
      if (isInEditUI(el)) return NodeFilter.FILTER_REJECT;
      if (!TEXT_TAGS.has(el.tagName)) return NodeFilter.FILTER_SKIP;
      // must contain meaningful direct text (not just nested elements)
      const hasDirectText = Array.from(el.childNodes).some(
        (c) => c.nodeType === Node.TEXT_NODE && (c.textContent || "").trim().length > 0,
      );
      // For SPAN/A/BUTTON allow even if all text is nested as long as text content exists & no editable child of same kind
      const text = (el.textContent || "").trim();
      if (!text) return NodeFilter.FILTER_SKIP;
      // Avoid double-marking: prefer leaf-most element with text
      const hasEditableChild = Array.from(el.querySelectorAll("*")).some((c) =>
        TEXT_TAGS.has((c as HTMLElement).tagName) && (c.textContent || "").trim() === text,
      );
      if (hasEditableChild && !hasDirectText) return NodeFilter.FILTER_SKIP;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  let cur = walker.nextNode();
  while (cur) {
    out.push(cur as HTMLElement);
    cur = walker.nextNode();
  }
  return out;
}

function applyStoredTexts(root: HTMLElement) {
  const map = textStore.getAll();
  if (!Object.keys(map).length) return;
  const els = getEditableTextEls(root);
  els.forEach((el) => {
    const key = pathFor(el);
    const stored = map[key];
    if (stored != null && el.innerText !== stored) {
      // Replace only direct text nodes, keep child elements intact when possible.
      const hasOnlyText = Array.from(el.childNodes).every((c) => c.nodeType === Node.TEXT_NODE);
      if (hasOnlyText) {
        el.textContent = stored;
      } else {
        // Fallback: replace innerText (loses children) only if structure is purely text.
        const directTextNodes = Array.from(el.childNodes).filter((c) => c.nodeType === Node.TEXT_NODE);
        if (directTextNodes.length === 1 && el.children.length === 0) {
          directTextNodes[0].textContent = stored;
        } else {
          // skip — too risky to alter mixed nodes
        }
      }
    }
  });
}

function applyCardOps(root: HTMLElement) {
  const all = cardStore.getAll();
  Object.keys(all).forEach((gridKey) => {
    // find grid by key
    const grids = root.querySelectorAll<HTMLElement>(CARD_GRID_SELECTORS.join(","));
    grids.forEach((g) => {
      if (pathFor(g) !== gridKey) return;
      const state = all[gridKey];
      // Hide deleted cards
      const cards = Array.from(g.children) as HTMLElement[];
      cards.forEach((c, i) => {
        const cid = c.getAttribute("data-card-id") || `idx:${i}`;
        if (state.deletedIds.includes(cid)) {
          c.style.display = "none";
          c.setAttribute("data-edit-deleted", "1");
        }
      });
      // Append added cards (clones of last visible card with placeholder text)
      state.added.forEach((entry) => {
        if (g.querySelector(`[data-added-id="${entry.id}"]`)) return;
        const tmpl = (Array.from(g.children).find(
          (c) => (c as HTMLElement).style.display !== "none" && !c.hasAttribute("data-added-id"),
        ) as HTMLElement) || (g.lastElementChild as HTMLElement);
        if (!tmpl) return;
        const clone = tmpl.cloneNode(true) as HTMLElement;
        clone.setAttribute("data-added-id", entry.id);
        clone.setAttribute("data-card-id", `added:${entry.id}`);
        // Replace text nodes with placeholders
        const texts = clone.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,li,a,button");
        let titleSet = false;
        texts.forEach((t) => {
          if (!t.children.length && (t.textContent || "").trim()) {
            if (!titleSet && /H[1-6]/.test(t.tagName)) {
              t.textContent = "New Title";
              titleSet = true;
            } else {
              t.textContent = "Description goes here";
            }
          }
        });
        g.appendChild(clone);
      });
    });
  });
}

export default function EditModeProvider({ children }: { children: React.ReactNode }) {
  const [editMode, setEditMode] = useState<boolean>(() => {
    try { return localStorage.getItem(EDIT_KEY) === "1"; } catch { return false; }
  });
  const [, force] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const rerender = () => force((n) => n + 1);

  useEffect(() => {
    try { localStorage.setItem(EDIT_KEY, editMode ? "1" : "0"); } catch { /* */ }
  }, [editMode]);

  // Apply stored texts + card ops after each render.
  useLayoutEffect(() => {
    const root = document.body;
    applyStoredTexts(root);
    applyCardOps(root);
  });

  // Wire up contentEditable + outlines whenever editMode changes or DOM updates.
  useEffect(() => {
    const root = document.body;

    const els = getEditableTextEls(root);
    const cleanups: Array<() => void> = [];

    els.forEach((el) => {
      const key = pathFor(el);
      el.setAttribute("data-edit-key", key);
      if (editMode) {
        el.setAttribute("contenteditable", "true");
        el.classList.add("lov-editable");
        const onFocus = () => el.classList.add("lov-editable-focus");
        const onBlur = () => {
          el.classList.remove("lov-editable-focus");
          const val = el.innerText.replace(/\\u00A0/g, " ");
          textStore.set(key, val);
        };
        // Prevent <a> navigation while editing
        const onClick = (e: MouseEvent) => {
          if (el.tagName === "A" || el.tagName === "BUTTON") e.preventDefault();
        };
        const onKey = (e: KeyboardEvent) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            (el as HTMLElement).blur();
          }
        };
        el.addEventListener("focus", onFocus);
        el.addEventListener("blur", onBlur);
        el.addEventListener("click", onClick);
        el.addEventListener("keydown", onKey);
        cleanups.push(() => {
          el.removeEventListener("focus", onFocus);
          el.removeEventListener("blur", onBlur);
          el.removeEventListener("click", onClick);
          el.removeEventListener("keydown", onKey);
        });
      } else {
        el.removeAttribute("contenteditable");
        el.classList.remove("lov-editable", "lov-editable-focus");
      }
    });

    return () => cleanups.forEach((fn) => fn());
  });

  // Card overlay buttons (delete + add) — render as portals positioned over each card/grid.
  const cards = editMode ? Array.from(document.querySelectorAll<HTMLElement>("[data-card-grid] > *")).filter(
    (c) => c.style.display !== "none",
  ) : [];
  const grids = editMode ? Array.from(document.querySelectorAll<HTMLElement>("[data-card-grid]")) : [];

  // Re-render overlay positions on scroll/resize
  useEffect(() => {
    if (!editMode) return;
    const onChange = () => rerender();
    window.addEventListener("scroll", onChange, true);
    window.addEventListener("resize", onChange);
    const obs = new MutationObserver(onChange);
    obs.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => {
      window.removeEventListener("scroll", onChange, true);
      window.removeEventListener("resize", onChange);
      obs.disconnect();
    };
  }, [editMode]);

  const handleDelete = (gridKey: string, cardId: string, el: HTMLElement) => {
    const grid = el.parentElement!;
    const visible = Array.from(grid.children).filter(
      (c) => (c as HTMLElement).style.display !== "none",
    );
    if (visible.length <= 1) {
      showToast("Cannot delete the last card");
      return;
    }
    el.style.transition = "opacity 300ms, transform 300ms";
    el.style.opacity = "0";
    el.style.transform = "scale(0.95)";
    setTimeout(() => {
      // Persist
      if (cardId.startsWith("added:")) {
        const id = cardId.slice("added:".length);
        const state = cardStore.get(gridKey);
        cardStore.setAdded(gridKey, state.added.filter((a) => a.id !== id));
      } else {
        const state = cardStore.get(gridKey);
        cardStore.setDeleted(gridKey, [...state.deletedIds, cardId]);
      }
      el.style.display = "none";
      showToast("Card deleted");
      rerender();
    }, 300);
  };

  const handleAdd = (gridKey: string) => {
    const id = `${Date.now()}`;
    const state = cardStore.get(gridKey);
    cardStore.setAdded(gridKey, [...state.added, { id, html: "" }]);
    showToast("Card added");
    rerender();
  };

  return (
    <>
      {children}
      <ToastHost />

      {/* Floating Edit Mode toggle */}
      <button
        data-edit-ui
        onClick={() => setEditMode((v) => !v)}
        className="fixed top-4 left-4 z-[9999] flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium transition-all hover:scale-105"
        style={{
          background: editMode ? "rgba(31,143,203,0.92)" : "rgba(15,23,42,0.7)",
          color: "#fff",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(31,143,203,0.5)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
        }}
        aria-pressed={editMode}
      >
        <Pencil size={13} />
        <span>{editMode ? "Editing" : "Edit Mode"}</span>
      </button>

      {/* Overlay UI for cards */}
      {editMode && (
        <div ref={overlayRef} data-edit-ui className="pointer-events-none fixed inset-0 z-[9998]">
          {cards.map((card, i) => {
            const grid = card.parentElement as HTMLElement;
            const gridKey = pathFor(grid);
            const cardId =
              card.getAttribute("data-card-id") ||
              (card.hasAttribute("data-added-id")
                ? `added:${card.getAttribute("data-added-id")}`
                : `idx:${Array.from(grid.children).indexOf(card)}`);
            const r = card.getBoundingClientRect();
            return (
              <div
                key={`${gridKey}-${cardId}-${i}`}
                style={{
                  position: "absolute",
                  top: r.top,
                  left: r.left,
                  width: r.width,
                  height: r.height,
                  border: "1.5px dashed rgba(31,143,203,0.55)",
                  borderRadius: 8,
                  pointerEvents: "none",
                }}
              >
                <button
                  onClick={() => handleDelete(gridKey, cardId, card)}
                  className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110"
                  style={{ background: "#ef4444", pointerEvents: "auto" }}
                  aria-label="Delete card"
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}

          {grids.map((grid, i) => {
            const gridKey = pathFor(grid);
            const r = grid.getBoundingClientRect();
            return (
              <button
                key={`add-${gridKey}-${i}`}
                onClick={() => handleAdd(gridKey)}
                className="flex flex-col items-center justify-center gap-1 text-xs font-medium transition-all hover:scale-[1.02]"
                style={{
                  position: "absolute",
                  top: r.bottom + 8,
                  left: r.left,
                  width: r.width,
                  minHeight: 64,
                  border: "2px dashed rgba(31,143,203,0.55)",
                  borderRadius: 10,
                  background: "rgba(31,143,203,0.05)",
                  color: "#1F8FCB",
                  pointerEvents: "auto",
                }}
              >
                <Plus size={18} />
                <span>Add card</span>
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
