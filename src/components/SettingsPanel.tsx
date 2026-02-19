import { Settings, Sparkles, Zap, Grid3X3, Waves, Volume2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SettingsPanelProps {
  matrixEnabled: boolean;
  onMatrixToggle: (enabled: boolean) => void;
  particlesEnabled: boolean;
  onParticlesToggle: (enabled: boolean) => void;
  auroraEnabled: boolean;
  onAuroraToggle: (enabled: boolean) => void;
  soundEnabled: boolean;
  onSoundToggle: (enabled: boolean) => void;
  playSound: (type?: "hover" | "click" | "toggle") => void;
}

const SettingsPanel = ({ 
  matrixEnabled, 
  onMatrixToggle,
  particlesEnabled,
  onParticlesToggle,
  auroraEnabled,
  onAuroraToggle,
  soundEnabled,
  onSoundToggle,
  playSound,
}: SettingsPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (setter: (v: boolean) => void, value: boolean) => {
    setter(value);
    playSound("toggle");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => { setIsOpen(!isOpen); playSound("click"); }}
        onMouseEnter={() => playSound("hover")}
        className="glass-button rounded-full w-12 h-12 backdrop-blur-xl transition-all duration-500 hover:scale-110 hover:rotate-90"
        aria-label="Settings"
      >
        <Settings className={`h-5 w-5 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      <div 
        className={`absolute bottom-16 right-0 glass-card rounded-2xl p-5 min-w-[220px] transition-all duration-500 transform origin-bottom-right ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        }`}
      >
        <h3 className="text-sm font-semibold mb-5 text-foreground/80 flex items-center gap-2">
          <Sparkles className="w-4 h-4 animate-pulse" />
          Visual Effects
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 group">
            <label htmlFor="particles-toggle" className="text-sm text-foreground/70 flex items-center gap-2 cursor-pointer">
              <Zap className="w-4 h-4 text-primary group-hover:animate-bounce" />
              Particles
            </label>
            <Switch id="particles-toggle" checked={particlesEnabled} onCheckedChange={(v) => handleToggle(onParticlesToggle, v)} />
          </div>

          <div className="flex items-center justify-between gap-4 group">
            <label htmlFor="matrix-toggle" className="text-sm text-foreground/70 flex items-center gap-2 cursor-pointer">
              <Grid3X3 className="w-4 h-4 text-accent group-hover:animate-spin" />
              Matrix Rain
            </label>
            <Switch id="matrix-toggle" checked={matrixEnabled} onCheckedChange={(v) => handleToggle(onMatrixToggle, v)} />
          </div>

          <div className="flex items-center justify-between gap-4 group">
            <label htmlFor="aurora-toggle" className="text-sm text-foreground/70 flex items-center gap-2 cursor-pointer">
              <Waves className="w-4 h-4 text-primary group-hover:animate-pulse" />
              Aurora
            </label>
            <Switch id="aurora-toggle" checked={auroraEnabled} onCheckedChange={(v) => handleToggle(onAuroraToggle, v)} />
          </div>

          <div className="h-px bg-foreground/10 my-1" />

          <div className="flex items-center justify-between gap-4 group">
            <label htmlFor="sound-toggle" className="text-sm text-foreground/70 flex items-center gap-2 cursor-pointer">
              <Volume2 className="w-4 h-4 text-foreground/60 group-hover:animate-bounce" />
              Sounds
            </label>
            <Switch id="sound-toggle" checked={soundEnabled} onCheckedChange={onSoundToggle} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
