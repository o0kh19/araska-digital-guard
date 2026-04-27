import { useEffect, useRef, useState } from "react";
import { Pencil, Plus, X } from "lucide-react";
import { cardStore, pathFor, styleStore, textStore } from "./editStore";
import ToastHost, { showToast } from "./Toast";
import FontToolbar from "./FontToolbar";

const EDIT_KEY = "lov_edit_mode_v1";

const TEXT_TAGS = new Set([
  "H1","H2","H3","H4","H5","H6",
  "P","SPAN","A","BUTTON","LI","STRONG","EM","SMALL","LABEL","BLOCKQUOTE",
]);

function isInEditUI(el: Element) {
  return !!el.closest("[data-edit-ui]");
}

const CARD_GRID_SELECTORS = ["[data-card-grid]"];

function getEditableTextEls(root: HTMLElement): HTMLElement[] {
  const out: HTMLElement[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) => {
      const el = n as HTMLElement;
      if (isInEditUI(el)) return NodeFilter.FILTER_REJECT;
      if (!TEXT_TAGS.has(el.tagName)) return NodeFilter.FILTER_SKIP;
      const hasDirectText = Array.from(el.childNodes).some(
        (c) => c.nodeType === Node.TEXT_NODE && (c.textContent || "").trim().length > 0,
      );
      const text = (el.textContent || "").trim();
      if (!text) return NodeFilter.FILTER_SKIP;
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

// One-time application of stored texts to the DOM. Never run during typing.
function applyStoredTexts(root: HTMLElement) {
  const map = textStore.getAll();
  if (!Object.keys(map).length) return;
  const els = getEditableTextEls(root);
  els.forEach((el) => {
    if (el.isContentEditable && document.activeElement === el) return; // never touch focused
    const key = pathFor(el);
    const stored = map[key];
    if (stored == null) return;
    if (el.innerText === stored) return;
    const hasOnlyText = Array.from(el.childNodes).every((c) => c.nodeType === Node.TEXT_NODE);
    if (hasOnlyText) {
      el.textContent = stored;
    } else {
      const directTextNodes = Array.from(el.childNodes).filter((c) => c.nodeType === Node.TEXT_NODE);
      if (directTextNodes.length === 1 && el.children.length === 0) {
        directTextNodes[0].textContent = stored;
      }
    }
  });
}

function applyCardOps(root: HTMLElement) {
  const all = cardStore.getAll();
  Object.keys(all).forEach((gridKey) => {
    const grids = root.querySelectorAll<HTMLElement>(CARD_GRID_SELECTORS.join(","));
    grids.forEach((g) => {
      if (pathFor(g) !== gridKey) return;
      const state = all[gridKey];
      const cards = Array.from(g.children) as HTMLElement[];
      cards.forEach((c, i) => {
        const cid = c.getAttribute("data-card-id") || `idx:${i}`;
        if (state.deletedIds.includes(cid)) {
          c.style.display = "none";
          c.setAttribute("data-edit-deleted", "1");
        }
      });
      state.added.forEach((entry) => {
        if (g.querySelector(`[data-added-id="${entry.id}"]`)) return;
        const tmpl = (Array.from(g.children).find(
          (c) => (c as HTMLElement).style.display !== "none" && !c.hasAttribute("data-added-id"),
        ) as HTMLElement) || (g.lastElementChild as HTMLElement);
        if (!tmpl) return;
        const clone = tmpl.cloneNode(true) as HTMLElement;
        clone.setAttribute("data-added-id", entry.id);
        clone.setAttribute("data-card-id", `added:${entry.id}`);
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
  // Bumped only by intentional structural changes (add/delete card, route change),
  // NOT by typing or DOM mutations.
  const [tick, setTick] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Persist edit mode toggle.
  useEffect(() => {
    try { localStorage.setItem(EDIT_KEY, editMode ? "1" : "0"); } catch { /* */ }
  }, [editMode]);

  // Apply stored texts/cards ONCE on mount, and on intentional ticks.
  // Never on every render and never tied to characterData mutations.
  useEffect(() => {
    applyStoredTexts(document.body);
    applyCardOps(document.body);
  }, [tick]);

  // Re-apply when route content swaps (childList changes outside of typing).
  // We listen to childList only (not characterData), so typing into contentEditable
  // does not trigger this.
  useEffect(() => {
    let scheduled = false;
    const obs = new MutationObserver((muts) => {
      // Ignore mutations that are purely from our overlay or contenteditable text.
      const meaningful = muts.some((m) => {
        if (m.type !== "childList") return false;
        const target = m.target as Element;
        if (target && (target as HTMLElement).isContentEditable) return false;
        if (target && target.closest && target.closest("[data-edit-ui]")) return false;
        return m.addedNodes.length > 0 || m.removedNodes.length > 0;
      });
      if (!meaningful || scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        applyStoredTexts(document.body);
        applyCardOps(document.body);
      });
    });
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  // Wire/unwire contentEditable when edit mode changes (or after structural ticks).
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
          // Save ONLY on blur — never on input/keystroke.
          const val = el.innerText.replace(/\u00A0/g, " ");
          textStore.set(key, val);
        };
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
  }, [editMode, tick]);

  // Overlay positions: snapshot on tick + scroll/resize, throttled with rAF.
  // Does NOT use MutationObserver, so typing never triggers it.
  const [overlayTick, setOverlayTick] = useState(0);
  useEffect(() => {
    if (!editMode) return;
    const schedule = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        setOverlayTick((n) => n + 1);
      });
    };
    window.addEventListener("scroll", schedule, true);
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [editMode]);

  // Compute overlay items only when in edit mode and overlayTick/tick changes.
  const cards = editMode
    ? Array.from(document.querySelectorAll<HTMLElement>("[data-card-grid] > *")).filter(
        (c) => c.style.display !== "none",
      )
    : [];
  const grids = editMode
    ? Array.from(document.querySelectorAll<HTMLElement>("[data-card-grid]"))
    : [];
  // Reference overlayTick so the render reads it.
  void overlayTick;

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
      setTick((n) => n + 1);
    }, 300);
  };

  const handleAdd = (gridKey: string) => {
    const id = `${Date.now()}`;
    const state = cardStore.get(gridKey);
    cardStore.setAdded(gridKey, [...state.added, { id, html: "" }]);
    showToast("Card added");
    setTick((n) => n + 1);
  };

  return (
    <>
      {children}
      <ToastHost />

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
