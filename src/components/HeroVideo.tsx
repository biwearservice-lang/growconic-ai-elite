import { useEffect, useRef, useState } from "react";
import robotVideo from "@/assets/growconic-hero-robot-compatible.mp4.asset.json";
import robotWebVideo from "@/assets/growconic-hero-robot.webm.asset.json";
import robotPoster from "@/assets/growconic-hero-robot-poster.jpg.asset.json";

const HeroVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [source, setSource] = useState(robotVideo.url);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    const resume = () => {
      if (disposed) return;
      if (motionPreference.matches || document.visibilityState === "hidden") {
        video.pause();
        setPlaying(false);
        return;
      }
      // Set DOM properties before play: some mobile browsers block autoplay otherwise.
      video.muted = true;
      video.defaultMuted = true;
      void video.play()?.catch(() => {
        if (!disposed) setPlaying(false);
      });
    };
    video.addEventListener("canplay", resume);
    document.addEventListener("visibilitychange", resume);
    document.addEventListener("pointerdown", resume);
    motionPreference.addEventListener("change", resume);
    resume();
    return () => {
      disposed = true;
      video.removeEventListener("canplay", resume);
      document.removeEventListener("visibilitychange", resume);
      document.removeEventListener("pointerdown", resume);
      motionPreference.removeEventListener("change", resume);
    };
  }, [source]);

  return (
    <>
      <img src={robotPoster.url} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-center" />
      <video
        ref={videoRef}
        src={source}
        poster={robotPoster.url}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setPlaying(false);
          if (source !== robotWebVideo.url) setSource(robotWebVideo.url);
        }}
        className={`absolute inset-0 h-full w-full object-cover object-center ${playing ? "opacity-100" : "opacity-0"}`}
      />
    </>
  );
};

export default HeroVideo;