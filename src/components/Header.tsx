import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/resources" },
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
      {/* Top utility bar — light gray */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-end px-6 py-2 gap-4">
          <Link
            to="/contact"
            className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Contact
          </Link>
          <Link
            to="/get-a-quote"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded text-white transition-all hover:brightness-110"
            style={{ background: "hsl(0 84% 55%)" }}
          >
            Breached?
          </Link>
        </div>
      </div>

      {/* Main Navigation — white */}
      <header
        className="fixed top-[36px] left-0 right-0 z-50 transition-all duration-300 bg-white"
        style={{
          borderBottom: scrolled ? "1px solid hsl(var(--border))" : "1px solid hsl(var(--border) / 0.6)",
          boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.04)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center group">
            <div className="relative inline-flex flex-col items-start leading-none">
              <span className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-none">
                ArasKa
              </span>
              <span className="text-[10px] md:text-[11px] tracking-[0.4em] mt-1.5 uppercase">
                <span style={{ color: "hsl(200 90% 55%)" }}>Cyber</span>{" "}
                <span className="text-foreground">Core</span>
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => {
              const active = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-semibold tracking-[0.04em] relative pb-1 transition-all duration-200 ${
                    active ? "text-primary" : "text-foreground/80 hover:text-primary"
                  }`}
                  style={{
                    borderBottom: active
                      ? "2px solid hsl(var(--primary))"
                      : "2px solid transparent",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            className="lg:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="lg:hidden bg-white px-6 py-6 flex flex-col gap-4 border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-semibold transition-colors ${
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
