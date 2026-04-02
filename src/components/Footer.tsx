import { Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 border-t border-border bg-card/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-500 to-neon-600 flex items-center justify-center">
                <span className="text-background font-display font-bold text-xl">G</span>
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Growconic
              </span>
            </div>
            <p className="text-muted-foreground max-w-sm mb-6">
              Building production-ready AI automation systems that run your business 24/7. Not demos. Real revenue.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-neon-500/20 hover:border-neon-500/30 border border-transparent transition-all"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-neon-400" />
              </a>
              <a
                href="mailto:hello@growconic.com"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-neon-500/20 hover:border-neon-500/30 border border-transparent transition-all"
              >
                <Mail className="w-5 h-5 text-muted-foreground hover:text-neon-400" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {[
                "AI Workflow Automation",
                "Sales Automation",
                "CRM Integration",
                "AI Chatbots",
                "Process Automation",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {[
                { name: "How It Works", href: "#how-it-works" },
                { name: "Why Growconic", href: "#why-us" },
                { name: "Results", href: "#testimonials" },
                { name: "Contact", href: "#contact" },
                { name: "Privacy Policy", href: "#" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Growconic. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Built for businesses doing $10k+/month who want to scale.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
