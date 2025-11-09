"use client";
import * as React from "react";
import * as Toast from "@radix-ui/react-toast";
import { Check, X } from "lucide-react";

type Variant = "success" | "error";
type Payload = { title: string; description?: string; variant: Variant; duration?: number };

export function toastSuccess(title: string, description?: string, duration = 3000) {
  if (typeof window !== "undefined")
    window.dispatchEvent(new CustomEvent<Payload>("rt:toast", { detail: { title, description, variant: "success", duration } }));
}
export function toastError(title: string, description?: string, duration = 3000) {
  if (typeof window !== "undefined")
    window.dispatchEvent(new CustomEvent<Payload>("rt:toast", { detail: { title, description, variant: "error", duration } }));
}

type Msg = Payload & { id: number; open: boolean };
let _id = 0;

export default function Toaster() {
  const [current, setCurrent] = React.useState<Msg | null>(null);

  React.useEffect(() => {
    const onToast = (e: Event) => {
      const m = (e as CustomEvent<Payload>).detail;
      if (current?.open) {
        setCurrent((p) => (p ? { ...p, open: false } : p));
        setTimeout(() => setCurrent({ ...m, id: ++_id, open: true }), 260); // match close anim
      } else {
        setCurrent({ ...m, id: ++_id, open: true });
      }
    };
    window.addEventListener("rt:toast", onToast as EventListener);
    return () => window.removeEventListener("rt:toast", onToast as EventListener);
  }, [current]);

  return (
    <Toast.Provider swipeDirection="down">
      {current && (
        <Toast.Root
          key={current.id}
          open={current.open}
          onOpenChange={(o) => {
            if (!o) {
              setCurrent((p) => (p ? { ...p, open: false } : p));
              setTimeout(() => setCurrent(null), 260);
            }
          }}
          duration={current.duration ?? Infinity}
          className={[
            "relative z-[9999] pointer-events-auto w-fit min-w-[340px] max-w-[92vw]",
            "inline-flex items-start gap-3 rounded-xl border px-4 py-3 pr-12 shadow-sm ring-1 ring-black/5",
            // ENTRADA MÁS LARGA: slide + fade, mayor distancia y tiempo
            "data-[state=open]:animate-in data-[state=open]:duration-500 data-[state=open]:ease-out",
            "data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-16",
            // SALIDA SUAVE
            "data-[state=closed]:animate-out data-[state=closed]:duration-250 data-[state=closed]:ease-in",
            "data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-bottom-6",
            current.variant === "success"
              ? "bg-[#F0FFF9] text-[#065F46] border-[#A7F3D0]"
              : "bg-[#FEF2F2] text-[#7F1D1D] border-[#FECACA]",
          ].join(" ")}
        >
          {/* X: esquina sup. derecha, círculo propio, hover blanco, funcional */}
          <Toast.Close
            aria-label="Cerrar"
            className={[
              "absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full",
              "cursor-pointer text-current/70 hover:text-current hover:bg-white hover:border hover:border-black/10",
              "transition-colors",
            ].join(" ")}
          >
            <X size={14} strokeWidth={1.75} />
          </Toast.Close>

          {/* Ícono circular sólido con check/X blancos */}
          <div
            className={[
              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
              current.variant === "success" ? "bg-[#10B981] text-white" : "bg-[#EF4444] text-white",
            ].join(" ")}
          >
            {current.variant === "success" ? <Check size={14} strokeWidth={3} /> : <X size={14} strokeWidth={3} />}
          </div>

          <div className="leading-tight">
            <Toast.Title className="font-semibold text-[15px]">{current.title}</Toast.Title>
            {current.description && (
              <Toast.Description className="text-[14px] opacity-90">{current.description}</Toast.Description>
            )}
          </div>
        </Toast.Root>
      )}

      {/* Viewport: un poco más arriba; en mobile a la IZQUIERDA, en md+ centrado */}
      <Toast.Viewport
        className={[
          "fixed inset-x-0 bottom-6 z-[9999] flex w-full px-4 pointer-events-none",
          "justify-start",        // mobile: izquierda
          "sm:justify-start",
          "md:justify-center",    // md+: centrado
        ].join(" ")}
      />
    </Toast.Provider>
  );
}
