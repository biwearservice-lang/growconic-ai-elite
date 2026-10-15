import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MessageSquare,
  Phone,
  Bot,
  Target,
  Video,
  Monitor,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  short: string;
  description: string;
  features: string[];
}

const services: Service[] = [
  {
    icon: MessageSquare,
    title: "AI Chatbots",
    short: "Chatbots",
    description: "Your always-on AI sales rep that never sleeps. Built to handle customer support, qualify leads, book appointments, and capture buyer intent the moment visitors land on your site. Every interaction is instant, contextual, and conversion-focused. No delays. No lost leads. No missed opportunities. Just seamless conversations that turn traffic into revenue.",
    features: ["24/7 Support", "Lead Qualification", "Appointment Booking"],
  },
  {
    icon: Phone,
    title: "AI Phone Callers",
    short: "Phone Callers",
    description: "Inbound. Outbound. Zero missed calls. Intelligent AI voice systems that handle customer support, cold calling, appointment booking, and call center operations automatically. Every prospect is answered in seconds, every opportunity captured — without adding headcount.",
    features: ["Inbound Calls", "Outbound Calls", "Call Center Automation"],
  },
  {
    icon: Bot,
    title: "Custom AI Agents",
    short: "Custom Agents",
    description: "Have a workflow everyone says is \"too complex\" to automate? That's exactly what we build. We analyze your processes, identify bottlenecks, and design custom AI agents tailored to your business. If it can be automated, we make it happen.",
    features: ["Process Analysis", "Custom Solutions", "Full Automation"],
  },
  {
    icon: Target,
    title: "AI-Powered Lead Generation",
    short: "Lead Generation",
    description: "Growconic builds AI systems that book sales calls while you sleep. Advanced, AI-driven outreach that fills your calendar with qualified prospects ready to buy. We don't just generate leads. We generate revenue. Appointments booked. Deals closed. Growth automated.",
    features: ["Qualified Leads", "Auto Outreach", "Revenue Growth"],
  },
  {
    icon: Video,
    title: "UGC & Video Editing",
    short: "UGC & Video",
    description: "Scroll-stopping content that actually sells. We produce authentic UGC-style videos and handle end-to-end editing — hooks, cuts, captions, sound design, and pacing tuned for conversion. Whether it's ads, organic short-form, or long-form storytelling, we craft content that feels native to the platform and built to drive action. No fluff. Just content that performs.",
    features: ["UGC Creation", "Short-Form Edits", "Ad Creatives"],
  },
  {
    icon: Monitor,
    title: "Web Design & Development",
    short: "Web Design",
    description: "High-converting websites engineered to close. We design and build fast, modern, conversion-obsessed sites that match the caliber of your brand. Every section, every animation, every CTA is intentional — built to capture attention, build trust, and turn visitors into booked calls. Premium design. Bulletproof code. Built to scale with you.",
    features: ["Conversion-Focused", "Premium Design", "Lightning Fast"],
  },
];

const AUTO_ADVANCE_MS = 6000;

const ServicesSection = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex(((next % services.length) + services.length) % services.length);
    },
    [index]
  );

  const step = useCallback(
    (delta: number) => {
      goTo(index + delta);
    },
    [goTo, index]
  );

  // Auto-advance; resets whenever the active service changes.
  useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => step(1), AUTO_ADVANCE_MS);
    return () => window.clearTimeout(t);
  }, [index, paused, step]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
    setPaused(true);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchX.current;
    touchX.current = null;
    setPaused(false);
    if (start == null) return;
    const dx = e.changedTouches[0].clientX - start;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
  };

  const active = services[index];

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

        <div
          className="max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Service text occupies the former showcase position. */}
          <div
            className="relative"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="glass-card min-h-[460px] sm:min-h-[400px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: direction * 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -30 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="p-6 sm:p-8"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-6">
                    <active.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-3">
                    {active.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {active.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {active.features.map((feature) => (
                      <span key={feature} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {feature}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Arrows */}
            <div className="mt-5 flex items-center justify-center gap-4">
              <button
                type="button"
                aria-label="Previous service"
                onClick={() => step(-1)}
                className="rounded-full border border-border bg-card/60 p-3 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next service"
                onClick={() => step(1)}
                className="rounded-full border border-border bg-card/60 p-3 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Pill selector */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {services.map((service, i) => (
                <button
                  key={service.title}
                  type="button"
                  onClick={() => goTo(i)}
                  className={
                    i === index
                      ? "rounded-full border border-primary/50 bg-primary/15 px-4 py-1.5 text-xs font-semibold text-primary transition-colors"
                      : "rounded-full border border-border px-4 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  }
                >
                  {service.short}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
