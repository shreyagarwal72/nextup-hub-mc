import { Settings, Sparkles } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SettingsPanelProps {
  matrixEnabled: boolean;
  onMatrixToggle: (enabled: boolean) => void;
}

const SettingsPanel = ({ matrixEnabled, onMatrixToggle }: SettingsPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="glass-button rounded-full w-12 h-12 backdrop-blur-xl transition-all duration-500 hover:scale-110"
        aria-label="Settings"
      >
        <Settings className={`h-5 w-5 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      <div 
        className={`absolute bottom-16 right-0 glass-card rounded-2xl p-4 min-w-[200px] transition-all duration-500 transform origin-bottom-right ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        }`}
      >
        <h3 className="text-sm font-semibold mb-4 text-foreground/80 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Effects
        </h3>
        
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="matrix-toggle" className="text-sm text-foreground/70">
            Matrix Rain
          </label>
          <Switch
            id="matrix-toggle"
            checked={matrixEnabled}
            onCheckedChange={onMatrixToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
