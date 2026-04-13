import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/araska-logo.png";

const navLinks = [
  { label: "Vigilance", href: "#mission" },
  { label: "Our Stack", href: "#tech" },
  { label: "SLA", href: "#sla" },
  { label: "Legal", href: "#contact" },
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
        <a href="#" className="flex items-center gap-3 relative">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl scale-150" />
            <img src={logo} alt="Araska Cyber Core" className="h-16 w-16 relative z-10" />
          </div>
          <span className="font-display text-lg font-bold tracking-wider neon-text hidden sm:inline">
            ARASKA
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-foreground/80 hover:text-primary transition-colors duration-200 tracking-wide font-medium"
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
              className="text-sm text-foreground/80 hover:text-primary transition-colors font-medium"
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
