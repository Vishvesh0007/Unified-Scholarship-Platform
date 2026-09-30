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
          <div className="flex items-center gap-2">
            <span className="text-sm">🏛️</span>
            <span className="font-medium">Unified Scholarship Platform for Tribal Students</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-white/80 hidden sm:inline">Prototype by <strong className="text-saffron-light font-semibold">Team Vecood</strong></span>
            <span className="bg-white/10 text-white/90 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider">SIH 2026</span>
          </div>
        </div>
      </div>

      <nav
        aria-label="Main navigation"
        className={`sticky top-0 z-50 transition-all duration-200 ${
          isPortalPage || scrolled
            ? "border-b border-line bg-white/95 backdrop-blur-md shadow-xs"
            : "bg-white/70 backdrop-blur-sm border-b border-line/40"
        }`}
      >
        <div className="container-main flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy text-white text-sm font-bold shadow-xs group-hover:bg-navy-light transition-colors">
              USP
            </div>
            <div>
              <p className="text-sm font-bold text-ink leading-tight tracking-tight">Unified Scholarship Platform</p>
              <p className="text-[11px] text-mute leading-tight">Ministry of Tribal Affairs & Connected Portals</p>
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
          <div className="flex items-center gap-2.5">
            {/* Quick portal login button */}
            {!isPortalPage ? (
              <Link
                href="/student"
                className="btn btn-primary text-sm px-4 py-2"
              >
                Student Portal
              </Link>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-mute bg-bg-warm border border-line px-3 py-1.5 rounded-lg">
                <span className="status-dot active"></span>
                <span>Live Mode</span>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-line hover:bg-card-hover transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-line bg-white shadow-lg animate-fade-in">
            <div className="container-main py-4 space-y-2">
              <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-mute">Navigation</p>
              <Link
                href="/"
                className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-bg-warm"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/#how-it-works"
                className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-bg-warm"
                onClick={() => setMobileOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="/#schemes"
                className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-bg-warm"
                onClick={() => setMobileOpen(false)}
              >
                Supported Schemes
              </Link>

              <div className="pt-2 border-t border-line space-y-1">
                <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-mute">Access Portals</p>
                <Link
                  href="/student"
                  className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-bg-warm text-navy font-semibold"
                  onClick={() => setMobileOpen(false)}
                >
                  🎓 Student Portal
                </Link>
                <Link
                  href="/institute"
                  className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-bg-warm"
                  onClick={() => setMobileOpen(false)}
                >
                  🏫 Institute Portal
                </Link>
                <Link
                  href="/district"
                  className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-bg-warm"
                  onClick={() => setMobileOpen(false)}
                >
                  🛡️ District Dashboard
                </Link>
                <Link
                  href="/ministry"
                  className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-bg-warm"
                  onClick={() => setMobileOpen(false)}
                >
                  🏛️ Ministry Dashboard
                </Link>
              </div>

              <div className="pt-3 border-t border-line flex items-center justify-between text-xs text-mute px-3">
                <span>Team Vecood · SIH 2026</span>
                <span className="badge badge-navy">v1.0 Live</span>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
