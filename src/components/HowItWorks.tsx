import { motion } from "framer-motion";
import { Search, PenTool, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Analyze",
    headline: "Deep-Dive Discovery",
    description: "We audit your business operations, identify bottlenecks, and map every process that's costing you time and money.",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Design",
    headline: "Custom System Architecture",
    description: "We design tailored AI automation systems specifically for your workflows — no templates, no generic solutions.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Deploy",
    headline: "Launch & Scale",
    description: "We build, test, and deploy your systems. Then we optimize until they're running at maximum efficiency.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative py-24 bg-secondary/20">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-neon-400 text-sm font-semibold uppercase tracking-wider mb-4 block">
            The Process
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
            HOW <span className="text-gradient">GROWCONIC</span> WORKS
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From analysis to deployment in weeks, not months.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-500/30 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="glass-card p-8 h-full">
                  {/* Step Number */}
                  <div className="step-number mb-6">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-neon-500/10 flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-neon-400" />
                  </div>

                  {/* Content */}
                  <span className="text-neon-400 text-sm font-semibold uppercase tracking-wider">
                    {step.title}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-foreground mt-2 mb-4">
                    {step.headline}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
