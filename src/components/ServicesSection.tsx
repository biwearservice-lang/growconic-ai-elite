import { motion } from "framer-motion";
import { MessageSquare, Phone, Bot, Target } from "lucide-react";

const services = [
  {
    icon: MessageSquare,
    title: "AI Chatbots",
    description: "Your always-on AI sales rep that never sleeps. Built to handle customer support, qualify leads, book appointments, and capture buyer intent the moment visitors land on your site. Every interaction is instant, contextual, and conversion-focused. No delays. No lost leads. No missed opportunities. Just seamless conversations that turn traffic into revenue.",
    features: ["24/7 Support", "Lead Qualification", "Appointment Booking"],
  },
  {
    icon: Phone,
    title: "AI Phone Callers",
    description: "Inbound. Outbound. Zero missed calls. Intelligent AI voice systems that handle customer support, cold calling, appointment booking, and call center operations automatically. Every prospect is answered in seconds, every opportunity captured — without adding headcount.",
    features: ["Inbound Calls", "Outbound Calls", "Call Center Automation"],
  },
  {
    icon: Bot,
    title: "Custom AI Agents",
    description: "Have a workflow everyone says is \"too complex\" to automate? That's exactly what we build. We analyze your processes, identify bottlenecks, and design custom AI agents tailored to your business. If it can be automated, we make it happen.",
    features: ["Process Analysis", "Custom Solutions", "Full Automation"],
  },
  {
    icon: Target,
    title: "AI-Powered Lead Generation",
    description: "Growconic builds AI systems that book sales calls while you sleep. Advanced, AI-driven outreach that fills your calendar with qualified prospects ready to buy. We don't just generate leads. We generate revenue. Appointments booked. Deals closed. Growth automated.",
    features: ["Qualified Leads", "Auto Outreach", "Revenue Growth"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <motion.div
        className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
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
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-4 block">
            Our Services
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
            SERVICES{" "}
            <span className="text-gradient">WE PROVIDE</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Production-ready AI automation built specifically for your business operations.
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
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-accent/20 transition-all duration-300">
                <service.icon className="w-7 h-7 text-primary" />
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
                    className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
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
