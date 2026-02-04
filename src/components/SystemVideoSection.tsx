import { motion } from "framer-motion";
import systemDemoVideo from "@/assets/system-demo.mp4";

const SystemVideoSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-4 block">
            See It In Action
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
            HOW <span className="text-gradient">SYSTEM 3.2</span> WORKS
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch our AI automation system in action — processing, analyzing, and executing in real-time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Video Container with Glow Effect */}
          <div className="relative rounded-2xl overflow-hidden glow-border">
            {/* Glow Background */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 blur-xl opacity-50" />
            
            <div className="relative glass-card p-2 md:p-3">
              <video
                src={systemDemoVideo}
                controls
                className="w-full h-auto rounded-xl"
                style={{ maxHeight: "80vh" }}
                poster=""
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SystemVideoSection;
