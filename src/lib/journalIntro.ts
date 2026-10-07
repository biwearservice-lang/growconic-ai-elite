export const INTRO_DURATION_MS = 3000;
export const INTRO_SESSION_KEY = "imran-journal-intro-v1";

export function shouldPlayIntro(storage: Pick<Storage, "getItem">): boolean {
  try { return storage.getItem(INTRO_SESSION_KEY) !== "played"; }
  catch { return true; }
}

export function markIntroPlayed(storage: Pick<Storage, "setItem">) {
  try { storage.setItem(INTRO_SESSION_KEY, "played"); } catch { /* Private browser fallback. */ }
}

export const smooth = (value: number) => {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
};

export function introTimeline(seconds: number) {
  return {
    converge: smooth(seconds),
    form: smooth((seconds - 1) / 1.2),
    sweep: smooth((seconds - 2.2) / 0.4),
    fade: 1 - smooth((seconds - 2.6) / 0.4),
    done: seconds >= INTRO_DURATION_MS / 1000,
  };
}

export function lockIntroScroll() {
  const bodyOverflow = document.body.style.overflow;
  const htmlOverflow = document.documentElement.style.overflow;
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = bodyOverflow;
    document.documentElement.style.overflow = htmlOverflow;
  };
}