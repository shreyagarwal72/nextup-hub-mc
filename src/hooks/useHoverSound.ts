import { useCallback, useRef } from "react";

let audioCtx: AudioContext | null = null;

function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

type SoundType = "hover" | "click" | "toggle";

const soundConfigs: Record<SoundType, { freq: number; duration: number; type: OscillatorType; gain: number }> = {
  hover: { freq: 1200, duration: 0.06, type: "sine", gain: 0.04 },
  click: { freq: 800, duration: 0.08, type: "triangle", gain: 0.06 },
  toggle: { freq: 1500, duration: 0.1, type: "sine", gain: 0.05 },
};

export function useHoverSound(soundEnabled: boolean) {
  const lastPlayed = useRef(0);

  const playSound = useCallback(
    (type: SoundType = "hover") => {
      if (!soundEnabled) return;
      const now = Date.now();
      if (now - lastPlayed.current < 50) return; // debounce
      lastPlayed.current = now;

      try {
        const ctx = getAudioCtx();
        const config = soundConfigs[type];
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = config.type;
        osc.frequency.setValueAtTime(config.freq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(config.freq * 0.7, ctx.currentTime + config.duration);

        gainNode.gain.setValueAtTime(config.gain, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + config.duration);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + config.duration);
      } catch {
        // Silently fail if audio isn't available
      }
    },
    [soundEnabled]
  );

  return { playSound };
}
