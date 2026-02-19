import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2400;
    const interval = 30;
    const step = 100 / (duration / interval);
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step + Math.random() * 0.5;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, interval);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-accent/6 rounded-full blur-[100px] animate-float-delayed" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Rotating bracket crosshair */}
        <div className="relative w-16 h-16">
          {/* Outer rotating brackets */}
          <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
            {/* Top-left bracket */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/70 rounded-tl-sm" />
            {/* Top-right bracket */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/70 rounded-tr-sm" />
            {/* Bottom-left bracket */}
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/70 rounded-bl-sm" />
            {/* Bottom-right bracket */}
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/70 rounded-br-sm" />
          </div>

          {/* Inner counter-rotating brackets */}
          <div className="absolute inset-2 animate-[spin_2s_linear_infinite_reverse]">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-accent/60 rounded-tl-sm" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-accent/60 rounded-tr-sm" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-accent/60 rounded-bl-sm" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-accent/60 rounded-br-sm" />
          </div>

          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-primary/80 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Progress percentage */}
        <span className="text-sm font-mono text-foreground/50 tracking-[0.3em] tabular-nums">
          {Math.floor(progress)}%
        </span>

        {/* Minimal progress bar */}
        <div className="w-40 h-[2px] bg-foreground/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary/60 to-accent/60 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
