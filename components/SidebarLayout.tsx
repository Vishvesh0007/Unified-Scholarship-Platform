"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ChevronRight, ArrowLeftRight, Check, ChevronDown } from "lucide-react";

export interface SidebarLink {
  id: string;
  label: string;
  href?: string;
  icon: LucideIcon;
  badge?: string;
}

interface SidebarLayoutProps {
  title: string;
  subtitle: string;
  links: SidebarLink[];
  activeId?: string;
  onSelect?: (id: string) => void;
  children: ReactNode;
  headerRight?: ReactNode;
}

const portals = [
  { label: "Student Portal", href: "/student", role: "Applicant & Beneficiary" },
  { label: "Institute Portal", href: "/institute", role: "Verification & Exceptions" },
  { label: "District Dashboard", href: "/district", role: "District Analytics & Bottlenecks" },
  { label: "Ministry Dashboard", href: "/ministry", role: "National Oversight & Schemes" },
];

export default function SidebarLayout({
  title,
  subtitle,
  links,
  activeId,
  onSelect,
  children,
  headerRight,
}: SidebarLayoutProps) {
  const pathname = usePathname();
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [mobileSwitcherOpen, setMobileSwitcherOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);
  const mobileSwitcherRef = useRef<HTMLDivElement>(null);

  // Close switchers on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (switcherRef.current && !switcherRef.current.contains(e.target as Node)) {
        setSwitcherOpen(false);
      }
      if (mobileSwitcherRef.current && !mobileSwitcherRef.current.contains(e.target as Node)) {
        setMobileSwitcherOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-bg flex flex-col w-full min-w-0">
      <div className="flex-1 flex w-full min-w-0">
        {/* ═══ Desktop Sticky Sidebar ═══ */}
        <aside className="w-64 flex-shrink-0 bg-white border-r border-line hidden lg:flex flex-col sticky top-16 h-[calc(100vh-4rem)]">
          {/* Portal Header */}
          <div className="p-4 border-b border-line bg-bg-warm/30">
            <p className="text-[11px] font-bold text-navy uppercase tracking-wider">{title}</p>
            <p className="text-xs text-mute truncate mt-0.5" title={subtitle}>{subtitle}</p>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto" aria-label={`${title} navigation`}>
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = activeId !== undefined ? activeId === link.id : (link.href ? pathname === link.href : false);

              const content = (
                <>
                  <Icon size={18} className={isActive ? "text-navy" : "text-mute"} />
                  <span className="flex-1 truncate">{link.label}</span>
                  {link.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? "bg-navy text-white" : "bg-saffron/15 text-saffron-dark"
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </>
              );

              if (onSelect) {
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => onSelect(link.id)}
                    className={`sidebar-link w-full text-left cursor-pointer transition-all ${
                      isActive ? "active" : ""
                    }`}
                  >
                    {content}
                  </button>
                );
              }

              return (
                <Link
                  key={link.id}
                  href={link.href || "#"}
                  className={`sidebar-link transition-all ${isActive ? "active" : ""}`}
                >
                  {content}
                </Link>
              );
            })}
          </nav>

          {/* Portal Switcher in Sidebar Footer */}
          <div className="p-3 border-t border-line bg-bg-warm/40 relative" ref={switcherRef}>
            <button
              onClick={() => setSwitcherOpen(!switcherOpen)}
              className="w-full flex items-center justify-between gap-2 p-2 rounded-lg border border-line bg-white hover:bg-card-hover text-left transition-colors cursor-pointer text-xs"
              title="Switch to another stakeholder portal"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="h-6 w-6 rounded bg-navy/10 flex items-center justify-center text-navy font-bold text-xs flex-shrink-0">
                  <ArrowLeftRight size={12} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-ink truncate leading-tight">Switch Portal</p>
                  <p className="text-[10px] text-mute truncate leading-tight">4 Portals Available</p>
                </div>
              </div>
              <ChevronDown size={14} className={`text-mute transition-transform ${switcherOpen ? "rotate-180" : ""}`} />
            </button>

            {switcherOpen && (
              <div className="absolute bottom-full left-3 right-3 mb-2 bg-white border border-line rounded-xl shadow-xl p-1.5 z-50 animate-scale-in">
                <p className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-mute">All Portals</p>
                {portals.map((p) => {
                  const isCurrent = pathname.startsWith(p.href);
                  return (
                    <Link
                      key={p.href}
                      href={p.href}
                      onClick={() => setSwitcherOpen(false)}
                      className={`flex items-center justify-between p-2 rounded-lg text-xs transition-colors ${
                        isCurrent ? "bg-navy/10 text-navy font-semibold" : "hover:bg-bg-warm text-ink"
                      }`}
                    >
                      <div>
                        <p className="font-medium">{p.label}</p>
                        <p className="text-[10px] text-mute">{p.role}</p>
                      </div>
                      {isCurrent && <Check size={14} className="text-navy" />}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* ═══ Main Content Area ═══ */}
        <div className="flex-1 min-w-0 flex flex-col w-full">
          {/* Top Page Header */}
          <header className="border-b border-line bg-white px-3.5 sm:px-6 lg:px-8 py-3.5 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-navy bg-navy/5 px-2 py-0.5 rounded border border-navy/15">
                    {title}
                  </span>
                  <span className="text-xs text-mute truncate max-w-[220px] sm:max-w-none">{subtitle}</span>
                </div>
                <div className="flex items-center gap-2.5 mt-1 flex-wrap">
                  <h1 className="text-lg sm:text-2xl font-bold text-ink tracking-tight truncate">
                    {links.find(l => (activeId ? l.id === activeId : l.href === pathname))?.label || title}
                  </h1>

                  {/* Mobile Portal Switcher Toggle */}
                  <div className="lg:hidden relative" ref={mobileSwitcherRef}>
                    <button
                      onClick={() => setMobileSwitcherOpen(!mobileSwitcherOpen)}
                      className="flex items-center gap-1 text-[11px] font-semibold text-navy bg-navy/10 hover:bg-navy/15 px-2 py-1 rounded-md transition-colors cursor-pointer"
                      title="Switch to another stakeholder portal"
                    >
                      <ArrowLeftRight size={11} />
                      <span>Switch Portal</span>
                      <ChevronDown size={11} className={`transition-transform duration-200 ${mobileSwitcherOpen ? "rotate-180" : ""}`} />
                    </button>

                    {mobileSwitcherOpen && (
                      <div className="absolute left-0 top-full mt-2 w-72 bg-white border border-line rounded-xl shadow-xl p-1.5 z-50 animate-scale-in">
                        <p className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-mute">Select Stakeholder Portal</p>
                        {portals.map((p) => {
                          const isCurrent = pathname.startsWith(p.href);
                          return (
                            <Link
                              key={p.href}
                              href={p.href}
                              onClick={() => setMobileSwitcherOpen(false)}
                              className={`flex items-center justify-between p-2 rounded-lg text-xs transition-colors ${
                                isCurrent ? "bg-navy/10 text-navy font-semibold" : "hover:bg-bg-warm text-ink"
                              }`}
                            >
                              <div>
                                <p className="font-medium">{p.label}</p>
                                <p className="text-[10px] text-mute">{p.role}</p>
                              </div>
                              {isCurrent && <Check size={14} className="text-navy" />}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                {headerRight}
              </div>
            </div>
          </header>

          {/* ═══ Mobile Horizontal Navigation (Sticky on < lg screens) ═══ */}
          <div className="lg:hidden sticky top-16 z-40 border-b border-line bg-white/95 backdrop-blur-md px-3 py-2 overflow-x-auto flex gap-1.5 scrollbar-none shadow-2xs">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = activeId !== undefined ? activeId === link.id : (link.href ? pathname === link.href : false);

              if (onSelect) {
                return (
                  <button
                    key={link.id}
                    onClick={() => onSelect(link.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                      isActive ? "bg-navy text-white shadow-xs font-semibold" : "bg-bg-warm text-mute hover:text-ink"
                    }`}
                  >
                    <Icon size={14} />
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                        isActive ? "bg-white/20 text-white font-bold" : "bg-line text-ink"
                      }`}>
                        {link.badge}
                      </span>
                    )}
                  </button>
                );
              }

              return (
                <Link
                  key={link.id}
                  href={link.href || "#"}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
                    isActive ? "bg-navy text-white shadow-xs font-semibold" : "bg-bg-warm text-mute hover:text-ink"
                  }`}
                >
                  <Icon size={14} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Content Body */}
          <main className="flex-1 p-3.5 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 w-full min-w-0">
            {children}
          </main>

          {/* Dedicated Dashboard Footer */}
          <footer className="border-t border-line bg-white px-3.5 sm:px-6 lg:px-8 py-4 text-xs text-mute flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p>
              Unified Scholarship Platform · Prototype by <span className="font-semibold text-ink">Team Vecood</span> · SIH 2026
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
              <span className="hover:text-navy cursor-pointer">Security Protocol</span>
              <span>·</span>
              <span className="hover:text-navy cursor-pointer">API Integration</span>
              <span>·</span>
              <span className="badge badge-leaf text-[10px]">Connected to MoTA & NSP</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
