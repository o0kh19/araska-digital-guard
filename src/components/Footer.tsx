import { Link } from "react-router-dom";
import logo from "@/assets/araska-logo.png";
import { Mail, MapPin } from "lucide-react";

const serviceLinks = [
  { label: "SOC as a Service", href: "/services#soc-as-a-service" },
  { label: "Threat Intelligence", href: "/services#threat-intelligence" },
  { label: "Cyber Risk Assessment", href: "/services#cyber-risk-assessment" },
  { label: "Incident Response Retainer", href: "/services#incident-response-retainer" },
  { label: "Security Awareness Training", href: "/services#security-awareness-training" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
  { label: "Get a Quote", href: "/get-a-quote" },
];

const Footer = () => (
  <footer className="section-dark border-t border-border/20">
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Araska Cyber Core" className="h-9 w-9" loading="lazy" width={512} height={512} />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-xs font-extrabold tracking-[0.06em] text-foreground">ARASKA</span>
              <span className="font-display text-[9px] font-extrabold tracking-[0.06em]">
                <span className="text-primary">CYBER</span> <span className="text-foreground">CORE</span>
              </span>
            </div>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Your Threat Is Real. So Is Our Response.
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 className="eyebrow mb-4 text-primary">Services</h4>
          <ul className="space-y-2.5">
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="eyebrow mb-4 text-primary">Company</h4>
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
          <h4 className="eyebrow mb-4 text-primary">Contact</h4>
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
      <div className="mt-16 pt-6 border-t border-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Araska Cyber Core. All rights reserved.
        </p>
        <div className="flex gap-6">
          <span className="text-xs text-muted-foreground hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
          <span className="text-xs text-muted-foreground hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
