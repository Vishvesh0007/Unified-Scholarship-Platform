"use client";
import { useRef, type ReactNode } from "react";

export default function SpotlightCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const r = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={r}
      className={`card group relative overflow-hidden flex flex-col ${className}`}
      onPointerMove={(e) => {
        if (!r.current) return;
        const b = r.current.getBoundingClientRect();
        r.current.style.setProperty("--x", e.clientX - b.left + "px");
        r.current.style.setProperty("--y", e.clientY - b.top + "px");
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: "radial-gradient(400px circle at var(--x,50%) var(--y,0), rgba(26,54,93,0.06), transparent 60%)",
        }}
      />
      <div className="relative z-10 flex-1 flex flex-col h-full">{children}</div>
    </div>
  );
}
