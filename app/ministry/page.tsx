"use client";
import { useState } from "react";
import {
  LayoutDashboard, Globe, Layers, Building2, BarChart3,
  AlertTriangle, Settings, Users, TrendingUp, Wallet,
  CheckCircle2, ShieldAlert, ArrowRight, Download, Filter
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import SidebarLayout, { type SidebarLink } from "@/components/SidebarLayout";
import StatCard from "@/components/StatCard";
import SpotlightCard from "@/components/SpotlightCard";
import {
  nationalStats, monthlyApplications, stateWiseApprovals, schemeWiseData, schemes
} from "@/lib/mock";

type MinistryTab = "overview" | "schemes" | "institutions" | "states" | "gaps" | "reports";

const sidebarLinks: SidebarLink[] = [
  { id: "overview", label: "National Dashboard", icon: LayoutDashboard },
  { id: "schemes", label: "Scheme Management", icon: Layers, badge: "8 Schemes" },
  { id: "institutions", label: "Partner Institutions", icon: Building2, badge: "3,840" },
  { id: "states", label: "State Approvals", icon: Globe, badge: "28 States" },
  { id: "gaps", label: "Tribal Coverage Gaps", icon: AlertTriangle, badge: "Priority" },
  { id: "reports", label: "Disbursement Reports", icon: BarChart3 },
];

export default function MinistryDashboard() {
  const [activeTab, setActiveTab] = useState<MinistryTab>("overview");

  return (
    <SidebarLayout
      title="Ministry of Tribal Affairs"
      subtitle="National Scholarship Oversight & Disbursal Gateway · New Delhi"
      links={sidebarLinks}
      activeId={activeTab}
      onSelect={(id) => setActiveTab(id as MinistryTab)}
      headerRight={
        <div className="flex items-center gap-2 bg-navy text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs">
          <span>Apex Node #MOTA-HQ-01</span>
        </div>
      }
    >
      {/* ═══════════════════════════════════════════════
          NATIONAL OVERVIEW TAB
          ═══════════════════════════════════════════════ */}
      {activeTab === "overview" && (
        <div className="space-y-5 sm:space-y-6 animate-fade-in">
          {/* Top National Stat Cards */}
          <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total Registered ST Students" value={nationalStats.totalStudents} icon={Users} color="navy" trend={{ value: "+8.2% YoY", up: true }} />
            <StatCard label="Total Applications Received" value={nationalStats.totalApplications} icon={BarChart3} color="saffron" trend={{ value: "+14.6% vs FY25", up: true }} />
            <StatCard label="Total Verified by Nodes" value={nationalStats.verified} icon={TrendingUp} color="leaf" />
            <StatCard label="Disbursed via PFMS (DBT)" value={nationalStats.disbursed} icon={Wallet} color="info" subtitle={`Total Val: ${nationalStats.totalAmount}`} />
          </div>

          {/* Secondary Highlight Cards */}
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
            {[
              { label: "Active Central & State Schemes", value: nationalStats.activeSchemes, color: "text-navy", desc: "Automated adapter synchronization" },
              { label: "States & Union Territories Covered", value: `${nationalStats.coveringStates} States`, color: "text-saffron-dark", desc: "100% Pan-India Tribal footprint" },
              { label: "Connected Academic Institutions", value: nationalStats.institutions.toLocaleString(), color: "text-leaf", desc: "Colleges, Universities & ITIs" },
            ].map(s => (
              <SpotlightCard key={s.label} className="p-4 sm:p-5 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold text-mute">{s.label}</p>
                  <p className={`text-2xl sm:text-3xl font-extrabold mt-1.5 ${s.color}`}>{s.value}</p>
                </div>
                <p className="text-[11px] text-mute mt-3 pt-2 border-t border-line-subtle">{s.desc}</p>
              </SpotlightCard>
            ))}
          </div>

          {/* Trends Area Chart */}
          <div className="card p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
              <div>
                <h3 className="font-bold text-base sm:text-lg text-ink">National Application & Verification Momentum (FY 2026-27)</h3>
                <p className="text-xs text-mute mt-0.5">Monthly trajectory across all participating states and nodal colleges</p>
              </div>
              <span className="badge badge-leaf text-xs font-semibold self-start sm:self-auto">DBT Auto-release On</span>
            </div>

            <div className="w-full h-[260px] sm:h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyApplications} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="gradNav" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--navy)" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="var(--navy)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradSaf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--saffron)" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="var(--saffron)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradLeaf" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--leaf)" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="var(--leaf)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--line)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--mute)" }} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--mute)" }} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--line)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(val: number) => val.toLocaleString()}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                  <Area type="monotone" dataKey="applied" stroke="var(--navy)" strokeWidth={2} fill="url(#gradNav)" name="Applied" />
                  <Area type="monotone" dataKey="verified" stroke="var(--saffron)" strokeWidth={2} fill="url(#gradSaf)" name="Verified" />
                  <Area type="monotone" dataKey="disbursed" stroke="var(--leaf)" strokeWidth={2} fill="url(#gradLeaf)" name="Disbursed (PFMS)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          SCHEME MANAGEMENT TAB
          ═══════════════════════════════════════════════ */}
      {activeTab === "schemes" && (
        <div className="space-y-4 animate-fade-in">
          <div className="card p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h3 className="font-bold text-lg text-ink">MoTA & Connected Central Scholarship Schemes</h3>
                <p className="text-xs text-mute mt-0.5">Budget utilization, quota allotments, and API gateway syncing status</p>
              </div>
              <button className="btn btn-primary text-xs py-2 px-4 font-semibold">
                + Provision New Scheme
              </button>
            </div>

            <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
              {schemes.map((s) => (
                <SpotlightCard key={s.id} className="p-4 sm:p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="badge badge-navy text-[10px] uppercase font-bold">{s.source}</span>
                      <span className="badge badge-leaf text-[10px]">Active / Enrolling</span>
                    </div>
                    <h4 className="font-bold text-sm sm:text-base text-ink mt-2">{s.name}</h4>
                    <p className="text-xs text-mute mt-1">{s.description}</p>
                  </div>

                  <div className="mt-4 sm:mt-5 pt-3 border-t border-line-subtle flex flex-col xs:flex-row xs:items-center justify-between gap-3">
                    <div>
                      <p className="text-base sm:text-lg font-extrabold text-navy">{s.amount}</p>
                      <p className="text-[10px] text-mute">Closing: {s.deadline}</p>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <button className="btn btn-outline text-xs py-1.5 px-3 flex-1 xs:flex-initial">
                        Edit Rules
                      </button>
                      <button className="btn btn-primary text-xs py-1.5 px-3 flex-1 xs:flex-initial">
                        Analytics
                      </button>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          STATE APPROVAL MATRIX TAB
          ═══════════════════════════════════════════════ */}
      {(activeTab === "overview" || activeTab === "states") && (
        <div className="space-y-4 animate-fade-in">
          <div className="card">
            <div className="p-4 sm:p-6 border-b border-line flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-bold text-base sm:text-lg text-ink">State-by-State Verification & Approval Index</h3>
                <p className="text-xs text-mute mt-0.5">Monitors throughput from state nodal departments to PFMS disbursement queue</p>
              </div>
              <button className="btn btn-outline text-xs py-1.5 px-3 flex items-center gap-1 self-start sm:self-auto">
                <Download size={13} /> Export State Ledger
              </button>
            </div>

            <p className="sm:hidden px-4 pt-3 text-[10px] text-mute italic flex items-center gap-1">
              <span>← Swipe table horizontally to see all columns →</span>
            </p>

            <div className="table-wrap border-0 rounded-none">
              <table>
                <thead>
                  <tr>
                    <th>State / UT</th>
                    <th>Applications</th>
                    <th>Node Verified</th>
                    <th>Approval %</th>
                    <th>Total Disbursed</th>
                    <th className="text-right">Performance Rank</th>
                  </tr>
                </thead>
                <tbody>
                  {stateWiseApprovals.map((s, idx) => (
                    <tr key={s.state}>
                      <td className="font-bold text-ink">{s.state}</td>
                      <td className="font-mono">{s.applications.toLocaleString()}</td>
                      <td className="font-mono text-leaf font-semibold">{s.approved.toLocaleString()}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <span className={`badge text-xs font-bold ${
                            s.rate >= 80 ? "badge-leaf" : s.rate >= 75 ? "badge-info" : "badge-saffron"
                          }`}>
                            {s.rate}%
                          </span>
                        </div>
                      </td>
                      <td className="font-mono font-semibold text-navy">₹{Math.round((s.approved * 36000) / 10000000)} Cr</td>
                      <td className="text-right">
                        <span className="font-mono text-xs text-mute bg-bg-warm px-2 py-0.5 rounded border border-line-subtle">
                          #{idx + 1}
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

      {/* ═══════════════════════════════════════════════
          PARTNER INSTITUTIONS TAB
          ═══════════════════════════════════════════════ */}
      {activeTab === "institutions" && (
        <div className="space-y-4 animate-fade-in">
          <div className="card p-4 sm:p-6">
            <h3 className="font-bold text-base sm:text-lg text-ink mb-1">Partner Higher Education Institutions (HEIs)</h3>
            <p className="text-xs text-mute mb-5">Institutional nodal officers handling ST certificate scrutiny and marks verification</p>

            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3 mb-6">
              {[
                { name: "Central Universities", count: "56", verified: "98.2%" },
                { name: "State Tribal Universities", count: "412", verified: "91.4%" },
                { name: "Affiliated Colleges & Poly", count: "3,372", verified: "84.6%" },
              ].map(i => (
                <div key={i.name} className="p-3.5 sm:p-4 rounded-xl bg-bg-warm border border-line">
                  <p className="text-xs font-semibold text-mute">{i.name}</p>
                  <p className="text-xl sm:text-2xl font-bold text-ink mt-1">{i.count}</p>
                  <p className="text-[11px] text-leaf font-semibold mt-1">Average Clearance: {i.verified}</p>
                </div>
              ))}
            </div>

            <p className="sm:hidden text-[10px] text-mute italic mb-1.5 flex items-center gap-1">
              <span>← Swipe table horizontally to see all columns →</span>
            </p>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>University / Institute</th>
                    <th>State</th>
                    <th>Enrolled ST Students</th>
                    <th>Queue Turnaround</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Savitribai Phule Pune University", state: "Maharashtra", students: "4,120", turnaround: "2.4 days", status: "Optimal" },
                    { name: "Ranchi University", state: "Jharkhand", students: "6,840", turnaround: "3.1 days", status: "Optimal" },
                    { name: "Indira Gandhi National Tribal University", state: "Madhya Pradesh", students: "5,310", turnaround: "1.9 days", status: "Fast Track" },
                    { name: "Utkal University", state: "Odisha", students: "3,890", turnaround: "4.2 days", status: "Attention" },
                  ].map(u => (
                    <tr key={u.name}>
                      <td className="font-bold text-ink">{u.name}</td>
                      <td className="text-xs text-mute">{u.state}</td>
                      <td className="font-mono">{u.students}</td>
                      <td className="font-mono text-xs">{u.turnaround}</td>
                      <td>
                        <span className={`badge text-[10px] ${u.status === "Fast Track" ? "badge-leaf" : u.status === "Optimal" ? "badge-info" : "badge-saffron"}`}>
                          {u.status}
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

      {/* ═══════════════════════════════════════════════
          TRIBAL COVERAGE GAPS TAB
          ═══════════════════════════════════════════════ */}
      {activeTab === "gaps" && (
        <div className="space-y-4 animate-fade-in">
          <div className="card p-4 sm:p-6 border-l-4 border-l-danger">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-danger/10 text-danger flex items-center justify-center shrink-0">
                <AlertTriangle size={22} />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg text-ink">Critical Priority Tribal Districts</h3>
                <p className="text-xs text-mute">Districts where ST scholarship uptake is below 50% of the 2026 census cohort</p>
              </div>
            </div>

            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 sm:mt-6">
              {[
                { district: "Nandurbar", state: "Maharashtra", stPop: "940,000", gap: "46%", reason: "Network dead zones in hilly blocks" },
                { district: "West Singhbhum", state: "Jharkhand", stPop: "1,010,000", gap: "42%", reason: "Aadhaar bank linkage backlog" },
                { district: "Alirajpur", state: "Madhya Pradesh", stPop: "650,000", gap: "39%", reason: "Migration during harvest season" },
              ].map(g => (
                <div key={g.district} className="p-4 rounded-xl border border-line bg-bg-warm/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-ink">{g.district}</span>
                      <span className="badge badge-danger text-[10px]">{g.gap} Gap</span>
                    </div>
                    <p className="text-xs text-mute mt-1">{g.state} · ST Pop: {g.stPop}</p>
                    <p className="text-xs text-danger font-medium mt-3 bg-white p-2 rounded border border-line">
                      Root cause: {g.reason}
                    </p>
                  </div>
                  <button className="btn btn-primary text-xs py-2 px-3 mt-4 w-full">
                    Deploy Mobile CSC Camp
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          REPORTS & AUDIT TAB
          ═══════════════════════════════════════════════ */}
      {activeTab === "reports" && (
        <div className="space-y-4 animate-fade-in">
          <div className="card p-6">
            <h3 className="font-bold text-lg text-ink mb-1">National Budget Allocation & PFMS Disbursal Ledger</h3>
            <p className="text-xs text-mute mb-5">Official annual accountability report submitted to Parliament</p>

            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div className="p-4 rounded-xl bg-bg-warm border border-line">
                <p className="text-xs text-mute font-medium">Approved Central Budget</p>
                <p className="text-2xl font-extrabold text-navy mt-1">₹8,420 Cr</p>
                <p className="text-[10px] text-mute mt-1">Union Budget FY 2026-27 Allocation</p>
              </div>
              <div className="p-4 rounded-xl bg-bg-warm border border-line">
                <p className="text-xs text-mute font-medium">PFMS Disbursed</p>
                <p className="text-2xl font-extrabold text-leaf mt-1">₹5,140 Cr</p>
                <p className="text-[10px] text-leaf font-medium mt-1">61.0% Disbursed directly into bank accounts</p>
              </div>
              <div className="p-4 rounded-xl bg-bg-warm border border-line">
                <p className="text-xs text-mute font-medium">Zero-Leakage Rating</p>
                <p className="text-2xl font-extrabold text-saffron-dark mt-1">100% DBT</p>
                <p className="text-[10px] text-mute mt-1">Direct Aadhaar Payment Bridge (APB)</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="btn btn-primary text-xs py-2.5 px-4 font-semibold">
                Generate Full Parliamentary PDF
              </button>
              <button className="btn btn-outline text-xs py-2.5 px-4">
                Export Raw CSV Data
              </button>
            </div>
          </div>
        </div>
      )}
    </SidebarLayout>
  );
}
