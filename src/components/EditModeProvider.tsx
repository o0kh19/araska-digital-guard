import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Ctx = { editMode: boolean; toggle: () => void };
const EditModeContext = createContext<Ctx>({ editMode: false, toggle: () => {} });

export const useEditMode = () => useContext(EditModeContext);

export const EditModeProvider = ({ children }: { children: ReactNode }) => {
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (editMode) document.body.setAttribute("data-edit-mode", "true");
    else document.body.removeAttribute("data-edit-mode");
  }, [editMode]);

  return (
    <EditModeContext.Provider value={{ editMode, toggle: () => setEditMode((v) => !v) }}>
      {children}
    </EditModeContext.Provider>
  );
};
