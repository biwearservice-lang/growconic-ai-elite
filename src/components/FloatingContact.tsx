import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Linkedin, MessageCircle, X } from "lucide-react";

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3 mb-2"
          >
            <a
              href="https://www.instagram.com/imranbiswas._?jplx=MTZzNDU3MXkwczVp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-card border border-border shadow-lg hover:border-foreground/40 hover:shadow-foreground/10 transition-all group"
            >
              <Instagram className="w-5 h-5 text-foreground" aria-hidden="true" />
              <span className="text-sm font-medium text-foreground">Instagram</span>
            </a>
            <a
              href="https://x.com/Imran30_7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-card border border-border shadow-lg hover:border-foreground/40 hover:shadow-foreground/10 transition-all group"
            >
              <svg className="w-5 h-5 text-foreground" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="text-sm font-medium text-foreground">X (Twitter)</span>
            </a>
            <a
              href="https://www.linkedin.com/in/imran-biswas-2b97553ab?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-card border border-border shadow-lg hover:border-foreground/40 hover:shadow-foreground/10 transition-all group"
            >
              <Linkedin className="w-5 h-5 text-foreground" aria-hidden="true" />
              <span className="text-sm font-medium text-foreground">LinkedIn</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gold-500 hover:bg-gold-600 text-white shadow-lg shadow-gold-500/30 flex items-center justify-center transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};

export default FloatingContact;
