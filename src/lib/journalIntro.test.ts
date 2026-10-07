import { describe, expect, it, vi } from "vitest";
import { INTRO_DURATION_MS, INTRO_SESSION_KEY, introTimeline, lockIntroScroll, markIntroPlayed, shouldPlayIntro } from "./journalIntro";

describe("journal intro rules", () => {
  it("ends at exactly three seconds", () => {
    expect(INTRO_DURATION_MS).toBe(3000);
    expect(introTimeline(2.999).done).toBe(false);
    expect(introTimeline(3).done).toBe(true);
    expect(introTimeline(3).fade).toBe(0);
  });
  it("converges particles from zero to one second", () => {
    expect(introTimeline(0).converge).toBe(0);
    expect(introTimeline(0.5).converge).toBe(0.5);
    expect(introTimeline(1).converge).toBe(1);
  });
  it("forms letters from one to 2.2 seconds", () => {
    expect(introTimeline(1).form).toBe(0);
    expect(introTimeline(1.6).form).toBeCloseTo(0.5);
    expect(introTimeline(2.2).form).toBe(1);
  });
  it("sweeps the light only from 2.2 to 2.6 seconds", () => {
    expect(introTimeline(2.2).sweep).toBe(0);
    expect(introTimeline(2.4).sweep).toBeCloseTo(0.5);
    expect(introTimeline(2.6).sweep).toBe(1);
  });
  it("fades only in the final 0.4 seconds", () => {
    expect(introTimeline(2.6).fade).toBe(1);
    expect(introTimeline(2.8).fade).toBeCloseTo(0.5);
    expect(introTimeline(3).fade).toBe(0);
  });
  it("plays once per session, but plays in a new session", () => {
    sessionStorage.clear();
    expect(shouldPlayIntro(sessionStorage)).toBe(true);
    markIntroPlayed(sessionStorage);
    expect(sessionStorage.getItem(INTRO_SESSION_KEY)).toBe("played");
    expect(shouldPlayIntro(sessionStorage)).toBe(false);
    sessionStorage.clear();
    expect(shouldPlayIntro(sessionStorage)).toBe(true);
  });
  it("restores existing scroll settings after the intro", () => {
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "scroll";
    const restore = lockIntroScroll();
    expect(document.body.style.overflow).toBe("hidden");
    expect(document.documentElement.style.overflow).toBe("hidden");
    restore();
    expect(document.body.style.overflow).toBe("auto");
    expect(document.documentElement.style.overflow).toBe("scroll");
  });
  it("does not crash when session storage is unavailable", () => {
    const storage = { getItem: vi.fn(() => { throw new Error("blocked"); }), setItem: vi.fn(() => { throw new Error("blocked"); }) };
    expect(shouldPlayIntro(storage)).toBe(true);
    expect(() => markIntroPlayed(storage)).not.toThrow();
  });
});