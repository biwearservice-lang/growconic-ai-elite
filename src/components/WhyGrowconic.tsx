import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const reasons = [
  {
    title: "Custom-Built Systems",
    description: "Every system is designed from scratch for your specific business needs — no cookie-cutter templates.",
    highlight: true,
  },
  {
    title: "Production-Ready AI",
    description: "We don't build demos. We build systems that handle real traffic, real customers, and real revenue.",
    highlight: true,
  },
  {
    title: "Enterprise Security",
    description: "Bank-level security protocols, encrypted data handling, and compliance-ready infrastructure.",
    highlight: false,
  },
  {
    title: "Scalable Architecture",
    description: "Built to grow with you. Handle 10x the volume without rebuilding from scratch.",
    highlight: false,
  },
  {
    title: "Revenue-Focused",
    description: "We measure success in dollars saved and earned, not vanity metrics.",
    highlight: true,
  },
  {
    title: "Long-Term Partnership",
    description: "Ongoing optimization and support. We're invested in your success, not quick wins.",
    highlight: false,
  },
];

const comparisons = [
  { us: "Custom architecture", them: "Generic templates" },
  { us: "Production systems", them: "Demo bots" },
  { us: "Revenue outcomes", them: "Feature lists" },
  { us: "24/7 reliability", them: "Scheduled tasks" },
];

const WhyGrowconic = () => {
  return (
    <section id="why-us" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <motion.div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-gold-500/5 blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold-400 text-sm font-semibold uppercase tracking-wider mb-4 block">
            Why Choose Us
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
            NOT ANOTHER{" "}
            <span className="text-gradient">AI AGENCY</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We build what others promise.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`glass-card p-6 ${reason.highlight ? 'glow-border' : ''}`}
            >
              <div className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center mb-4">
                <Check className="w-5 h-5 text-gold-400" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {reason.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card p-8">
            <h3 className="font-display font-bold text-2xl text-foreground mb-8 text-center">
              Growconic vs. The Rest
            </h3>
            <div className="space-y-4">
              {comparisons.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-gold-500/10 border border-gold-500/20">
                    <Check className="w-5 h-5 text-gold-400 flex-shrink-0" />
                    <span className="text-foreground font-medium">{item.us}</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                    <X className="w-5 h-5 text-destructive flex-shrink-0" />
                    <span className="text-muted-foreground">{item.them}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyGrowconic;
