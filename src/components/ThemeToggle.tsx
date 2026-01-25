import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 glass-button rounded-full w-12 h-12 backdrop-blur-xl transition-all duration-500 hover:scale-110"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun className={`h-5 w-5 absolute transition-all duration-500 ${isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
      <Moon className={`h-5 w-5 absolute transition-all duration-500 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
    </Button>
  );
};

export default ThemeToggle;
