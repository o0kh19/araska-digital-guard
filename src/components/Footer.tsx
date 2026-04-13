import logo from "@/assets/araska-logo.png";
import { Mail } from "lucide-react";

const Footer = () => (
  <footer id="contact" className="section-padding border-t border-border">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        <div className="text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
            <img src={logo} alt="Araska Cyber Core" className="h-10 w-10" loading="lazy" width={512} height={512} />
            <span className="font-display text-sm font-bold tracking-wider neon-text">ARASKA</span>
          </div>
          <p className="text-muted-foreground text-xs tracking-widest uppercase">
            Defend. Detect. Secure.
          </p>
        </div>

        <div className="text-center md:text-right space-y-3">
          <a
            href="mailto:info@araskacybercore.com"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors justify-center md:justify-end"
          >
            <Mail size={14} />
            info@araskacybercore.com
          </a>
          <p className="text-xs text-muted-foreground">
            UK-Registered Company · Companies House
          </p>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Araska Cyber Core. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
