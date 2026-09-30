"use client";
import { useState } from "react";
import {
  LayoutDashboard, FileText, CheckSquare, AlertTriangle, BarChart3,
  CheckCircle2, XCircle, Eye, Search, Filter, ArrowRight,
  Clock, Shield, RefreshCw, UserCheck, AlertCircle, Building2
} from "lucide-react";
import SidebarLayout, { type SidebarLink } from "@/components/SidebarLayout";
import StatCard from "@/components/StatCard";
import SpotlightCard from "@/components/SpotlightCard";
import { verificationQueue, normalizeStatus, instituteStats } from "@/lib/mock";

type InstituteTab = "overview" | "queue" | "applications" | "exceptions" | "reports";

const sidebarLinks: SidebarLink[] = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "queue", label: "Verification Queue", icon: CheckSquare, badge: "4" },
  { id: "applications", label: "All Applications", icon: FileText, badge: String(verificationQueue.length) },
  { id: "exceptions", label: "Exceptions & Flags", icon: AlertTriangle, badge: "3" },
  { id: "reports", label: "Institute Reports", icon: BarChart3 },
];

export default function InstitutePortal() {
  const [activeTab, setActiveTab] = useState<InstituteTab>("overview");
  const [actions, setActions] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleAction = (id: string, action: string) => {
    setActions(prev => ({ ...prev, [id]: action }));
  };

  const filteredQueue = verificationQueue.filter(item => {
    const matchesSearch = item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.scheme.toLowerCase().includes(searchTerm.toLowerCase());
    const normalized = normalizeStatus(item.rawStatus);
    const matchesFilter = filterStatus === "all" || normalized === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <SidebarLayout
      title="Institute Verification"
      subtitle="Savitribai Phule Pune University · Node #IN-MH-2041"
      links={sidebarLinks}
      activeId={activeTab}
      onSelect={(id) => setActiveTab(id as InstituteTab)}
      headerRight={
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-leaf/10 border border-leaf/20 px-3 py-1.5 rounded-lg text-xs font-semibold text-leaf">
            <Shield size={14} />
            <span>Nodal Officer Verified</span>
          </div>
        </div>
      }
    >
      {/* ═══ Top Tab Pills ═══ */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {sidebarLinks.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as InstituteTab)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-navy text-white shadow-xs"
                : "bg-white border border-line text-mute hover:border-navy/30 hover:text-ink hover:bg-card-hover"
            }`}
          >
            <tab.icon size={15} />
            <span>{tab.label}</span>
            {tab.badge && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === tab.id ? "bg-white/20 text-white" : "bg-bg-warm text-mute"
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════
          OVERVIEW / DASHBOARD TAB
          ═══════════════════════════════════════════════ */}
      {activeTab === "overview" && (
        <div className="space-y-6 animate-fade-in">
          {/* Key Stats */}
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total Applications" value={instituteStats.totalApplications.toLocaleString()} icon={FileText} color="navy" trend={{ value: "+42 this week", up: true }} />
            <StatCard label="Pending Verification" value={instituteStats.pendingVerification} icon={AlertTriangle} color="saffron" />
            <StatCard label="Verified & Cleared" value={instituteStats.verified.toLocaleString()} icon={CheckCircle2} color="leaf" trend={{ value: `${instituteStats.approvalRate}% rate`, up: true }} />
            <StatCard label="Exceptions Requiring Review" value={instituteStats.exceptions} icon={XCircle} color="danger" subtitle={`Avg ${instituteStats.avgProcessingDays} days turnaround`} />
          </div>

          {/* Quick Action Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-base text-ink">Urgent Verification Batch</h3>
                  <p className="text-xs text-mute mt-0.5">High priority tribal students with upcoming portal closing dates</p>
                </div>
                <button
                  onClick={() => setActiveTab("queue")}
                  className="text-xs text-navy font-semibold hover:underline flex items-center gap-1"
                >
                  View full queue ({verificationQueue.length}) →
                </button>
              </div>

              <div className="space-y-3">
                {verificationQueue.slice(0, 3).map((item) => {
                  const done = actions[item.id];
                  return (
                    <div key={item.id} className="p-4 rounded-xl border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white hover:bg-bg-warm/50 transition-colors">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-ink">{item.studentName}</span>
                          <span className="badge badge-danger text-[10px] uppercase font-bold">Priority High</span>
                        </div>
                        <p className="text-xs text-mute mt-1">{item.scheme} · ID: {item.id}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {done ? (
                          <span className={`badge text-xs font-semibold ${done === "Approved" ? "badge-leaf" : "badge-danger"}`}>
                            {done}
                          </span>
                        ) : (
                          <>
                            <button
                              onClick={() => handleAction(item.id, "Approved")}
                              className="btn btn-primary text-xs py-1.5 px-3 flex items-center gap-1"
                            >
                              <CheckCircle2 size={13} /> Approve
                            </button>
                            <button
                              onClick={() => handleAction(item.id, "Rejected")}
                              className="btn btn-outline text-xs py-1.5 px-2.5 text-danger hover:border-danger"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Verification Adapter Status */}
            <div className="card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-navy/10 flex items-center justify-center text-navy font-bold">
                    <RefreshCw size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-ink">API Adapter Layer</h4>
                    <p className="text-[10px] text-mute">Automatic Status Mapping</p>
                  </div>
                </div>
                <p className="text-xs text-mute mt-3 leading-relaxed">
                  Different state and central portals use disparate terminologies. The USP Adapter Layer normalizes them into 
                  a unified schema:
                </p>
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between p-2 rounded bg-bg-warm border border-line-subtle">
                    <span className="text-mute italic">Portal: &quot;Docs Under Scrutiny&quot;</span>
                    <span className="badge badge-info font-mono text-[10px]">PENDING</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-bg-warm border border-line-subtle">
                    <span className="text-mute italic">Portal: &quot;Defective Inward&quot;</span>
                    <span className="badge badge-saffron font-mono text-[10px]">NEEDS_REVIEW</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-bg-warm border border-line-subtle">
                    <span className="text-mute italic">Portal: &quot;Scrutiny Passed&quot;</span>
                    <span className="badge badge-leaf font-mono text-[10px]">VERIFIED</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-leaf font-semibold mt-4">✓ 100% Adapter Sync with MoTA</p>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          VERIFICATION QUEUE TAB
          ═══════════════════════════════════════════════ */}
      {(activeTab === "queue" || activeTab === "applications") && (
        <div className="space-y-4 animate-fade-in">
          <div className="card p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="font-bold text-lg text-ink">
                  {activeTab === "queue" ? "Actionable Verification Queue" : "All Enrolled Student Applications"}
                </h3>
                <p className="text-xs text-mute mt-0.5">
                  Verify academic credentials, caste authenticity, and income certificates before pushing to District Officer.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-mute" />
                  <input
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search by student or ID..."
                    className="input !pl-8 !py-1.5 !text-xs w-48 sm:w-56"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className="input !py-1.5 !text-xs w-36"
                >
                  <option value="all">All Statuses</option>
                  <option value="VERIFIED">Verified</option>
                  <option value="PENDING">Pending</option>
                  <option value="NEEDS_REVIEW">Needs Review</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>App ID</th>
                    <th>Student Name</th>
                    <th>Scheme</th>
                    <th>Raw State Status</th>
                    <th>Adapter Norm</th>
                    <th>Priority</th>
                    <th>Docs Checked</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQueue.map((r) => {
                    const norm = normalizeStatus(r.rawStatus);
                    const done = actions[r.id];
                    return (
                      <tr key={r.id}>
                        <td className="font-mono text-xs font-semibold text-navy">{r.id}</td>
                        <td>
                          <p className="font-bold text-ink">{r.studentName}</p>
                          <p className="text-[10px] text-mute">{r.submittedDate}</p>
                        </td>
                        <td className="text-xs text-mute max-w-[180px] truncate" title={r.scheme}>{r.scheme}</td>
                        <td>
                          <span className="text-xs text-mute italic bg-bg-warm px-2 py-0.5 rounded border border-line-subtle">{r.rawStatus}</span>
                        </td>
                        <td>
                          <span className={`badge text-[10px] font-bold ${
                            norm === "VERIFIED" ? "badge-leaf" :
                            norm === "PENDING" ? "badge-info" :
                            "badge-saffron"
                          }`}>
                            {norm}
                          </span>
                        </td>
                        <td>
                          <span className={`badge text-[10px] uppercase font-semibold ${
                            r.priority === "high" ? "badge-danger" :
                            r.priority === "low" ? "badge-leaf" :
                            "badge-info"
                          }`}>
                            {r.priority}
                          </span>
                        </td>
                        <td>
                          <span className="text-xs font-semibold">{r.documents}</span>
                          {r.issues > 0 && <span className="text-xs text-danger font-semibold ml-1">({r.issues} issues)</span>}
                        </td>
                        <td className="text-right">
                          {done ? (
                            <span className={`badge text-xs font-bold ${done === "Approved" ? "badge-leaf" : done === "Rejected" ? "badge-danger" : "badge-saffron"}`}>
                              {done}
                            </span>
                          ) : (
                            <div className="inline-flex gap-1.5 justify-end">
                              <button
                                onClick={() => handleAction(r.id, "Approved")}
                                className="btn btn-primary text-xs py-1 px-2.5"
                                title="Approve and push to District Welfare Officer"
                              >
                                <CheckCircle2 size={12} /> Approve
                              </button>
                              <button
                                onClick={() => handleAction(r.id, "Review")}
                                className="btn btn-outline text-xs py-1 px-2"
                                title="Flag for manual inspection"
                              >
                                Review
                              </button>
                              <button
                                onClick={() => handleAction(r.id, "Rejected")}
                                className="btn btn-ghost text-xs py-1 px-2 text-danger hover:bg-danger/10"
                                title="Reject application"
                              >
                                <XCircle size={12} />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-3 border-t border-line flex flex-col sm:flex-row items-center justify-between text-xs text-mute gap-2">
              <p>Showing {filteredQueue.length} of {verificationQueue.length} records</p>
              <p>Canonical verification records are cryptographically timestamped</p>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          EXCEPTIONS & FLAGS TAB
          ═══════════════════════════════════════════════ */}
      {activeTab === "exceptions" && (
        <div className="space-y-4 animate-fade-in">
          <div className="card p-6 bg-white border-line">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg text-ink">Verification Exceptions & Flags</h3>
                <p className="text-xs text-mute mt-0.5">Applications where automated DigiLocker check found discrepancies</p>
              </div>
              <span className="badge badge-danger text-xs font-bold">3 Pending Cases</span>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: "EX-01",
                  student: "Vikram P. Gavit",
                  scheme: "Post-Matric Scholarship for ST",
                  issue: "Income Certificate mismatch: Declared ₹1,20,000, State Revenue database shows ₹1,85,000.",
                  action: "Requires manual Tehsil seal review",
                },
                {
                  id: "EX-02",
                  student: "Sunita K. Valvi",
                  scheme: "National Overseas Scholarship for ST",
                  issue: "GRE score PDF uploaded directly without DigiLocker verification hash.",
                  action: "Requested re-upload with ETS score code",
                },
                {
                  id: "EX-03",
                  student: "Anand M. Kokani",
                  scheme: "National Fellowship for Higher Education of ST",
                  issue: "M.Phil Admission letter date is older than 6 months from scheme notification.",
                  action: "Requires Dean signature endorsement",
                },
              ].map(ex => (
                <div key={ex.id} className="p-5 rounded-xl border border-line bg-bg-warm/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-danger">{ex.id}</span>
                      <h4 className="font-bold text-ink">{ex.student}</h4>
                      <span className="badge badge-saffron text-[10px]">Action Required</span>
                    </div>
                    <p className="text-xs font-medium text-mute mt-1">{ex.scheme}</p>
                    <p className="text-xs text-danger font-medium mt-2 bg-danger/5 p-2 rounded border border-danger/10">
                      {ex.issue}
                    </p>
                  </div>
                  <div className="flex sm:flex-col gap-2 shrink-0">
                    <button className="btn btn-primary text-xs py-2 px-4 font-semibold">
                      Request Clarification
                    </button>
                    <button className="btn btn-outline text-xs py-2 px-4">
                      Override & Clear
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          REPORTS TAB
          ═══════════════════════════════════════════════ */}
      {activeTab === "reports" && (
        <div className="space-y-6 animate-fade-in">
          <div className="card p-6">
            <h3 className="font-bold text-lg text-ink mb-1">Institutional Audit & Processing Report</h3>
            <p className="text-xs text-mute mb-6">Cycle: Academic Year 2026-27 · Pune Regional Division</p>

            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div className="p-4 rounded-xl bg-bg-warm border border-line">
                <p className="text-xs text-mute font-medium">Clearance Rate</p>
                <p className="text-2xl font-extrabold text-leaf mt-1">94.2%</p>
                <p className="text-[10px] text-mute mt-1">+3.1% compared to last cycle</p>
              </div>
              <div className="p-4 rounded-xl bg-bg-warm border border-line">
                <p className="text-xs text-mute font-medium">Average Resolution Speed</p>
                <p className="text-2xl font-extrabold text-navy mt-1">2.4 Days</p>
                <p className="text-[10px] text-leaf font-medium mt-1">Well within MoTA SLA (7 Days)</p>
              </div>
              <div className="p-4 rounded-xl bg-bg-warm border border-line">
                <p className="text-xs text-mute font-medium">Total Funds Verified</p>
                <p className="text-2xl font-extrabold text-saffron-dark mt-1">₹4.82 Cr</p>
                <p className="text-[10px] text-mute mt-1">Sent to District Welfare for approval</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-line flex items-center justify-between">
              <div>
                <p className="font-bold text-sm text-ink">Download Institutional Compliance Docket</p>
                <p className="text-xs text-mute">Includes digital signatures of Nodal Officer and Registrar</p>
              </div>
              <button className="btn btn-outline text-xs py-2 px-4">
                Export PDF Docket
              </button>
            </div>
          </div>
        </div>
      )}
    </SidebarLayout>
  );
}
