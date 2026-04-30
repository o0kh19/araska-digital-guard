import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";

const serviceLinks = [
  { label: "SOC as a Service", href: "/services#soc-as-a-service" },
  { label: "Vulnerability Management\n\n", href: "/services#threat-intelligence" },
  { label: "vCISO Advisory", href: "/services#cyber-risk-assessment" },
  { label: "M365 Security Hardening", href: "/services#incident-response-retainer" },
  { label: "Security Policy Development", href: "/services#security-awareness-training" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
  { label: "Get a Quote", href: "/get-a-quote" },
];

const Footer = () => (
  <footer className="section-dark" style={{ borderTop: '1px solid rgba(31,143,203,0.12)' }}>
    <div className="max-w-7xl mx-auto px-6 py-14">
      <div className="grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-stretch gap-3 mb-4">
            {/* Vertical blue bar */}
            <div className="w-[2.5px] self-stretch rounded-sm bg-primary" />
            <div className="relative inline-flex flex-col items-start leading-none">
              <span
                className="font-bold italic tracking-tight text-foreground leading-none"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <span className="text-2xl md:text-2xl">A</span><span className="text-base md:text-lg">ras</span><span className="text-2xl md:text-2xl">K</span><span className="text-base md:text-lg">a</span>
              </span>
              <span className="text-[9px] font-extrabold tracking-[0.2em] mt-1 uppercase">
                <span className="text-primary font-bold">CYBER</span>{" "}
                <span className="text-secondary-foreground font-bold">CORE</span>
              </span>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-secondary-foreground text-left">
            Identify Security Gaps
            Before Attackers Do
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xs font-medium uppercase tracking-[0.18em] text-primary mb-4">Services</h4>
          <ul className="space-y-2.5">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-bold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-xs font-medium uppercase tracking-[0.18em] text-primary mb-4">Company</h4>
          <ul className="space-y-2.5">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-medium uppercase tracking-[0.18em] text-primary mb-4">Contact</h4>
          <div className="space-y-3">
            <a
              href="mailto:info@araskacybercore.com"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail size={14} />
              info@araskacybercore.com
            </a>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={14} />
              United Kingdom
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-16 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <p className="text-xs" style={{ color: '#5A6A80' }}>
          © {new Date().getFullYear()} Araska Cyber Core. All rights reserved.
        </p>
        <div className="flex gap-6">
          <span className="text-xs cursor-pointer transition-colors hover:text-primary-light" style={{ color: '#5A6A80' }}>Privacy Policy</span>
          <span className="text-xs cursor-pointer transition-colors hover:text-primary-light" style={{ color: '#5A6A80' }}>Terms of Service</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
