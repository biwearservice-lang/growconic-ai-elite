import { Component, Suspense, useCallback, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import JournalIntroScene, { type IntroPalette } from "./JournalIntroScene";
import { INTRO_DURATION_MS, lockIntroScroll, markIntroPlayed, shouldPlayIntro } from "@/lib/journalIntro";

class IntroBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="journal-intro-fallback">IMRAN'S JOURNAL</div> : this.props.children; }
}

export default function JournalIntro() {
  const [visible, setVisible] = useState(() => shouldPlayIntro(window.sessionStorage));
  const [scene, setScene] = useState<{ startedAt: number; palette: IntroPalette } | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const restoreScroll = useRef<(() => void) | null>(null);
  const reducedMotion = useReducedMotion();
  const finish = useCallback(() => {
    markIntroPlayed(window.sessionStorage);
    restoreScroll.current?.();
    restoreScroll.current = null;
    setVisible(false);
  }, []);

  useLayoutEffect(() => {
    if (!visible || !root.current) return;
    const styles = getComputedStyle(root.current);
    setScene({ startedAt: performance.now(), palette: {
      black: styles.getPropertyValue("--journal-intro-black").trim(),
      blue: styles.getPropertyValue("--journal-intro-blue").trim(),
      white: styles.getPropertyValue("--journal-intro-white").trim(),
    } });
    restoreScroll.current = lockIntroScroll();
    // Mark at entry, including when navigation interrupts playback.
    markIntroPlayed(window.sessionStorage);
    const timeout = window.setTimeout(finish, INTRO_DURATION_MS);
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") finish(); };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("keydown", onKey);
      restoreScroll.current?.();
      restoreScroll.current = null;
    };
  }, [visible, finish]);

  if (!visible) return null;
  return <motion.div ref={root} role="dialog" aria-modal="true" aria-label="Imran's Journal intro"
    className="journal-intro fixed inset-0 z-[100] overflow-hidden"
    initial={{ opacity: 1 }} animate={{ opacity: [1, 1, 0] }}
    transition={{ duration: INTRO_DURATION_MS / 1000, times: [0, 2.6 / 3, 1], ease: "easeInOut" }}>
    <IntroBoundary>
      {scene && <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 10], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        fallback={<div className="journal-intro-fallback">IMRAN'S JOURNAL</div>}>
        <Suspense fallback={null}>
          <JournalIntroScene {...scene} reducedMotion={Boolean(reducedMotion)} />
        </Suspense>
      </Canvas>}
    </IntroBoundary>
    <Button variant="ghost" size="sm" onClick={finish} className="journal-intro-skip absolute right-5 top-5 sm:right-8 sm:top-8">
      Skip <ArrowRight size={14} />
    </Button>
  </motion.div>;
}