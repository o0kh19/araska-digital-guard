// Lightweight localStorage-backed store for inline edits.
// Texts are keyed by a stable DOM path. Card additions/deletions are keyed by a card-grid path.

const TEXT_KEY = "lov_edit_texts_v1";
const CARDS_KEY = "lov_edit_cards_v1"; // { [gridKey]: { added: Array<{id,html}>, deletedIds: string[] } }
const STYLES_KEY = "lov_edit_styles_v1"; // { [elKey]: Partial<CSSStyleDeclaration> }

type TextMap = Record<string, string>;
type CardState = { added: { id: string; html: string }[]; deletedIds: string[] };
type CardMap = Record<string, CardState>;
export type StyleMap = Record<string, Record<string, string>>;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, val: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
    /* ignore */
  }
}

export const textStore = {
  getAll: () => read<TextMap>(TEXT_KEY, {}),
  get: (k: string) => read<TextMap>(TEXT_KEY, {})[k],
  set: (k: string, v: string) => {
    const all = read<TextMap>(TEXT_KEY, {});
    all[k] = v;
    write(TEXT_KEY, all);
  },
};

export const cardStore = {
  getAll: () => read<CardMap>(CARDS_KEY, {}),
  get: (k: string): CardState => read<CardMap>(CARDS_KEY, {})[k] || { added: [], deletedIds: [] },
  setAdded: (k: string, added: CardState["added"]) => {
    const all = read<CardMap>(CARDS_KEY, {});
    all[k] = { ...(all[k] || { added: [], deletedIds: [] }), added };
    write(CARDS_KEY, all);
  },
  setDeleted: (k: string, deletedIds: string[]) => {
    const all = read<CardMap>(CARDS_KEY, {});
    all[k] = { ...(all[k] || { added: [], deletedIds: [] }), deletedIds };
    write(CARDS_KEY, all);
  },
};

export const styleStore = {
  getAll: () => read<StyleMap>(STYLES_KEY, {}),
  get: (k: string): Record<string, string> => read<StyleMap>(STYLES_KEY, {})[k] || {},
  setProp: (k: string, prop: string, value: string) => {
    const all = read<StyleMap>(STYLES_KEY, {});
    const cur = { ...(all[k] || {}) };
    if (value === "" || value == null) delete cur[prop];
    else cur[prop] = value;
    all[k] = cur;
    write(STYLES_KEY, all);
  },
  clear: (k: string) => {
    const all = read<StyleMap>(STYLES_KEY, {});
    delete all[k];
    write(STYLES_KEY, all);
  },
};

// Build a stable path for an element relative to <main> or <body>.
export function pathFor(el: Element): string {
  const parts: string[] = [];
  let node: Element | null = el;
  const stop = document.body;
  while (node && node !== stop) {
    const parent: Element | null = node.parentElement;
    if (!parent) break;
    const tag = node.tagName.toLowerCase();
    const siblings = Array.from(parent.children).filter((c) => c.tagName === node!.tagName);
    const idx = siblings.indexOf(node);
    parts.unshift(`${tag}:${idx}`);
    node = parent;
  }
  return parts.join(">");
}
