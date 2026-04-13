import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/araska-logo.png";

const navLinks = [
  { label: "Mission", href: "#mission" },
  { label: "Services", href: "#services" },
  { label: "SLA", href: "#sla" },
  { label: "Tech Stack", href: "#tech" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-3">
          <img src={logo} alt="Araska Cyber Core" className="h-10 w-10" />
          <span className="font-display text-sm font-bold tracking-wider neon-text hidden sm:inline">
            ARASKA
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <a href="mailto:info@araskacybercore.com" className="neon-btn text-xs py-2 px-5">
            Contact Us
          </a>
        </nav>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden glass-card border-t border-border px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="mailto:info@araskacybercore.com" className="neon-btn text-xs py-2 px-5 text-center">
            Contact Us
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
