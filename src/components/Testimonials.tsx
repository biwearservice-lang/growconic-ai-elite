import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Growconic automated our entire sales follow-up process. We're closing 40% more deals with the same team size.",
    author: "Sarah Chen",
    role: "CEO, TechScale Solutions",
    metric: "40% more closed deals",
  },
  {
    quote: "Our support tickets are now handled 24/7 without adding headcount. Customer satisfaction is at an all-time high.",
    author: "Marcus Johnson",
    role: "Founder, E-Commerce Direct",
    metric: "85% faster response time",
  },
  {
    quote: "We saved 120+ hours per month on manual data entry alone. The ROI was visible within the first week.",
    author: "Elena Rodriguez",
    role: "Operations Lead, ScaleUp Agency",
    metric: "120+ hours saved monthly",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative py-24 bg-secondary/20">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold-400 text-sm font-semibold uppercase tracking-wider mb-4 block">
            Results
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
            REAL OUTCOMES,{" "}
            <span className="text-gradient">REAL BUSINESSES</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't take our word for it. See what our clients are achieving.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-8 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6">
                <Quote className="w-8 h-8 text-gold-500/20" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground text-lg mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Metric */}
              <div className="inline-block px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
                <span className="text-gold-400 font-semibold text-sm">
                  {testimonial.metric}
                </span>
              </div>

              {/* Author */}
              <div>
                <p className="font-display font-semibold text-foreground">
                  {testimonial.author}
                </p>
                <p className="text-muted-foreground text-sm">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
