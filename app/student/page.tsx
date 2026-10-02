"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard, Search, FileText, FolderOpen, Clock, Wallet,
  Bell, CheckCircle2, XCircle, AlertCircle, WifiOff, Wifi,
  Upload, ChevronRight, ArrowRight, TrendingUp, Eye, RefreshCw,
  User, GraduationCap, Shield, Sparkles, Filter,
} from "lucide-react";
import SidebarLayout, { type SidebarLink } from "@/components/SidebarLayout";
import StatCard from "@/components/StatCard";
import SpotlightCard from "@/components/SpotlightCard";
import TracingTimeline from "@/components/TracingTimeline";
import {
  studentProfile, checkEligibility, documents as docData,
  applicationTimeline, studentApplications, notifications, schemes,
} from "@/lib/mock";
import type { EligibilityResult } from "@/lib/mock";

type TabId = "dashboard" | "discover" | "applications" | "documents" | "timeline";

const sidebarLinks: SidebarLink[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "discover", label: "Discover Schemes", icon: Search, badge: "8" },
  { id: "applications", label: "My Applications", icon: FileText, badge: "3" },
  { id: "documents", label: "Document Wallet", icon: FolderOpen, badge: "4" },
  { id: "timeline", label: "Verification & DBT", icon: Clock },
];

const statusColors: Record<string, string> = {
  submitted: "badge-info",
  under_review: "badge-saffron",
  verified: "badge-leaf",
  approved: "badge-leaf",
  rejected: "badge-danger",
  disbursed: "badge-navy",
};

const statusLabels: Record<string, string> = {
  submitted: "Submitted",
  under_review: "Under Review",
  verified: "Verified",
  approved: "Approved",
  rejected: "Rejected",
  disbursed: "Disbursed",
};

export default function StudentPortal() {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [level, setLevel] = useState("ug");
  const [income, setIncome] = useState(180000);
  const [state, setState] = useState("Maharashtra");
  const [eligResults, setEligResults] = useState<EligibilityResult[] | null>(null);
  const [docs, setDocs] = useState(docData);
  const [offline, setOffline] = useState(false);
  const [syncQueue, setSyncQueue] = useState<string[]>([]);

  useEffect(() => {
    const on = () => setOffline(false);
    const off = () => setOffline(true);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);

  const handleSync = () => {
    setDocs(prev => prev.map(d => syncQueue.includes(d.id) ? { ...d, status: "uploaded" as const } : d));
    setSyncQueue([]);
    setOffline(false);
  };

  const unreadNotifs = notifications.filter(n => !n.read).length;

  return (
    <SidebarLayout
      title="Student Portal"
      subtitle={`Welcome back, ${studentProfile.name}`}
      links={sidebarLinks}
      activeId={activeTab}
      onSelect={(id) => setActiveTab(id as TabId)}
      headerRight={
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Offline indicator */}
          <button
            onClick={() => offline ? handleSync() : setOffline(true)}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
              offline ? "border-saffron text-saffron bg-saffron/10 font-medium" : "border-line text-mute hover:bg-card-hover"
            }`}
            title={offline ? "Click to sync offline changes" : "Simulate offline mode"}
          >
            {offline ? <WifiOff size={14} /> : <Wifi size={14} />}
            <span className="hidden sm:inline">{offline ? `Offline (${syncQueue.length} queued)` : "Online"}</span>
          </button>

          {/* Profile pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-line">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-white text-xs font-bold shadow-2xs">
              {studentProfile.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-semibold text-ink leading-tight">{studentProfile.name}</p>
              <p className="text-[10px] text-mute leading-tight">{studentProfile.category} · {studentProfile.state}</p>
            </div>
          </div>
        </div>
      }
    >
      {/* ═══════════════════════════════════════════════
          DASHBOARD TAB
          ═══════════════════════════════════════════════ */}
      {activeTab === "dashboard" && (
        <div className="space-y-5 sm:space-y-6 animate-fade-in">
          {/* Greeting Card */}
          <div className="card p-4 sm:p-6 bg-gradient-to-r from-white to-bg-warm border-line">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="badge badge-saffron text-[10px]">ST Beneficiary</span>
                  <span className="text-xs text-mute font-mono">UID: {studentProfile.aadhaar}</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-ink">
                  Good morning, {studentProfile.name.split(" ")[0]} 👋
                </h2>
                <p className="text-xs sm:text-sm text-mute mt-1">
                  {studentProfile.institute} · {studentProfile.course} ({studentProfile.year})
                </p>
              </div>

              {/* Profile Completion Bar */}
              <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 bg-white p-3 sm:p-3.5 rounded-xl border border-line shadow-2xs">
                <div className="text-left sm:text-right">
                  <p className="text-[10px] sm:text-[11px] text-mute font-medium">Profile completeness</p>
                  <p className="text-lg sm:text-xl font-bold text-navy">{studentProfile.profileCompletion}%</p>
                </div>
                <div className="w-24 sm:w-36">
                  <div className="progress-bar h-2.5">
                    <div className="progress-bar-fill" style={{ width: `${studentProfile.profileCompletion}%` }} />
                  </div>
                  <p className="text-[9px] text-leaf font-semibold mt-1">DigiLocker Synced</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
            <StatCard label="Eligible Schemes" value="8" icon={Search} color="navy" trend={{ value: "+3 new", up: true }} />
            <StatCard label="Active Applications" value={studentApplications.length} icon={FileText} color="saffron" />
            <StatCard label="Documents Verified" value={docs.filter(d => d.status === "verified").length} icon={CheckCircle2} color="leaf" />
            <StatCard label="Pending Stage" value="1" icon={AlertCircle} color="danger" subtitle="District office review" />
          </div>

          {/* Recommended Scholarships */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="font-bold text-base sm:text-lg text-ink">Recommended Scholarships</h3>
                <p className="text-xs text-mute mt-0.5">Matched from your ST category, income, and university enrollment</p>
              </div>
              <button
                onClick={() => setActiveTab("discover")}
                className="btn btn-outline text-xs py-1.5 px-3 flex items-center gap-1 hover:text-navy self-start sm:self-auto cursor-pointer"
              >
                View all schemes <ChevronRight size={14} />
              </button>
            </div>

            <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
              {schemes.slice(0, 4).map(s => (
                <SpotlightCard key={s.id} className="p-4 sm:p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-ink truncate">{s.name}</h4>
                        <p className="text-xs text-mute mt-0.5">{s.source} · {s.level}</p>
                      </div>
                      <span className="badge badge-leaf shrink-0 font-semibold text-[10px] sm:text-[11px]">92% match</span>
                    </div>
                    <div className="mt-3 sm:mt-4 flex items-baseline gap-2">
                      <p className="text-xl sm:text-2xl font-extrabold text-navy">{s.amount}</p>
                      <span className="text-xs text-mute">/ academic year</span>
                    </div>
                    <p className="text-xs text-mute mt-1">Application Deadline: <strong className="text-ink">{s.deadline}</strong></p>
                  </div>

                  <div className="flex flex-col xs:flex-row gap-2 mt-4 sm:mt-5 pt-3 border-t border-line-subtle">
                    <button
                      onClick={() => setActiveTab("discover")}
                      className="btn btn-primary text-xs py-2 px-3 sm:px-4 flex-1 font-semibold justify-center"
                    >
                      Check Eligibility & Apply
                    </button>
                    <button
                      onClick={() => setActiveTab("documents")}
                      className="btn btn-outline text-xs py-2 px-3 justify-center"
                    >
                      Required Docs
                    </button>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>


          {/* Application Timeline + Notifications Row */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Timeline Widget */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-bold text-base text-ink">Active Application Track</h3>
                  <p className="text-xs text-mute">Post-matric Scholarship for ST · 2026-001042</p>
                </div>
                <button
                  onClick={() => setActiveTab("timeline")}
                  className="text-xs text-navy font-semibold hover:underline"
                >
                  Full Timeline →
                </button>
              </div>
              <TracingTimeline steps={applicationTimeline} />
            </div>

            {/* Notifications Widget */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-base text-ink">Recent Alerts</h3>
                <span className="badge badge-navy text-[10px]">{unreadNotifs} Unread</span>
              </div>
              <div className="space-y-3">
                {notifications.map(n => (
                  <div key={n.id} className={`flex items-start gap-3 p-3.5 rounded-xl border transition-colors ${
                    n.read ? "bg-white border-line-subtle" : "bg-bg-warm border-line"
                  }`}>
                    <div className={`mt-0.5 shrink-0 ${n.type === "success" ? "text-leaf" : n.type === "warning" ? "text-saffron-dark" : "text-info"}`}>
                      {n.type === "success" ? <CheckCircle2 size={16} /> : n.type === "warning" ? <AlertCircle size={16} /> : <Bell size={16} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${n.read ? "text-ink-secondary" : "font-bold text-ink"}`}>{n.title}</p>
                      <p className="text-xs text-mute mt-0.5 leading-relaxed">{n.description}</p>
                      <p className="text-[10px] text-mute mt-1.5">{n.time}</p>
                    </div>
                    {!n.read && <span className="status-dot active mt-1.5 shrink-0" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          DISCOVER SCHEMES TAB (ELIGIBILITY ENGINE)
          ═══════════════════════════════════════════════ */}
      {activeTab === "discover" && (
        <div className="space-y-6 animate-fade-in">
          <div className="card p-6 border-line bg-gradient-to-br from-white to-bg-warm">
            <div className="max-w-xl mb-5">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={16} className="text-saffron-dark" />
                <span className="text-xs font-bold text-saffron-dark uppercase tracking-wider">Deterministic Engine</span>
              </div>
              <h3 className="font-extrabold text-xl sm:text-2xl text-ink">Check Your Scholarship Eligibility</h3>
              <p className="text-xs sm:text-sm text-mute mt-1">
                Our rule-based engine evaluates MoTA, NSP, and State criteria to give you guaranteed matches with transparent breakdown.
              </p>
            </div>

            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="input-label">Education Level</label>
                <select value={level} onChange={e => setLevel(e.target.value)} className="input">
                  <option value="school">Class 9 to 10 (Pre-Matric)</option>
                  <option value="ug">Class 11 / 12 / Undergrad (Post-Matric)</option>
                  <option value="pg">Postgraduate (Masters / Professional)</option>
                  <option value="phd">M.Phil / Ph.D. (Research Fellowship)</option>
                </select>
              </div>

              <div>
                <label className="input-label">Annual Family Income (₹)</label>
                <input
                  type="number"
                  value={income}
                  onChange={e => setIncome(+e.target.value)}
                  className="input font-mono"
                  step="10000"
                />
              </div>

              <div>
                <label className="input-label">Domicile State</label>
                <select value={state} onChange={e => setState(e.target.value)} className="input">
                  <option value="All India">All India / Pan-India</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Odisha">Odisha</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => setEligResults(checkEligibility({ income, level, state }))}
                  className="btn btn-primary w-full py-2.5 font-semibold text-sm shadow-xs"
                >
                  <Search size={16} /> Evaluate Schemes
                </button>
              </div>
            </div>
          </div>

          {/* Results List */}
          {eligResults ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-white border border-line rounded-xl">
                <p className="text-sm text-ink font-semibold">
                  Found <span className="text-leaf font-bold">{eligResults.filter(r => r.eligible).length} Eligible</span> scholarships out of {eligResults.length} evaluated
                </p>
                <button
                  onClick={() => setEligResults(null)}
                  className="text-xs text-mute hover:text-navy underline self-start sm:self-auto cursor-pointer"
                >
                  Reset Calculator
                </button>
              </div>

              <div className="space-y-3">
                {eligResults.map((r) => (
                  <SpotlightCard key={r.id} className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`badge ${r.eligible ? "badge-leaf" : "badge-danger"}`}>
                            {r.eligible ? "Eligible" : "Not Eligible"}
                          </span>
                          <span className="text-xs text-mute font-medium">{r.source} · {r.level}</span>
                        </div>
                        <h4 className="text-lg font-bold text-ink">{r.name}</h4>
                        <p className="text-sm text-mute mt-1.5 leading-relaxed">{r.description}</p>

                        {/* Criteria Checklist */}
                        <div className="mt-4 pt-3 border-t border-line-subtle">
                          <p className="text-xs font-semibold text-ink-secondary mb-2">Eligibility Criteria Checklist:</p>
                          <div className="flex flex-wrap gap-2">
                            {r.criteria.map(c => (
                              <span
                                key={c.label}
                                className={`badge text-[11px] ${c.matched ? "badge-leaf" : "badge-danger"}`}
                              >
                                {c.matched ? "✓" : "✗"} {c.label}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Required Documents */}
                        {r.eligible && (
                          <div className="mt-3">
                            <p className="text-xs font-semibold text-ink-secondary mb-1.5">Required Documents Status:</p>
                            <div className="flex flex-wrap gap-2">
                              {r.documents.map(d => {
                                const hasDoc = docs.some(doc => doc.name.toLowerCase().includes(d.toLowerCase()) && (doc.status === "verified" || doc.status === "uploaded"));
                                return (
                                  <span key={d} className={`badge text-[10px] ${hasDoc ? "badge-leaf" : "badge-saffron"}`}>
                                    {hasDoc ? "✓ In Wallet" : "□ Needs Upload"} : {d}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Right amount & action block */}
                      <div className="md:text-right shrink-0 flex flex-col justify-between pt-2 md:pt-0 border-t md:border-t-0 border-line">
                        <div>
                          <p className="text-2xl font-extrabold text-navy">{r.amount}</p>
                          <p className="text-xs text-mute mt-0.5">Deadline: {r.deadline}</p>
                        </div>
                        {r.eligible ? (
                          <div className="mt-4 flex md:flex-col gap-2">
                            <button className="btn btn-primary text-xs py-2 px-5 font-semibold">
                              Submit Application <ArrowRight size={14} />
                            </button>
                            <button onClick={() => setActiveTab("documents")} className="btn btn-outline text-xs py-2 px-4">
                              Prepare Wallet
                            </button>
                          </div>
                        ) : (
                          <p className="text-xs text-danger mt-4 font-medium">Income/level limit exceeded</p>
                        )}
                      </div>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          ) : (
            <div className="card p-12 text-center border-dashed">
              <Search size={40} className="mx-auto text-line mb-3" />
              <h3 className="font-bold text-lg text-ink">Ready to match your profile</h3>
              <p className="text-sm text-mute mt-1 max-w-md mx-auto">
                Set your education level and family income above, then click <strong>Evaluate Schemes</strong> to see instantaneous eligibility.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          MY APPLICATIONS TAB
          ═══════════════════════════════════════════════ */}
      {activeTab === "applications" && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-lg text-ink">Submitted Applications ({studentApplications.length})</h3>
              <p className="text-xs text-mute">Track status across Institute, District, State, and PFMS payment nodes</p>
            </div>
            <button
              onClick={() => setActiveTab("discover")}
              className="btn btn-primary text-xs py-2 px-4 self-start sm:self-auto"
            >
              + Apply for New Scheme
            </button>
          </div>

          {studentApplications.map(app => (
            <SpotlightCard key={app.id} className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-mute bg-bg-warm px-2 py-0.5 rounded border border-line">
                      {app.id}
                    </span>
                    <span className={`badge ${statusColors[app.status]}`}>
                      {statusLabels[app.status]}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm sm:text-base text-ink mt-2">{app.schemeName}</h4>
                  <p className="text-xs text-mute mt-1">Submitted: {app.appliedDate} · Academic Session 2026-27</p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-5 pt-2 sm:pt-0 border-t sm:border-t-0 border-line-subtle">
                  <div className="sm:text-right">
                    <p className="text-lg sm:text-xl font-extrabold text-navy">{app.amount}</p>
                    <p className="text-xs text-mute">Stage: <strong className="text-ink">{app.currentStep}</strong></p>
                  </div>
                  <button
                    onClick={() => setActiveTab("timeline")}
                    className="btn btn-outline text-xs py-2 px-3 flex items-center gap-1.5 shrink-0"
                  >
                    <Eye size={14} /> Full Track
                  </button>
                </div>
              </div>

              {/* Step indicator */}
              <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-line-subtle grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { name: "Submission", done: true },
                  { name: "Institute Verification", done: app.status !== "submitted" },
                  { name: "District / State Approval", done: app.status === "approved" || app.status === "disbursed" },
                  { name: "DBT Payment", done: app.status === "disbursed" },
                ].map((s, idx) => (
                  <div key={s.name}>
                    <div className={`h-2 rounded-full ${s.done ? "bg-leaf" : "bg-line"}`} />
                    <p className="text-[10px] text-mute mt-1 truncate" title={s.name}>{s.name}</p>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          DOCUMENTS TAB (WALLET)
          ═══════════════════════════════════════════════ */}
      {activeTab === "documents" && (
        <div className="space-y-6 animate-fade-in">
          <div className="card p-6 bg-gradient-to-r from-white to-bg-warm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="badge badge-leaf text-[10px]">DigiLocker Certified</span>
                <span className="text-xs text-mute font-medium">Auto-verification Active</span>
              </div>
              <h3 className="font-extrabold text-xl text-ink">Personal Document Wallet</h3>
              <p className="text-xs text-mute mt-1">
                Upload once and reuse across every scholarship portal. DigiLocker pulls verified certificates automatically.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => offline ? handleSync() : setOffline(true)}
                className={`btn text-xs py-2 px-3.5 border ${
                  offline ? "border-saffron text-saffron bg-saffron/10 font-bold" : "border-line text-mute hover:bg-card-hover"
                }`}
              >
                {offline ? <WifiOff size={14} /> : <Wifi size={14} />}
                <span>{offline ? "Sync Queue (1)" : "Simulate Offline"}</span>
              </button>
            </div>
          </div>

          {/* Document categories */}
          {["Identity", "Education", "Financial", "Category"].map(cat => {
            const catDocs = docs.filter(d => d.category === cat);
            if (catDocs.length === 0) return null;
            return (
              <div key={cat} className="space-y-3">
                <h4 className="text-xs font-bold text-ink-secondary uppercase tracking-wider">{cat} Certificates</h4>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {catDocs.map(d => (
                    <SpotlightCard key={d.id} className="p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className={`p-2 rounded-lg ${
                            d.status === "verified" ? "bg-leaf/10 text-leaf" : d.status === "uploaded" ? "bg-info/10 text-info" : "bg-danger/10 text-danger"
                          }`}>
                            {d.status === "verified" ? <CheckCircle2 size={18} /> : d.status === "uploaded" ? <FileText size={18} /> : <AlertCircle size={18} />}
                          </div>
                          <span className={`badge text-[10px] font-semibold ${
                            d.status === "verified" ? "badge-leaf" : d.status === "uploaded" ? "badge-info" : "badge-danger"
                          }`}>
                            {d.status === "verified" ? "Verified" : d.status === "uploaded" ? "Uploaded" : "Missing"}
                          </span>
                        </div>
                        <h5 className="font-bold text-sm text-ink mt-3">{d.name}</h5>
                        <p className="text-[11px] text-mute mt-0.5">{d.source || "Direct student upload"}</p>
                        {d.uploadDate && <p className="text-[10px] text-mute mt-1">Last synced: {d.uploadDate}</p>}
                      </div>

                      <div className="mt-4 pt-3 border-t border-line-subtle flex items-center justify-between text-xs">
                        {d.status === "missing" ? (
                          <button className="text-navy font-semibold flex items-center gap-1 hover:underline">
                            <Upload size={13} /> Upload Now
                          </button>
                        ) : (
                          <>
                            <button className="text-navy font-semibold flex items-center gap-1 hover:underline">
                              <Eye size={13} /> View Cert
                            </button>
                            <button className="text-mute hover:text-ink flex items-center gap-1">
                              <RefreshCw size={13} /> Update
                            </button>
                          </>
                        )}
                      </div>
                    </SpotlightCard>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          TIMELINE TAB (DBT & VERIFICATION)
          ═══════════════════════════════════════════════ */}
      {activeTab === "timeline" && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Timeline */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-extrabold text-lg text-ink">Life-Cycle Status Timeline</h3>
                  <p className="text-xs text-mute mt-0.5">Post-matric ST Scholarship · App ID: USP-2026-001042</p>
                </div>
                <span className="badge badge-saffron text-[10px]">Processing</span>
              </div>
              <TracingTimeline steps={applicationTimeline} />
            </div>

            {/* Right Status Cards */}
            <div className="space-y-4">
              <h3 className="font-bold text-base text-ink">Node Verification Details</h3>

              <div className="card p-5 border-l-4 border-l-leaf">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-leaf/10 text-leaf flex items-center justify-center shrink-0">
                    <CheckCircle2 size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink">Stage 1: Institute Verification Passed</p>
                    <p className="text-xs text-mute mt-0.5">Savitribai Phule Pune University · Verified 16 Sep 2026</p>
                    <p className="text-[11px] text-leaf font-medium mt-1">Enrollment & marks audited</p>
                  </div>
                </div>
              </div>

              <div className="card p-5 border-l-4 border-l-saffron">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-saffron/10 text-saffron-dark flex items-center justify-center shrink-0">
                    <Clock size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink">Stage 2: District Welfare Office Review</p>
                    <p className="text-xs text-mute mt-0.5">Pune District Tribal Office · Desk Officer 4</p>
                    <p className="text-[11px] text-saffron-dark font-medium mt-1">Expected completion: 2-3 business days</p>
                  </div>
                </div>
              </div>

              <div className="card p-5 border-l-4 border-l-line opacity-75">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-bg-warm text-mute flex items-center justify-center shrink-0">
                    <Shield size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink-secondary">Stage 3: State Director Approval</p>
                    <p className="text-xs text-mute mt-0.5">Tribal Development Department, Maharashtra</p>
                    <p className="text-[11px] text-mute mt-1">Pending stage 2 signoff</p>
                  </div>
                </div>
              </div>

              <div className="card p-5 border-l-4 border-l-line opacity-75">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-bg-warm text-mute flex items-center justify-center shrink-0">
                    <Wallet size={22} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-ink-secondary">Stage 4: DBT Disbursal (PFMS)</p>
                    <p className="text-xs text-mute mt-0.5">Aadhaar-Linked Bank Account · Bank of Maharashtra (••••4821)</p>
                    <p className="text-[11px] text-mute mt-1">Direct Bank Credit: ₹48,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </SidebarLayout>
  );
}
