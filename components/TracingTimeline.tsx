"use client";
import type { TimelineStep } from "@/lib/mock";
import { Check, Clock } from "lucide-react";

export default function TracingTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <div className="relative">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        const nextStep = steps[i + 1];

        // Determine connector line styling between step i and step i+1
        const lineStyle = step.done
          ? nextStep?.done
            ? "bg-leaf"
            : nextStep?.current
            ? "bg-gradient-to-b from-leaf to-saffron"
            : "bg-leaf"
          : step.current
          ? "bg-gradient-to-b from-saffron/60 to-line"
          : "bg-line";

        return (
          <div
            key={step.key}
            className="relative flex gap-4 pb-7 last:pb-1 animate-fade-in"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Centered Connector Line to next node */}
            {!isLast && (
              <span
                className={`absolute left-[13px] top-[26px] -bottom-1 w-0.5 ${lineStyle} transition-colors duration-300`}
                aria-hidden="true"
              />
            )}

            {/* Step Node Circle (28x28px, center is at 14px) */}
            <div
              className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                step.done
                  ? "border-leaf bg-leaf text-white shadow-xs"
                  : step.current
                  ? "border-saffron bg-saffron text-white ring-4 ring-saffron/20 animate-pulse-soft"
                  : "border-line bg-white text-mute"
              }`}
            >
              {step.done ? (
                <Check size={14} strokeWidth={2.5} />
              ) : step.current ? (
                <Clock size={14} strokeWidth={2.5} />
              ) : (
                <span className="h-2 w-2 rounded-full bg-slate-300" />
              )}
            </div>

            {/* Step Content */}
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <h4
                  className={`text-sm font-semibold leading-tight ${
                    step.done
                      ? "text-ink"
                      : step.current
                      ? "text-saffron-dark font-bold"
                      : "text-mute"
                  }`}
                >
                  {step.label}
                </h4>
                {step.current && (
                  <span className="badge badge-saffron text-[10px]">In Progress</span>
                )}
                {step.done && (
                  <span className="badge badge-leaf text-[10px]">Complete</span>
                )}
              </div>

              {step.date && (
                <p className="text-xs text-mute mt-1 font-medium">{step.date}</p>
              )}
              {step.description && (
                <p className="text-xs text-mute mt-1 max-w-sm leading-relaxed">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
