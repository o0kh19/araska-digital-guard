import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Free Health Check", href: "/cyber-health-check" },
  { label: "Contact", href: "/contact" },
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
      {/* Trellix-style bright blue top strip */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-2" style={{ background: 'hsl(var(--primary))' }} />

      {/* Utility Bar */}
      <div className="fixed top-2 left-0 right-0 z-[60] bg-white border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-end px-6 py-2 gap-6">
          <Link to="/contact" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Support
          </Link>
          <Link to="/contact" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
          <Link to="/get-a-quote" className="text-xs text-primary font-medium hover:text-primary-light transition-colors">
            Breached?
          </Link>
        </div>
      </div>

      {/* Main Nav */}
      <header
        className="fixed top-[44px] left-0 right-0 z-50 transition-all duration-300 bg-white"
        style={{
          borderBottom: scrolled ? '1px solid hsl(var(--border))' : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.04)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center group">
            <div className="relative inline-flex flex-col leading-none">
              {/* Wordmark */}
              <span className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-none">
                ArasKa
              </span>
              {/* Tagline */}
              <span className="text-[10px] md:text-[11px] tracking-[0.4em] text-muted-foreground mt-1.5 uppercase">
                Cyber Core
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium tracking-[0.04em] relative pb-1 transition-all duration-200 ${
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
                style={{
                  borderBottom: location.pathname === link.href ? '2px solid hsl(var(--primary))' : '2px solid transparent',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/get-a-quote" className="gold-btn text-xs py-2.5 px-6">
              Get a Quote
            </Link>
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
                className={`text-sm transition-colors font-medium ${
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/get-a-quote" className="gold-btn text-xs py-2.5 px-6 text-center">
              Get a Quote
            </Link>
          </nav>
        )}
      </header>
    </>
  );
};

export default Header;
