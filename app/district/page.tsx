"use client";
import { useState } from "react";
import {
  LayoutDashboard, FileText, CheckSquare, AlertTriangle, BarChart3,
  MapPin, TrendingUp, ShieldCheck, CheckCircle2, ChevronRight,
  Clock, ArrowRight, Filter
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import SidebarLayout, { type SidebarLink } from "@/components/SidebarLayout";
import StatCard from "@/components/StatCard";
import SpotlightCard from "@/components/SpotlightCard";
import {
  districtStats, coverageData, verificationBottlenecks, schemeWiseData,
} from "@/lib/mock";

type DistrictTab = "overview" | "applications" | "bottlenecks" | "coverage" | "analytics";

const sidebarLinks: SidebarLink[] = [
  { id: "overview", label: "District Dashboard", icon: LayoutDashboard },
  { id: "applications", label: "Tehsil Applications", icon: FileText, badge: "1,248" },
  { id: "bottlenecks", label: "Stage Bottlenecks", icon: AlertTriangle, badge: "2 Slow" },
  { id: "coverage", label: "Tribal Coverage Gaps", icon: MapPin },
  { id: "analytics", label: "Scheme Distribution", icon: BarChart3 },
];

const PIE_COLORS = ["#1a365d", "#2d4a7c", "#d97706", "#16a34a", "#64748b", "#94a3b8"];

export default function DistrictDashboard() {
  const [activeTab, setActiveTab] = useState<DistrictTab>("overview");

  return (
    <SidebarLayout
      title="District Welfare Office"
      subtitle="Pune District · Directorate of Tribal Welfare, Maharashtra"
      links={sidebarLinks}
      activeId={activeTab}
      onSelect={(id) => setActiveTab(id as DistrictTab)}
      headerRight={
        <div className="flex items-center gap-2 bg-leaf/10 border border-leaf/20 px-3 py-1.5 rounded-lg text-xs font-semibold text-leaf">
          <ShieldCheck size={14} />
          <span>Active Audit Session</span>
        </div>
      }
    >
      {/* ═══════════════════════════════════════════════
          OVERVIEW TAB
          ═══════════════════════════════════════════════ */}
      {(activeTab === "overview" || activeTab === "analytics") && (
        <div className="space-y-5 sm:space-y-6 animate-fade-in">
          {/* Stats Row */}
          <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total Applications" value={districtStats.totalApplications.toLocaleString()} icon={FileText} color="navy" trend={{ value: "+12.4% vs last mo", up: true }} />
            <StatCard label="District Verified" value={districtStats.verified.toLocaleString()} icon={CheckSquare} color="leaf" trend={{ value: "79.0% rate", up: true }} />
            <StatCard label="Pending at Tehsils" value={districtStats.pending.toLocaleString()} icon={AlertTriangle} color="saffron" />
            <StatCard label="Total Disbursed (PFMS)" value={districtStats.totalDisbursed} icon={TrendingUp} color="info" subtitle={`District Coverage: ${districtStats.coverageRate}%`} />
          </div>

          {/* Charts Row */}
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            {/* Coverage by District / Block */}
            <div className="card p-4 sm:p-6">
              <div className="flex items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-ink">Application Coverage by Tehsil Block</h3>
                  <p className="text-xs text-mute mt-0.5">Applied vs. Verified vs. Disbursed counts</p>
                </div>
                <span className="badge badge-navy text-[10px] shrink-0">Real-time Sync</span>
              </div>
              <div className="w-full h-[260px] sm:h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={coverageData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" />
                    <XAxis dataKey="district" tick={{ fontSize: 10, fill: "var(--mute)" }} />
                    <YAxis tick={{ fontSize: 10, fill: "var(--mute)" }} />
                    <Tooltip
                      contentStyle={{
                        background: "var(--card)",
                        border: "1px solid var(--line)",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="applied" fill="var(--navy)" radius={[4, 4, 0, 0]} name="Applied" />
                    <Bar dataKey="verified" fill="var(--saffron)" radius={[4, 4, 0, 0]} name="Verified" />
                    <Bar dataKey="disbursed" fill="var(--leaf)" radius={[4, 4, 0, 0]} name="Disbursed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Scheme Distribution */}
            <div className="card p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-ink">Applications by Scheme Type</h3>
                  <p className="text-xs text-mute mt-0.5">MoTA Central & State Tribal Welfare Schemes</p>
                </div>
              </div>
              <div className="w-full h-[260px] sm:h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={schemeWiseData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="45%"
                      outerRadius={75}
                      innerRadius={42}
                      paddingAngle={3}
                    >
                      {schemeWiseData.map((entry, i) => (
                        <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "var(--card)",
                        border: "1px solid var(--line)",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                      formatter={(value: number) => value.toLocaleString()}
                    />
                    <Legend
                      verticalAlign="bottom"
                      iconType="circle"
                      iconSize={7}
                      wrapperStyle={{ fontSize: "10px", paddingTop: "6px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          BOTTLENECKS TAB
          ═══════════════════════════════════════════════ */}
      {(activeTab === "overview" || activeTab === "bottlenecks") && (
        <div className="space-y-4 animate-fade-in">
          <div className="card">
            <div className="p-4 sm:p-6 border-b border-line">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-ink">Verification Bottlenecks & Delay Diagnostics</h3>
                  <p className="text-xs text-mute mt-0.5">Identifies administrative stages where applications take longer than MoTA SLAs</p>
                </div>
                <span className="badge badge-saffron text-xs font-semibold self-start sm:self-auto">2 Critical Stages Detected</span>
              </div>
            </div>

            <p className="sm:hidden px-4 pt-3 text-[10px] text-mute italic flex items-center gap-1">
              <span>← Swipe table horizontally to see all columns →</span>
            </p>

            <div className="table-wrap border-0 rounded-none">
              <table className="w-full min-w-[550px] text-sm">
                <thead className="bg-bg-warm border-b border-line">
                  <tr>
                    <th className="text-left p-3 sm:p-3.5 sm:pl-6 text-xs font-bold text-mute uppercase tracking-wider">Processing Stage</th>
                    <th className="text-left p-3 sm:p-3.5 text-xs font-bold text-mute uppercase tracking-wider">Pending Apps</th>
                    <th className="text-left p-3 sm:p-3.5 text-xs font-bold text-mute uppercase tracking-wider">Avg Delay</th>
                    <th className="text-left p-3 sm:p-3.5 sm:pr-6 text-xs font-bold text-mute uppercase tracking-wider">Capacity Load</th>
                  </tr>
                </thead>
                <tbody>
                  {verificationBottlenecks.map((b) => {
                    const maxPending = Math.max(...verificationBottlenecks.map(x => x.pending));
                    const pct = (b.pending / maxPending) * 100;
                    return (
                      <tr key={b.stage} className="border-t border-line-subtle hover:bg-bg-warm/60 transition-colors">
                        <td className="p-3 sm:p-3.5 sm:pl-6 font-semibold text-ink text-xs sm:text-sm">{b.stage}</td>
                        <td className="p-3 sm:p-3.5 font-bold font-mono text-xs sm:text-sm">{b.pending.toLocaleString()}</td>
                        <td className="p-3 sm:p-3.5">
                          <span className={`badge text-[11px] sm:text-xs font-bold ${
                            b.avgDays > 10 ? "badge-danger" : b.avgDays > 5 ? "badge-saffron" : "badge-leaf"
                          }`}>
                            {b.avgDays}d avg
                          </span>
                        </td>
                        <td className="p-3 sm:p-3.5 sm:pr-6 w-40 sm:w-52">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="flex-1 h-2 sm:h-2.5 rounded-full bg-line overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${
                                  b.avgDays > 10 ? "bg-danger" : b.avgDays > 5 ? "bg-saffron" : "bg-leaf"
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-[11px] sm:text-xs font-mono text-mute w-8 text-right">{Math.round(pct)}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 sm:p-4 border-t border-line bg-bg-warm/40 text-xs text-mute flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
              <span>Automatic escalations are dispatched when delays exceed 14 calendar days</span>
              <button className="text-navy font-semibold hover:underline">Issue Fast-Track Order →</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          COVERAGE GAPS TAB
          ═══════════════════════════════════════════════ */}
      {(activeTab === "overview" || activeTab === "coverage") && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base sm:text-lg text-ink">Tribal Area Coverage Rates</h3>
              <p className="text-xs text-mute">Percentage of census-eligible ST youth currently receiving DBT scholarship</p>
            </div>
          </div>

          <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 xl:grid-cols-6">
            {coverageData.map(c => (
              <SpotlightCard key={c.district} className="p-4 text-center flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold text-ink uppercase tracking-wider">{c.district}</p>
                  <p className="text-3xl font-extrabold mt-3" style={{
                    color: c.pct >= 70 ? "var(--leaf)" : c.pct >= 50 ? "var(--saffron-dark)" : "var(--danger)"
                  }}>
                    {c.pct}%
                  </p>
                  <div className="mt-3 h-2 rounded-full bg-line overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${c.pct}%`,
                        background: c.pct >= 70 ? "var(--leaf)" : c.pct >= 50 ? "var(--saffron)" : "var(--danger)",
                      }}
                    />
                  </div>
                </div>
                <div className="mt-4 pt-2 border-t border-line-subtle text-[11px] text-mute">
                  <p>{c.totalEligible.toLocaleString()} eligible students</p>
                  <p className="font-semibold text-ink mt-0.5">{c.disbursed.toLocaleString()} disbursed</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          TEHSIL APPLICATIONS TAB
          ═══════════════════════════════════════════════ */}
      {activeTab === "applications" && (
        <div className="space-y-4 animate-fade-in">
          <div className="card p-6">
            <h3 className="font-bold text-lg text-ink mb-1">Tehsil Office Processing Submissions</h3>
            <p className="text-xs text-mute mb-4">Live feed of institutional batches cleared by local block offices</p>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Tehsil Block</th>
                    <th>Institutes Covered</th>
                    <th>Submitted Apps</th>
                    <th>Desk Cleared</th>
                    <th>Forwarded to State</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { block: "Haveli Block", inst: 24, apps: 480, cleared: 412, state: 390, status: "Active" },
                    { block: "Khed Tribal Tehsil", inst: 18, apps: 320, cleared: 280, state: 260, status: "Active" },
                    { block: "Ambegaon ST Belt", inst: 15, apps: 245, cleared: 195, state: 175, status: "Needs Push" },
                    { block: "Junnar Region", inst: 12, apps: 203, cleared: 161, state: 140, status: "Active" },
                  ].map(b => (
                    <tr key={b.block}>
                      <td className="font-bold text-ink">{b.block}</td>
                      <td>{b.inst} colleges</td>
                      <td className="font-mono font-semibold">{b.apps}</td>
                      <td className="font-mono text-leaf font-bold">{b.cleared}</td>
                      <td className="font-mono text-navy font-bold">{b.state}</td>
                      <td>
                        <span className={`badge text-[10px] ${b.status === "Active" ? "badge-leaf" : "badge-saffron"}`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </SidebarLayout>
  );
}
