"use client";
import { useEffect, useRef, useState } from "react";
import type { TimelineStep } from "@/lib/mock";
import { Check, Clock, Circle } from "lucide-react";

export default function TracingTimeline({ steps }: { steps: TimelineStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      setProgress(Math.max(0, Math.min(1, (innerHeight * 0.65 - r.top) / r.height)));
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, []);

  return (
    <div ref={ref} className="relative pl-10">
      {/* Track */}
      <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-line" />
      {/* Active track */}
      <div
        className="absolute left-[15px] top-2 w-0.5 bg-gradient-to-b from-navy via-saffron to-leaf transition-all duration-300"
        style={{ height: `${progress * 100}%` }}
      />

      {steps.map((step, i) => (
        <div key={step.key} className={`relative pb-8 last:pb-0 animate-fade-in`} style={{ animationDelay: `${i * 100}ms` }}>
          {/* Node */}
          <span className={`absolute -left-[25px] top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all ${
            step.done
              ? "border-leaf bg-leaf text-white"
              : step.current
              ? "border-saffron bg-saffron text-white animate-pulse-soft"
              : "border-line bg-white text-mute"
          }`}>
            {step.done ? <Check size={14} /> : step.current ? <Clock size={14} /> : <Circle size={10} />}
          </span>

          {/* Content */}
          <div>
            <div className="flex items-center gap-2">
              <h4 className={`text-sm font-semibold ${step.done ? "text-ink" : step.current ? "text-saffron" : "text-mute"}`}>
                {step.label}
              </h4>
              {step.current && (
                <span className="badge badge-saffron text-[10px]">In Progress</span>
              )}
              {step.done && (
                <span className="badge badge-leaf text-[10px]">Complete</span>
              )}
            </div>
            {step.date && <p className="text-xs text-mute mt-0.5">{step.date}</p>}
            {step.description && (
              <p className="text-xs text-mute mt-1 max-w-sm">{step.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
