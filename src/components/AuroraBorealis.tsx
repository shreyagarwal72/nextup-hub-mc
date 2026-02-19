import { useEffect, useRef } from "react";

interface AuroraBorealisProps {
  enabled: boolean;
}

const AuroraBorealis = ({ enabled }: AuroraBorealisProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) {
      cancelAnimationFrame(animRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Aurora wave parameters
    const waves = [
      { y: 0.3, amplitude: 60, frequency: 0.003, speed: 0.008, hue: 160, saturation: 70, lightness: 50, width: 200 },
      { y: 0.35, amplitude: 45, frequency: 0.004, speed: 0.006, hue: 200, saturation: 60, lightness: 45, width: 180 },
      { y: 0.25, amplitude: 70, frequency: 0.002, speed: 0.01, hue: 280, saturation: 50, lightness: 40, width: 160 },
      { y: 0.4, amplitude: 35, frequency: 0.005, speed: 0.007, hue: 130, saturation: 65, lightness: 48, width: 140 },
    ];

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { width: w, height: h } = canvas;

      waves.forEach((wave) => {
        const baseY = h * wave.y;

        for (let x = 0; x < w; x += 2) {
          const nx = x / w;
          const y =
            baseY +
            Math.sin(x * wave.frequency + time * wave.speed * 60) * wave.amplitude +
            Math.sin(x * wave.frequency * 2.5 + time * wave.speed * 40) * wave.amplitude * 0.4 +
            Math.cos(x * wave.frequency * 0.7 + time * wave.speed * 20) * wave.amplitude * 0.6;

          // Fade edges horizontally
          const edgeFade = Math.sin(nx * Math.PI);
          // Gentle vertical shimmer
          const shimmer = 0.6 + 0.4 * Math.sin(time * wave.speed * 30 + x * 0.01);
          const alpha = 0.12 * edgeFade * shimmer;

          const grad = ctx.createLinearGradient(x, y - wave.width / 2, x, y + wave.width / 2);
          grad.addColorStop(0, `hsla(${wave.hue}, ${wave.saturation}%, ${wave.lightness}%, 0)`);
          grad.addColorStop(0.5, `hsla(${wave.hue}, ${wave.saturation}%, ${wave.lightness}%, ${alpha})`);
          grad.addColorStop(1, `hsla(${wave.hue}, ${wave.saturation}%, ${wave.lightness}%, 0)`);

          ctx.fillStyle = grad;
          ctx.fillRect(x, y - wave.width / 2, 2, wave.width);
        }
      });

      time += 1;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.7, willChange: "transform" }}
      aria-hidden="true"
    />
  );
};

export default AuroraBorealis;
