import { useEffect, useRef } from "react";

const ParticlesOverlay = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    type P = { x: number; y: number; r: number; vy: number; vx: number; o: number; tw: number };
    const particles: P[] = [];
    const make = (y?: number): P => ({
      x: Math.random() * width,
      y: y ?? Math.random() * height,
      r: Math.random() * 1.8 + 0.4,
      vy: Math.random() * 0.6 + 0.2,
      vx: (Math.random() - 0.5) * 0.15,
      o: Math.random() * 0.6 + 0.2,
      tw: Math.random() * 0.02 + 0.005,
    });

    const init = () => {
      resize();
      particles.length = 0;
      const count = Math.min(140, Math.floor((width * height) / 12000));
      for (let i = 0; i < count; i++) particles.push(make());
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx;
        p.o += Math.sin(Date.now() * p.tw) * 0.005;
        if (p.y > height + 4) {
          p.y = -4;
          p.x = Math.random() * width;
        }
        if (p.x < -4) p.x = width + 4;
        if (p.x > width + 4) p.x = -4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(270, 91%, 65%, ${Math.max(0.1, Math.min(0.9, p.o))})`;
        ctx.shadowColor = "hsl(270, 91%, 60%)";
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    init();
    tick();

    const ro = new ResizeObserver(() => init());
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 w-full h-full z-[1]"
      aria-hidden="true"
    />
  );
};

export default ParticlesOverlay;
