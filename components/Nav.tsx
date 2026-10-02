"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Schemes", href: "/#schemes" },
  {
    label: "Portals",
    href: "#",
    children: [
      { label: "Student Portal", href: "/student", desc: "Discover schemes, document wallet & DBT status" },
      { label: "Institute Portal", href: "/institute", desc: "Verify applications, exceptions & queue" },
      { label: "District Dashboard", href: "/district", desc: "Bottlenecks, coverage tracking & analytics" },
      { label: "Ministry Dashboard", href: "/ministry", desc: "National schemes, state approvals & metrics" },
    ],
  },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const isPortalPage = pathname !== "/";
  const portalPaths = ["/student", "/institute", "/district", "/ministry"];
  const isCurrentPortal = portalPaths.some(p => pathname.startsWith(p));

  return (
    <>
      {/* National Emblem & Team identifier bar */}
      <div className="emblem-bar">
        <div className="container-main flex items-center justify-between text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="text-sm shrink-0">🏛️</span>
            <span className="font-medium truncate">
              <span className="hidden sm:inline">Unified Scholarship Platform for Tribal Students</span>
              <span className="sm:hidden">Unified Scholarship Platform</span>
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2">
            <span className="text-white/80 hidden md:inline">Prototype by <strong className="text-saffron-light font-semibold">Team Vecood</strong></span>
            <span className="bg-white/10 text-white/90 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">SIH 2026</span>
          </div>
        </div>
      </div>

      <nav
        aria-label="Main navigation"
        className={`sticky top-0 z-50 transition-all duration-200 ${
          isPortalPage || scrolled
            ? "border-b border-line bg-white/95 backdrop-blur-md shadow-xs"
            : "bg-white/80 backdrop-blur-sm border-b border-line/40"
        }`}
      >
        <div className="container-main flex h-16 items-center justify-between gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-navy text-white text-xs sm:text-sm font-bold shadow-xs group-hover:bg-navy-light transition-colors">
              USP
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-bold text-ink leading-tight tracking-tight truncate">Unified Scholarship Platform</p>
              <p className="text-[10px] sm:text-[11px] text-mute leading-tight truncate hidden sm:block">Ministry of Tribal Affairs & Connected Portals</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setDropdownOpen(prev => !prev)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                      isCurrentPortal
                        ? "text-navy bg-navy/10 font-semibold"
                        : "text-ink-secondary hover:text-navy hover:bg-card-hover"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180 text-navy" : "text-mute"}`}
                    />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-80 rounded-xl border border-line bg-white shadow-xl animate-scale-in p-2 z-50">
                      <div className="px-3 py-1.5 mb-1 border-b border-line-subtle">
                        <p className="text-[10px] uppercase font-bold tracking-wider text-mute">Select Stakeholder Portal</p>
                      </div>
                      {link.children.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`flex flex-col rounded-lg px-3.5 py-2.5 transition-colors ${
                              isChildActive
                                ? "bg-navy/10 text-navy"
                                : "hover:bg-bg-warm text-ink"
                            }`}
                            onClick={() => setDropdownOpen(false)}
                          >
                            <span className="text-sm font-semibold flex items-center justify-between">
                              {child.label}
                              {isChildActive && <span className="text-[10px] font-bold text-navy bg-white px-1.5 py-0.5 rounded shadow-2xs">Active</span>}
                            </span>
                            <span className="text-xs text-mute mt-0.5">{child.desc}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                    pathname === link.href
                      ? "text-navy bg-navy/10 font-semibold"
                      : "text-ink-secondary hover:text-navy hover:bg-card-hover"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA & Status */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Quick portal login button */}
            {!isPortalPage ? (
              <Link
                href="/student"
                className="hidden sm:inline-flex btn btn-primary text-xs sm:text-sm px-3.5 sm:px-4 py-2 shadow-xs"
              >
                Student Portal
              </Link>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-mute bg-bg-warm border border-line px-2.5 sm:px-3 py-1.5 rounded-lg">
                <span className="status-dot active"></span>
                <span>Live Mode</span>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-line hover:bg-card-hover transition-colors shrink-0"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-line bg-white shadow-xl animate-fade-in max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="container-main py-4 space-y-3">
              <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-mute">Navigation</p>
              <div className="grid grid-cols-3 gap-1 px-1">
                <Link
                  href="/"
                  className="px-3 py-2 text-center text-xs font-semibold rounded-lg bg-bg-warm hover:bg-line transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/#how-it-works"
                  className="px-3 py-2 text-center text-xs font-semibold rounded-lg bg-bg-warm hover:bg-line transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  href="/#schemes"
                  className="px-3 py-2 text-center text-xs font-semibold rounded-lg bg-bg-warm hover:bg-line transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Schemes
                </Link>
              </div>

              <div className="pt-2 border-t border-line space-y-1.5">
                <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-mute">Access Stakeholder Portals</p>
                <div className="grid gap-1.5 sm:grid-cols-2">
                  <Link
                    href="/student"
                    className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                      pathname.startsWith("/student")
                        ? "bg-navy/10 border-navy/30 text-navy font-semibold"
                        : "bg-white border-line hover:bg-bg-warm text-ink"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">🎓</span>
                      <div>
                        <p className="text-xs font-bold leading-tight">Student Portal</p>
                        <p className="text-[10px] text-mute leading-tight">Applicant & Wallet</p>
                      </div>
                    </div>
                    <span className="text-xs text-navy font-semibold">Launch →</span>
                  </Link>

                  <Link
                    href="/institute"
                    className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                      pathname.startsWith("/institute")
                        ? "bg-navy/10 border-navy/30 text-navy font-semibold"
                        : "bg-white border-line hover:bg-bg-warm text-ink"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">🏫</span>
                      <div>
                        <p className="text-xs font-bold leading-tight">Institute Portal</p>
                        <p className="text-[10px] text-mute leading-tight">Verification & Exceptions</p>
                      </div>
                    </div>
                    <span className="text-xs text-navy font-semibold">Launch →</span>
                  </Link>

                  <Link
                    href="/district"
                    className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                      pathname.startsWith("/district")
                        ? "bg-navy/10 border-navy/30 text-navy font-semibold"
                        : "bg-white border-line hover:bg-bg-warm text-ink"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">🛡️</span>
                      <div>
                        <p className="text-xs font-bold leading-tight">District Dashboard</p>
                        <p className="text-[10px] text-mute leading-tight">Analytics & Bottlenecks</p>
                      </div>
                    </div>
                    <span className="text-xs text-navy font-semibold">Launch →</span>
                  </Link>

                  <Link
                    href="/ministry"
                    className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${
                      pathname.startsWith("/ministry")
                        ? "bg-navy/10 border-navy/30 text-navy font-semibold"
                        : "bg-white border-line hover:bg-bg-warm text-ink"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">🏛️</span>
                      <div>
                        <p className="text-xs font-bold leading-tight">Ministry Dashboard</p>
                        <p className="text-[10px] text-mute leading-tight">National Oversight</p>
                      </div>
                    </div>
                    <span className="text-xs text-navy font-semibold">Launch →</span>
                  </Link>
                </div>
              </div>

              <div className="pt-3 border-t border-line flex items-center justify-between text-xs text-mute px-1">
                <span>Team Vecood · SIH 2026</span>
                <span className="badge badge-navy text-[10px]">v1.0 Live</span>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
