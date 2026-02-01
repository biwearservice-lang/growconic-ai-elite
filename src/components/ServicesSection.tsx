import { motion } from "framer-motion";
import { Workflow, TrendingUp, Database, MessageSquare, Settings, Plug } from "lucide-react";

const services = [
  {
    icon: Workflow,
    title: "AI Workflow Automation",
    description: "End-to-end process automation that eliminates manual bottlenecks and scales with your growth.",
    features: ["Process mapping", "Custom workflows", "Auto-scaling"],
  },
  {
    icon: TrendingUp,
    title: "Sales & Lead Automation",
    description: "Never miss a lead again. AI-powered outreach, follow-ups, and pipeline management.",
    features: ["Lead scoring", "Auto follow-ups", "Pipeline sync"],
  },
  {
    icon: Database,
    title: "CRM & Database Automation",
    description: "Keep your data clean, synced, and actionable across all platforms automatically.",
    features: ["Data sync", "Auto-enrichment", "Smart deduplication"],
  },
  {
    icon: MessageSquare,
    title: "AI Chatbots & Assistants",
    description: "24/7 intelligent support that handles complex queries and escalates when needed.",
    features: ["Natural language", "Multi-channel", "Smart routing"],
  },
  {
    icon: Settings,
    title: "Internal Process Automation",
    description: "Streamline operations, reporting, and team workflows with custom AI solutions.",
    features: ["Custom reports", "Team workflows", "Auto-scheduling"],
  },
  {
    icon: Plug,
    title: "API & Integration Hub",
    description: "Connect any tool in your stack with custom integrations via n8n, Zapier, or Make.",
    features: ["Any platform", "Custom APIs", "Real-time sync"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <motion.div
        className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl"
        animate={{ x: [-100, 100, -100] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider mb-4 block">
            What We Build
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
            AI SYSTEMS FOR{" "}
            <span className="text-gradient">EVERY BOTTLENECK</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Production-ready automation built specifically for your business operations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="service-card group"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-primary/10 flex items-center justify-center mb-6 group-hover:from-cyan-500/30 group-hover:to-primary/20 transition-all duration-300">
                <service.icon className="w-7 h-7 text-cyan-400" />
              </div>

              {/* Content */}
              <h3 className="font-display font-bold text-xl text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
