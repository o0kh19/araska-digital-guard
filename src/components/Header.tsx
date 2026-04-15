import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/araska-logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
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
      <div className="fixed top-0 left-0 right-0 z-[60] bg-[hsl(222_47%_4%)] border-b border-border/30">
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
        className={`fixed top-[36px] left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-background/90 backdrop-blur-lg border-primary/10"
            : "bg-background/80 backdrop-blur-sm border-border/20"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Araska Cyber Core" className="h-10 w-10" />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-display text-sm font-extrabold tracking-[0.06em] text-foreground">
                ARASKA
              </span>
              <span className="font-display text-[10px] font-extrabold tracking-[0.06em]">
                <span className="text-primary">CYBER</span>{" "}
                <span className="text-foreground">CORE</span>
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm transition-all duration-200 tracking-wide font-medium relative ${
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {link.label}
                {location.pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
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
          <nav className="lg:hidden bg-background border-t border-border/30 px-6 py-6 flex flex-col gap-4">
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
