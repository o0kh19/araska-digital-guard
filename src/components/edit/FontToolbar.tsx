import { useEffect, useRef, useState } from "react";
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, RotateCcw } from "lucide-react";
import { pathFor, styleStore } from "./editStore";

const FONT_FAMILIES = [
  { label: "Default", value: "" },
  { label: "Inter", value: "Inter, sans-serif" },
  { label: "System Sans", value: "system-ui, -apple-system, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Times", value: '"Times New Roman", Times, serif' },
  { label: "Courier", value: '"Courier New", Courier, monospace' },
  { label: "Arial", value: "Arial, Helvetica, sans-serif" },
  { label: "Verdana", value: "Verdana, sans-serif" },
  { label: "Trebuchet", value: '"Trebuchet MS", sans-serif' },
  { label: "Impact", value: "Impact, sans-serif" },
];

const WEIGHTS = ["300", "400", "500", "600", "700", "800", "900"];

interface Props {
  enabled: boolean;
}

export default function FontToolbar({ enabled }: Props) {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const [, force] = useState(0);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) {
      setTarget(null);
      setPos(null);
      return;
    }
    const onFocus = (e: FocusEvent) => {
      const el = e.target as HTMLElement;
      if (!el || !el.isContentEditable) return;
      if (el.closest("[data-edit-ui]")) return;
      setTarget(el);
      const r = el.getBoundingClientRect();
      const top = Math.max(8, r.top - 56);
      const left = Math.max(8, Math.min(window.innerWidth - 640, r.left));
      setPos({ top, left });
    };
    const onBlur = (e: FocusEvent) => {
      const next = e.relatedTarget as Node | null;
      if (next && toolbarRef.current?.contains(next)) return;
      setTimeout(() => {
        const ae = document.activeElement as HTMLElement | null;
        if (ae && toolbarRef.current?.contains(ae)) return;
        if (ae && ae.isContentEditable) return;
        setTarget(null);
        setPos(null);
      }, 100);
    };
    document.addEventListener("focusin", onFocus);
    document.addEventListener("focusout", onBlur);
    return () => {
      document.removeEventListener("focusin", onFocus);
      document.removeEventListener("focusout", onBlur);
    };
  }, [enabled]);

  useEffect(() => {
    if (!target) return;
    const update = () => {
      const r = target.getBoundingClientRect();
      const top = Math.max(8, r.top - 56);
      const left = Math.max(8, Math.min(window.innerWidth - 640, r.left));
      setPos({ top, left });
    };
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [target]);

  if (!enabled || !target || !pos) return null;

  const apply = (prop: string, value: string, cssProp?: string) => {
    const key = pathFor(target);
    const css = cssProp || prop;
    if (value === "") {
      target.style.removeProperty(css);
    } else {
      target.style.setProperty(css, value, "important");
    }
    styleStore.setProp(key, prop, value);
    force((n) => n + 1);
    target.focus();
  };

  const cs = window.getComputedStyle(target);
  const curSize = parseInt(cs.fontSize || "16", 10);
  const curWeight = String(parseInt(cs.fontWeight || "400", 10));
  const curColor = rgbToHex(cs.color);
  const curBg = target.style.backgroundColor || "";
  const isItalic = cs.fontStyle === "italic";
  const isUnderline = (cs.textDecorationLine || "").includes("underline");
  const align = cs.textAlign;

  return (
    <div
      ref={toolbarRef}
      data-edit-ui
      tabIndex={-1}
      onMouseDown={(e) => e.preventDefault()}
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        zIndex: 10000,
        background: "rgba(15,23,42,0.96)",
        color: "#fff",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(31,143,203,0.5)",
        borderRadius: 10,
        padding: "6px 8px",
        display: "flex",
        flexWrap: "wrap",
        gap: 6,
        alignItems: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        fontSize: 12,
        maxWidth: "min(720px, 95vw)",
      }}
    >
      <select
        value={target.style.fontFamily || ""}
        onChange={(e) => apply("fontFamily", e.target.value, "font-family")}
        style={selStyle}
        title="Font family"
      >
        {FONT_FAMILIES.map((f) => (
          <option key={f.label} value={f.value} style={{ color: "#000" }}>
            {f.label}
          </option>
        ))}
      </select>

      <input
        type="number"
        min={8}
        max={200}
        value={curSize}
        onChange={(e) => apply("fontSize", `${e.target.value}px`, "font-size")}
        style={{ ...selStyle, width: 56 }}
        title="Font size (px)"
      />

      <select
        value={curWeight}
        onChange={(e) => apply("fontWeight", e.target.value, "font-weight")}
        style={selStyle}
        title="Font weight"
      >
        {WEIGHTS.map((w) => (
          <option key={w} value={w} style={{ color: "#000" }}>
            {w}
          </option>
        ))}
      </select>

      <ToolBtn active={isItalic} onClick={() => apply("fontStyle", isItalic ? "normal" : "italic", "font-style")} title="Italic">
        <Italic size={14} />
      </ToolBtn>
      <ToolBtn
        active={String(parseInt(cs.fontWeight, 10)) === "700"}
        onClick={() =>
          apply("fontWeight", String(parseInt(cs.fontWeight, 10)) === "700" ? "400" : "700", "font-weight")
        }
        title="Bold"
      >
        <Bold size={14} />
      </ToolBtn>
      <ToolBtn
        active={isUnderline}
        onClick={() => apply("textDecoration", isUnderline ? "none" : "underline", "text-decoration")}
        title="Underline"
      >
        <Underline size={14} />
      </ToolBtn>

      <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)" }} />

      <ToolBtn active={align === "left" || align === "start"} onClick={() => apply("textAlign", "left", "text-align")} title="Align left">
        <AlignLeft size={14} />
      </ToolBtn>
      <ToolBtn active={align === "center"} onClick={() => apply("textAlign", "center", "text-align")} title="Align center">
        <AlignCenter size={14} />
      </ToolBtn>
      <ToolBtn active={align === "right" || align === "end"} onClick={() => apply("textAlign", "right", "text-align")} title="Align right">
        <AlignRight size={14} />
      </ToolBtn>

      <div style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)" }} />

      <label style={{ display: "flex", alignItems: "center", gap: 4 }} title="Text color">
        <span style={{ opacity: 0.75 }}>A</span>
        <input
          type="color"
          value={curColor}
          onChange={(e) => apply("color", e.target.value)}
          style={{ width: 28, height: 22, border: "none", background: "transparent", padding: 0, cursor: "pointer" }}
        />
      </label>

      <label style={{ display: "flex", alignItems: "center", gap: 4 }} title="Background color">
        <span style={{ opacity: 0.75 }}>BG</span>
        <input
          type="color"
          value={rgbToHex(curBg) || "#ffffff"}
          onChange={(e) => apply("backgroundColor", e.target.value, "background-color")}
          style={{ width: 28, height: 22, border: "none", background: "transparent", padding: 0, cursor: "pointer" }}
        />
        <button
          onClick={() => apply("backgroundColor", "", "background-color")}
          style={{ ...btnStyle, padding: "2px 6px" }}
          title="Clear background"
        >
          ✕
        </button>
      </label>

      <input
        type="number"
        step={0.05}
        min={0.8}
        max={3}
        value={parseFloat(cs.lineHeight) ? +(parseFloat(cs.lineHeight) / curSize).toFixed(2) : 1.2}
        onChange={(e) => apply("lineHeight", e.target.value, "line-height")}
        style={{ ...selStyle, width: 56 }}
        title="Line height"
      />

      <input
        type="number"
        step={0.5}
        min={-5}
        max={20}
        value={parseFloat(cs.letterSpacing) || 0}
        onChange={(e) => apply("letterSpacing", `${e.target.value}px`, "letter-spacing")}
        style={{ ...selStyle, width: 56 }}
        title="Letter spacing (px)"
      />

      <select
        value={target.style.textTransform || ""}
        onChange={(e) => apply("textTransform", e.target.value, "text-transform")}
        style={selStyle}
        title="Text transform"
      >
        <option value="" style={{ color: "#000" }}>Aa</option>
        <option value="uppercase" style={{ color: "#000" }}>AA</option>
        <option value="lowercase" style={{ color: "#000" }}>aa</option>
        <option value="capitalize" style={{ color: "#000" }}>Aa+</option>
      </select>

      <button
        onClick={() => {
          const key = pathFor(target);
          const stored = styleStore.get(key);
          Object.keys(stored).forEach((p) => target.style.removeProperty(toCss(p)));
          styleStore.clear(key);
          force((n) => n + 1);
          target.focus();
        }}
        style={{ ...btnStyle, display: "flex", alignItems: "center", gap: 4 }}
        title="Reset styles"
      >
        <RotateCcw size={12} /> Reset
      </button>
    </div>
  );
}

const selStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 6,
  padding: "3px 6px",
  fontSize: 12,
  outline: "none",
};

const btnStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 6,
  padding: "4px 6px",
  cursor: "pointer",
  fontSize: 12,
};

function ToolBtn({
  active,
  onClick,
  title,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        ...btnStyle,
        background: active ? "rgba(31,143,203,0.5)" : btnStyle.background,
        borderColor: active ? "rgba(31,143,203,0.8)" : btnStyle.border as string,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 26,
        height: 24,
      }}
    >
      {children}
    </button>
  );
}

function toCss(prop: string) {
  return prop.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
}

function rgbToHex(rgb: string): string {
  if (!rgb) return "";
  if (rgb.startsWith("#")) return rgb;
  const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!m) return "";
  const toHex = (n: string) => Number(n).toString(16).padStart(2, "0");
  return `#${toHex(m[1])}${toHex(m[2])}${toHex(m[3])}`;
}
