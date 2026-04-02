import { motion } from "framer-motion";
import { AlertTriangle, Clock, DollarSign, Users, FileText, Headphones } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Manual Operations",
    description: "Repetitive tasks eating hours daily",
  },
  {
    icon: Headphones,
    title: "Support Overload",
    description: "Tickets piling up, customers waiting",
  },
  {
    icon: DollarSign,
    title: "Sales Inefficiency",
    description: "Leads falling through the cracks",
  },
  {
    icon: Users,
    title: "Lead Handling",
    description: "Slow response times killing conversions",
  },
  {
    icon: FileText,
    title: "Admin Tasks",
    description: "Data entry stealing strategic time",
  },
  {
    icon: AlertTriangle,
    title: "Process Gaps",
    description: "Errors from manual workflows",
  },
];

const ProblemSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold-400 text-sm font-semibold uppercase tracking-wider mb-4 block">
            The Reality
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
            AI AUTOMATES WHAT'S{" "}
            <span className="text-gradient">KILLING YOUR PROFIT MARGINS</span>
            <br />
            — RIGHT NOW.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every hour spent on manual work is revenue you're leaving on the table.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 group hover:border-destructive/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center mb-4 group-hover:bg-destructive/30 transition-colors">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {problem.title}
              </h3>
              <p className="text-muted-foreground text-sm">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-muted-foreground">
            Sound familiar?{" "}
            <span className="text-gold-400 font-medium">Let's fix it.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
