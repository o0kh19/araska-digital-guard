import { Pencil, Check } from "lucide-react";
import { useEditMode } from "./EditModeProvider";

const EditModeToggle = () => {
  const { editMode, toggle } = useEditMode();
  return (
    <button
      onClick={toggle}
      aria-label="Toggle edit mode"
      className="fixed top-3 left-3 z-[100] inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-all hover:scale-105"
      style={{
        background: editMode ? "rgba(31,143,203,0.92)" : "rgba(255,255,255,0.7)",
        color: editMode ? "#fff" : "#0f172a",
        border: "1px solid rgba(31,143,203,0.5)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
      }}
    >
      {editMode ? <Check size={14} /> : <Pencil size={14} />}
      {editMode ? "Editing" : "Edit Mode"}
    </button>
  );
};

export default EditModeToggle;
