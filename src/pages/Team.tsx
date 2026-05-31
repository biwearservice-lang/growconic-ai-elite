import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Linkedin, Calendar } from "lucide-react";
import imranPhoto from "@/assets/imran-biswas.jpeg";

const Team = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-gold-500/10 blur-[120px]" />
        <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      {/* Nav */}
      <header className="relative z-10 container mx-auto px-6 py-8 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} /> Back to Growconic
        </Link>
        <a
          href="https://calendly.com/imranbis369/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-glow text-sm"
        >
          Book AI Audit
        </a>
      </header>

      <main className="relative z-10 container mx-auto px-6 pt-12 pb-32">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/5 text-gold-400 text-xs uppercase tracking-[0.25em] mb-6">
            The Team
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            Built by operators,{" "}
            <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 bg-clip-text text-transparent">
              not theorists.
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            A lean unit obsessed with one outcome: deploying AI systems that print measurable ROI for ambitious operators.
          </p>
        </motion.div>

        {/* Founder card */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >
          <div className="relative rounded-3xl border border-border bg-gradient-to-br from-card/80 to-background/40 backdrop-blur-xl p-6 md:p-12 shadow-2xl overflow-hidden">
            {/* Gold accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />

            <div className="grid md:grid-cols-5 gap-10 items-center">
              {/* Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1 }}
                className="md:col-span-2 relative"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden border border-gold-500/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
                  <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/20 via-transparent to-primary/10 z-10 mix-blend-overlay" />
                  <img
                    src={imranPhoto}
                    alt="Imran Biswas — Founder & CEO of Growconic AI"
                    className="w-full h-full object-cover grayscale-[15%]"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-full bg-background border border-gold-500/40 text-gold-400 text-xs font-semibold tracking-wider uppercase shadow-xl">
                  Founder
                </div>
              </motion.div>

              {/* Bio */}
              <div className="md:col-span-3 space-y-6">
                <div>
                  <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
                    Imran Biswas
                  </h2>
                  <p className="mt-2 text-gold-400 font-medium text-lg">
                    Founder &amp; CEO
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar size={14} className="text-gold-400" />
                  <span>Founded Growconic AI · July 2025</span>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Imran founded Growconic AI in <span className="text-foreground font-semibold">July 2025</span> with one
                  mission: arm $10k+/mo operators with the same AI infrastructure that powers the most ruthless companies
                  in the world — without the bloated agency price tag.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  He leads every engagement personally, architecting custom automations across n8n, Make, and bespoke
                  integrations. No fluff. No fragile prompts. Just systems that compound.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  {[
                    { value: "2025", label: "Founded" },
                    { value: "100%", label: "Hands-On" },
                    { value: "$10k+", label: "Client Floor" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-border bg-background/40 p-4 text-center"
                    >
                      <div className="font-display text-2xl font-bold text-gold-400">
                        {stat.value}
                      </div>
                      <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href="https://calendly.com/imranbis369/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glow text-sm"
                  >
                    Book a call with Imran
                  </a>
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:border-gold-500/40 text-sm font-medium transition-colors"
                  >
                    <Linkedin size={16} /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Team;
