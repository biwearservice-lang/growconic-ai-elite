import { act, cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import HeroVideo from "./HeroVideo";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("robot background playback", () => {
  it("pauses rather than autoplaying when reduced motion is requested", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() } as unknown as MediaQueryList);
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    const pause = vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
    render(<HeroVideo />);
    expect(pause).toHaveBeenCalledOnce();
    expect(play).not.toHaveBeenCalled();
  });

  it("retries muted playback after a gesture if autoplay is blocked", async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockRejectedValueOnce(new DOMException("Blocked", "NotAllowedError")).mockResolvedValue();
    const { container } = render(<HeroVideo />);
    await act(async () => {});
    await act(async () => { document.dispatchEvent(new Event("pointerdown")); });
    expect(play).toHaveBeenCalledTimes(2);
    expect(container.querySelector("video")?.muted).toBe(true);
  });

  it("tries the alternate video format after a decoding error", () => {
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
    const { container } = render(<HeroVideo />);
    const video = container.querySelector("video");
    if (!video) throw new Error("Missing video");
    const initialSource = video.src;
    act(() => { video.dispatchEvent(new Event("error")); });
    expect(video.src).not.toBe(initialSource);
    expect(video.src).toContain(".webm");
  });
});