import { motion } from "framer-motion";
import { Shield, Lock, Users } from "lucide-react";

const AuthorityStrip = () => {
  return (
    <section className="relative py-8 border-y border-border/50 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
        >
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-gold-400" />
            <span className="text-muted-foreground text-sm">Limited Client Onboarding</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-border" />
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-gold-400" />
            <span className="text-muted-foreground text-sm">Enterprise-Grade Security</span>
          </div>
          <div className="hidden md:block w-px h-6 bg-border" />
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-gold-400" />
            <span className="text-muted-foreground text-sm">Maximum Results Per Client</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AuthorityStrip;
