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
      {/* Utility Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-[#2A2F3A] border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
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
        className="fixed top-[36px] left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(58,63,74,0.92)' : 'rgba(58,63,74,0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(31,143,203,0.15)',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center group">
            <div className="relative inline-flex flex-col leading-none">
              {/* Line spanning from A to K, with dot at the end */}
              <div className="flex items-center gap-1 mb-1">
                <span className="block h-[2px] w-[60%] bg-primary rounded-full" />
                <span className="block w-[3px] h-[3px] rounded-full bg-primary" />
              </div>
              {/* Brand name */}
              <span className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-primary">
                ArasKa
              </span>
              {/* Tagline */}
              <span className="text-[10px] md:text-[11px] tracking-[0.35em] text-muted-foreground mt-1 uppercase">
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
                    ? "text-primary-light"
                    : "text-[#D0D8E4] hover:text-primary-light"
                }`}
                style={{
                  borderBottom: location.pathname === link.href ? '2px solid hsl(40 86% 41%)' : '2px solid transparent',
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
          <nav className="lg:hidden bg-background px-6 py-6 flex flex-col gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm transition-colors font-medium ${
                  location.pathname === link.href
                    ? "text-primary-light"
                    : "text-[#D0D8E4] hover:text-primary-light"
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
