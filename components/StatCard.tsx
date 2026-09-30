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
    <div className={`stat-card border ${c.border}`}>
      <div className="flex items-start justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${c.bg}`}>
          <Icon size={20} className={c.text} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trend.up ? "text-leaf" : "text-danger"}`}>
            {trend.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {trend.value}
          </div>
        )}
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold text-ink">{value}</p>
        <p className="text-xs text-mute mt-0.5">{label}</p>
        {subtitle && <p className="text-[10px] text-mute mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}
