import { forwardRef, useEffect, useState } from "react";

type Toast = { id: number; msg: string };
let pushExternal: ((msg: string) => void) | null = null;

export function showToast(msg: string) {
  pushExternal?.(msg);
}

const ToastHost = forwardRef<HTMLDivElement>((_, ref) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    pushExternal = (msg: string) => {
      const id = Date.now() + Math.random();
      setToasts((t) => [...t, { id, msg }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2400);
    };
    return () => {
      pushExternal = null;
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed bottom-5 right-5 z-[10000] flex flex-col gap-2 pointer-events-none"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="px-4 py-2.5 rounded-lg text-sm text-white shadow-lg backdrop-blur-md animate-in fade-in slide-in-from-bottom-2"
          style={{
            background: "rgba(15,23,42,0.85)",
            border: "1px solid rgba(31,143,203,0.4)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          }}
        >
          {t.msg}
        </div>
      ))}
    </div>
  );
});
ToastHost.displayName = "ToastHost";

export default ToastHost;
