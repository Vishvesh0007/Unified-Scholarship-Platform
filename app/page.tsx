import Link from "next/link";
import Beams from "@/components/Beams";
import SpotlightCard from "@/components/SpotlightCard";
import Marquee from "@/components/Marquee";
import WaveDivider from "@/components/WaveDivider";
import {
  Users, Building2, ShieldCheck, Landmark,
  Search, FileCheck2, Clock, Wallet, Bot, WifiOff,
  ArrowRight, CheckCircle2, ChevronRight,
  Globe, Layers, Database, Lock,
} from "lucide-react";

const roles = [
  {
    icon: Users,
    title: "Student Portal",
    subtitle: "Applicant & Beneficiary",
    desc: "Find eligible schemes, upload to document wallet, track verification status, and monitor DBT disbursement in one unified timeline.",
    href: "/student",
    color: "navy" as const,
    cta: "Launch Student Portal",
  },
  {
    icon: Building2,
    title: "Institute Portal",
    subtitle: "School / College Verifier",
    desc: "Verify enrolled tribal students, review flagged documents, approve applications, and handle exception workflows with automated checks.",
    href: "/institute",
    color: "saffron" as const,
    cta: "Launch Institute Portal",
  },
  {
    icon: ShieldCheck,
    title: "District Dashboard",
    subtitle: "District Welfare Officer",
    desc: "Monitor tehsil-level verification queues, identify processing bottlenecks, and eliminate tribal coverage gaps in real time.",
    href: "/district",
    color: "leaf" as const,
    cta: "Launch District Dashboard",
  },
  {
    icon: Landmark,
    title: "Ministry Dashboard",
    subtitle: "MoTA & State Directors",
    desc: "National dashboard with state approval trends, multi-scheme allocation analytics, and direct-benefit-transfer tracking.",
    href: "/ministry",
    color: "info" as const,
    cta: "Launch Ministry Dashboard",
  },
];

const colorClasses = {
  navy: { bg: "bg-[rgba(26,54,93,0.08)]", text: "text-navy", border: "border-navy/20", button: "btn-primary" },
  saffron: { bg: "bg-[rgba(217,119,6,0.08)]", text: "text-saffron-dark", border: "border-saffron/20", button: "btn-saffron" },
  leaf: { bg: "bg-[rgba(22,163,74,0.08)]", text: "text-leaf", border: "border-leaf/20", button: "bg-leaf text-white hover:bg-leaf-dark" },
  info: { bg: "bg-[rgba(59,130,246,0.08)]", text: "text-info", border: "border-info/20", button: "bg-info text-white hover:bg-blue-600" },
};

const features = [
  { icon: Search, title: "Eligibility Engine", desc: "Rule-based matching across all central and state schemes. See exactly which scholarships you qualify for — and why.", span: "md:col-span-4" },
  { icon: Wallet, title: "Document Wallet", desc: "Upload once, reuse everywhere. DigiLocker integration for instant verified Aadhaar, caste, and income certificates.", span: "md:col-span-2" },
  { icon: FileCheck2, title: "Unified Application", desc: "One form that maps to multiple scheme portals through the adapter layer without repetitive entry.", span: "md:col-span-2" },
  { icon: Clock, title: "Status & DBT Tracking", desc: "Every portal's wording normalized into one plain timeline from initial submission to DBT bank credit.", span: "md:col-span-4" },
  { icon: Bot, title: "JAGO AI Assistant", desc: "Ask questions in your preferred language. Answers grounded in official scheme guidelines via RAG, not generic guesses.", span: "md:col-span-3" },
  { icon: WifiOff, title: "Offline-First PWA", desc: "Works seamlessly even without internet in remote tribal belts. Saves data locally and auto-syncs when online.", span: "md:col-span-3" },
];

const howItWorks = [
  { step: "01", title: "Onboard", desc: "Create one unified profile with your academic, demographic, and financial details.", icon: Users },
  { step: "02", title: "Discover", desc: "The Eligibility Engine checks matching schemes across NSP, MoTA, and state databases.", icon: Search },
  { step: "03", title: "Apply", desc: "Submit a single application mapped automatically through our common data model.", icon: FileCheck2 },
  { step: "04", title: "Verify", desc: "Watch verification move smoothly from Institute to District to State in one clear timeline.", icon: ShieldCheck },
  { step: "05", title: "Receive", desc: "Scholarship money disbursed directly to your Aadhaar-seeded bank account via DBT/PFMS.", icon: Wallet },
];

const techStack = [
  { icon: Globe, title: "Next.js 14 PWA", desc: "Offline-ready, lightning fast, accessible progressive web app" },
  { icon: Lock, title: "Secure API Layer", desc: "Role-based access control, cryptographic verification & gateway" },
  { icon: Layers, title: "Adapter Layer", desc: "Normalizes NSP, MoTA, DigiLocker and state portal APIs" },
  { icon: Database, title: "Common Data Model", desc: "Canonical schema standardizing student data across schemes" },
];

export default function Home() {
  return (
    <main className="flex flex-col w-full min-w-0">
      {/* ═══ Hero ═══ */}
      <header className="relative hero-gradient min-h-[80vh] sm:min-h-[85vh] flex items-center overflow-hidden px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
        <Beams />
        <div className="relative container-main w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4 sm:mb-6 flex-wrap">
              <span className="badge badge-navy">Smart India Hackathon 2026</span>
              <span className="badge badge-saffron">Team Vecood</span>
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight">
              One profile.
              <br />
              <span className="gradient-text">Every scholarship.</span>
            </h1>

            <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base md:text-lg text-mute leading-relaxed">
              A unified platform that sits above existing government systems — NSP, MoTA, DigiLocker, DBT/PFMS — 
              giving every tribal student a seamless, barrier-free journey from discovery to disbursement.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link href="/student" className="btn btn-primary px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-semibold shadow-md justify-center">
                Open Student Portal
                <ArrowRight size={18} />
              </Link>
              <Link href="#portals" className="btn btn-outline px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base justify-center">
                Explore All Portals
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 border-t border-line pt-6 sm:pt-8">
              {[
                { value: "4.2M+", label: "Eligible Students" },
                { value: "24+", label: "Schemes Connected" },
                { value: "28", label: "States Covered" },
                { value: "₹8,420Cr", label: "Potential Disbursement" },
              ].map((s) => (
                <div key={s.label} className="p-2 sm:p-0">
                  <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-ink">{s.value}</p>
                  <p className="text-[11px] sm:text-xs text-mute mt-0.5 sm:mt-1 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <WaveDivider color="var(--card)" />

      {/* ═══ Choose Portal ═══ */}
      <section className="section bg-white" id="portals">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
            <span className="badge badge-navy mb-2 sm:mb-3">Multi-Stakeholder Architecture</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">Choose your portal</h2>
            <p className="mt-3 sm:mt-4 text-mute text-sm sm:text-base">
              Four specialized portals designed for each key stakeholder in the tribal scholarship ecosystem.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((role) => {
              const c = colorClasses[role.color];
              return (
                <Link key={role.title} href={role.href} className="block h-full group focus:outline-none">
                  <SpotlightCard className="h-full p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group-hover:border-navy/30 group-hover:shadow-md">
                    <div className="flex-1 flex flex-col">
                      <div className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl ${c.bg} mb-4 sm:mb-5 group-hover:scale-105 transition-transform`}>
                        <role.icon size={22} className={c.text} />
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-mute">{role.subtitle}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-ink">{role.title}</h3>
                      <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-mute leading-relaxed">{role.desc}</p>
                    </div>

                    <div className={`mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-line-subtle flex items-center justify-between text-xs sm:text-sm font-semibold ${c.text}`}>
                      <span>{role.cta}</span>
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </SpotlightCard>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ How It Works ═══ */}
      <section className="section bg-bg" id="how-it-works">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
            <span className="badge badge-saffron mb-2 sm:mb-3">Student Journey</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Onboard → Discover → Apply → Verify → Receive
            </h2>
            <p className="mt-3 sm:mt-4 text-mute text-sm sm:text-base">
              Five clear steps from initial profile setup to scholarship funds deposited in your account.
            </p>
          </div>

          <div className="relative">
            {/* Desktop horizontal connection line */}
            <div className="hidden md:block absolute top-7 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-navy via-saffron to-leaf opacity-30 z-0" />

            <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-5 relative z-10">
              {howItWorks.map((step, i) => (
                <div
                  key={step.step}
                  className="card md:card-none p-4 sm:p-5 md:p-0 md:bg-transparent md:border-0 md:shadow-none relative text-left md:text-center flex md:flex-col items-center md:items-center gap-4 md:gap-0 animate-fade-in-up"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {/* Icon wrapper with securely anchored badge */}
                  <div className="relative inline-flex items-center justify-center md:mb-4 shrink-0">
                    <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-white border-2 border-line shadow-xs relative z-10">
                      <step.icon size={22} className="text-navy" />
                    </div>
                    <div className="absolute -top-1 -right-1 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-saffron text-white text-[10px] sm:text-[11px] font-bold z-20 shadow-xs border-2 border-white">
                      {step.step}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 md:flex-initial">
                    <h3 className="text-sm sm:text-base font-bold text-ink">{step.title}</h3>
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-mute leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Features (Bento Grid) ═══ */}
      <section className="section bg-white" id="features">
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge badge-leaf mb-3">Core Capabilities</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">Built for tribal students</h2>
            <p className="mt-4 text-mute">
              Engineered specifically to solve high dropouts, documentation hurdles, and delayed disbursements.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-6">
            {features.map((feat) => (
              <SpotlightCard key={feat.title} className={`p-6 ${feat.span} flex flex-col justify-between`} >
                <div>
                  <div className="h-10 w-10 rounded-lg bg-navy/5 flex items-center justify-center mb-4">
                    <feat.icon size={22} className="text-navy" />
                  </div>
                  <h3 className="text-lg font-bold text-ink">{feat.title}</h3>
                  <p className="mt-2 text-sm text-mute leading-relaxed">{feat.desc}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Architecture ═══ */}
      <section className="section bg-bg" id="architecture">
        <div className="container-main">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <span className="badge badge-navy mb-3">System Architecture</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Not another portal.<br />A unified layer.</h2>
              <p className="mt-4 text-mute leading-relaxed">
                USP does not replace existing statutory systems. It sits elegantly above them — 
                interfacing with NSP, MoTA, DigiLocker, and DBT/PFMS via secure API adapters 
                and a canonical common data model.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Deterministic Eligibility Engine — Rule-based scheme evaluation with transparent criteria",
                  "Adapter Layer — Normalizes different portal APIs and status terms into a unified schema",
                  "Verification Pipeline — Multi-stage auditing across institute, district, and ministry levels",
                  "JAGO AI Assistant — Multilingual RAG grounded strictly in published scheme guidelines",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 size={18} className="text-leaf mt-0.5 shrink-0" />
                    <p className="text-sm text-ink-secondary">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {techStack.map((t) => (
                <SpotlightCard key={t.title} className="p-4 sm:p-5" >
                  <t.icon size={22} className="text-navy mb-2.5 sm:mb-3" />
                  <h4 className="text-sm font-bold text-ink">{t.title}</h4>
                  <p className="text-xs text-mute mt-1.5 leading-relaxed">{t.desc}</p>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Connected Systems (Marquee) ═══ */}
      <section className="section bg-white" id="schemes">
        <div className="container-main mb-6 sm:mb-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="badge badge-saffron mb-2 sm:mb-3">Seamless Integrations</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">Connected to existing systems</h2>
            <p className="mt-2.5 sm:mt-3 text-mute text-xs sm:text-base">
              Interoperable with National Scholarship Portal, Ministry of Tribal Affairs, DigiLocker, and PFMS.
            </p>
          </div>
        </div>
        <Marquee />
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden bg-navy text-white py-14 sm:py-20 px-4 sm:px-6">
        <div className="absolute inset-0 opacity-10">
          <Beams />
        </div>
        <div className="relative container-main text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Ready to experience the unified journey?
          </h2>
          <p className="mt-3 sm:mt-4 text-white/80 max-w-lg mx-auto text-xs sm:text-base leading-relaxed">
            Create your profile once, get matched automatically to eligible scholarships, and track your DBT payment step by step.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3">
            <Link href="/student" className="btn btn-saffron px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold shadow-md justify-center">
              Open Student Portal
              <ArrowRight size={18} />
            </Link>
            <Link href="#portals" className="btn px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base border border-white/30 text-white hover:bg-white/10 transition-colors justify-center">
              View Stakeholder Portals
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ Public Marketing Footer ═══ */}
      <footer className="border-t border-line bg-white pt-12 pb-12 sm:pt-16 sm:pb-16">
        <div className="container-main">
          <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {/* Brand column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-white text-sm font-bold shadow-xs">
                  USP
                </div>
                <div>
                  <p className="text-base font-bold text-ink">Unified Scholarship Platform</p>
                  <p className="text-xs text-mute">Ministry of Tribal Affairs & Integrated Portals</p>
                </div>
              </div>
              <p className="text-sm text-mute max-w-md leading-relaxed">
                Empowering tribal students across India with a single point of access, zero documentation redundancy, 
                and automated tracking from application to DBT bank transfer.
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                <span className="badge badge-navy">NSP Integrated</span>
                <span className="badge badge-saffron">MoTA Guidelines</span>
                <span className="badge badge-leaf">DigiLocker Verified</span>
                <span className="badge badge-info">DBT / PFMS Ready</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-4">Portals</h4>
              <ul className="space-y-2.5 text-sm text-mute">
                <li><Link href="/student" className="hover:text-navy transition-colors">Student Portal</Link></li>
                <li><Link href="/institute" className="hover:text-navy transition-colors">Institute Verification Portal</Link></li>
                <li><Link href="/district" className="hover:text-navy transition-colors">District Welfare Dashboard</Link></li>
                <li><Link href="/ministry" className="hover:text-navy transition-colors">Ministry National Dashboard</Link></li>
              </ul>
            </div>

            {/* Platform Info */}
            <div>
              <h4 className="text-xs font-bold text-ink uppercase tracking-wider mb-4">Information</h4>
              <ul className="space-y-2.5 text-sm text-mute">
                <li><a href="#how-it-works" className="hover:text-navy transition-colors">How It Works</a></li>
                <li><a href="#schemes" className="hover:text-navy transition-colors">Supported Schemes</a></li>
                <li><a href="#architecture" className="hover:text-navy transition-colors">Technical Architecture</a></li>
                <li><a href="#features" className="hover:text-navy transition-colors">Platform Capabilities</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-line flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-mute">
            <p>
              Unified Scholarship Platform · Prototype developed by <span className="font-semibold text-ink">Team Vecood</span> · Smart India Hackathon 2026
            </p>
            <p>
              An orchestration layer connecting existing government scholarship portals.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
