import { motion } from "framer-motion";

const DiscordCommunity = () => {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 radial-overlay" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start max-w-6xl mx-auto">
          {/* Left — Description */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading-bright font-display font-extrabold text-3xl md:text-4xl lg:text-5xl mb-8 text-center lg:text-left leading-tight tracking-tight">
              Join my free community to learn about AI
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              We're on a mission to make AI automation accessible to everyone.
            </p>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              Everyone knows AI is the future, but most people don't know how
              to take advantage of it. We do, and we're already well ahead in
              this space.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              We built a community that's more than free lessons. It's a place
              to learn, connect, network, and practice. We hold weekly meetings
              to track your progress, and new lessons drop constantly so you
              stay current with real-world scenarios.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              Here's what makes us different: you won't just learn AI. You'll
              learn how to turn it into income. That means finding clients who
              need AI automation, pitching and closing deals that lead to more
              opportunities, and building AI agents and automations that save
              businesses time, cut costs, and scale on autopilot.
            </p>
            <p className="text-lg md:text-xl font-bold text-foreground leading-relaxed">
              It doesn't matter if you're 9 or 90, a complete beginner or
              already technical. Join the community, follow our roadmap, and
              put in the work. That's how you start earning with AI.
            </p>
          </motion.div>

          {/* Right — Discord Widget */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col items-center lg:items-start"
          >
            <div className="glass-card p-2 w-full max-w-[400px]">
              <iframe
                src="https://discord.com/widget?id=1554367143393493053&theme=dark"

                width="350"
                height="500"
                allowTransparency={true}
                frameBorder="0"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                title="Growconic Discord Community"
                className="mx-auto block"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DiscordCommunity;
