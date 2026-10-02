"use client";
import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: "navy" | "saffron" | "leaf" | "info" | "danger";
  trend?: { value: string; up: boolean };
  subtitle?: string;
}

const colorMap = {
  navy: { bg: "bg-[rgba(26,54,93,0.08)]", text: "text-navy", border: "border-navy/10" },
  saffron: { bg: "bg-[rgba(217,119,6,0.08)]", text: "text-saffron", border: "border-saffron/10" },
  leaf: { bg: "bg-[rgba(22,163,74,0.08)]", text: "text-leaf", border: "border-leaf/10" },
  info: { bg: "bg-[rgba(59,130,246,0.08)]", text: "text-info", border: "border-info/10" },
  danger: { bg: "bg-[rgba(239,68,68,0.08)]", text: "text-danger", border: "border-danger/10" },
};

export default function StatCard({ label, value, icon: Icon, color = "navy", trend, subtitle }: StatCardProps) {
  const c = colorMap[color];
  return (
    <div className={`stat-card border ${c.border} flex flex-col justify-between`}>
      <div className="flex items-start justify-between gap-1.5 flex-wrap">
        <div className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg ${c.bg} shrink-0`}>
          <Icon size={18} className={c.text} />
        </div>
        {trend && (
          <div className={`flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs font-semibold shrink-0 ${
            trend.up ? "text-leaf bg-leaf/10 px-1.5 py-0.5 rounded" : "text-danger bg-danger/10 px-1.5 py-0.5 rounded"
          }`}>
            {trend.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{trend.value}</span>
          </div>
        )}
      </div>
      <div className="mt-2.5 sm:mt-3">
        <p className="text-xl sm:text-2xl font-bold text-ink leading-tight">{value}</p>
        <p className="text-[11px] sm:text-xs text-mute mt-0.5 truncate" title={label}>{label}</p>
        {subtitle && <p className="text-[10px] text-mute mt-0.5 truncate" title={subtitle}>{subtitle}</p>}
      </div>
    </div>
  );
}
