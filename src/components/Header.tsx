import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, AlertTriangle } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/resources" },
  { label: "Team", href: "/team" },
  { label: "About", href: "/about" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      {/* Top utility bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-slate-100/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-end px-6 py-2 gap-3">
          <Link
            to="/contact"
            className="text-[11px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full bg-primary text-primary-foreground hover:brightness-110 transition-all"
          >
            Contact
          </Link>
          <Link
            to="/get-a-quote"
            className="group relative inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full text-white transition-all hover:brightness-110"
            style={{ background: "hsl(0 84% 55%)" }}
          >
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-40"
              style={{ background: "hsl(0 84% 55%)" }}
              aria-hidden
            />
            <AlertTriangle size={12} className="relative" />
            <span className="relative">Breached?</span>
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`fixed top-[36px] left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-b border-slate-200/70"
            : "bg-white border-b border-border/60"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between px-6 transition-all duration-300 ${
            scrolled ? "py-3" : "py-4"
          }`}
        >
          <Link to="/" className="flex items-center group">
            <div className="flex items-stretch gap-3">
              <div className="w-[3px] self-stretch rounded-sm" style={{ background: "hsl(215 75% 45%)" }} />
              <div className="relative inline-flex flex-col items-start leading-none">
                <span
                  className="font-bold italic tracking-tight text-foreground leading-none"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <span className="text-4xl md:text-4xl">A</span>
                  <span className="text-2xl md:text-3xl">ras</span>
                  <span className="text-4xl md:text-4xl">K</span>
                  <span className="text-2xl md:text-3xl">a</span>
                </span>
                <span className="text-[10px] md:text-[11px] tracking-[0.4em] mt-1.5 uppercase">
                  <span className="text-primary font-bold">Cyber</span>{" "}
                  <span className="text-secondary-foreground font-bold">Core</span>
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop nav — pill style */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-50/60 rounded-full p-1 border border-slate-200/70">
            {navLinks.map((link) => {
              const active = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative text-[12px] font-semibold uppercase tracking-[0.12em] px-4 py-2 rounded-full transition-all duration-200 ${
                    active
                      ? "bg-primary text-primary-foreground shadow-[0_4px_14px_hsl(var(--primary)/0.35)]"
                      : "text-foreground/80 hover:text-primary hover:bg-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            className="lg:hidden text-foreground p-2 rounded-md hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="lg:hidden bg-white/95 backdrop-blur-md px-6 py-6 flex flex-col gap-2 border-t border-border animate-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => {
              const active = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-semibold uppercase tracking-[0.12em] px-4 py-3 rounded-xl transition-all ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/80 hover:bg-slate-100 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-4 pt-4 border-t border-slate-200 flex gap-3">
              <Link
                to="/contact"
                className="flex-1 text-center text-xs font-bold uppercase tracking-[0.12em] px-4 py-3 rounded-full bg-primary text-primary-foreground"
              >
                Contact
              </Link>
              <Link
                to="/get-a-quote"
                className="flex-1 text-center text-xs font-bold uppercase tracking-[0.12em] px-4 py-3 rounded-full text-white"
                style={{ background: "hsl(0 84% 55%)" }}
              >
                Breached?
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
