import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface EditionCardProps {
  title: string;
  description: string;
  version: string;
  variant: "primary" | "accent";
  onClick: () => void;
}

const EditionCard = ({ title, description, version, variant, onClick }: EditionCardProps) => {
  const isPrimary = variant === "primary";
  
  return (
    <article className="group glass-card rounded-3xl p-1 transition-all duration-700 hover:scale-[1.03] hover:shadow-2xl animate-fade-in-up">
      <div className="bg-card/30 backdrop-blur-xl rounded-[22px] p-6 md:p-8 h-full flex flex-col items-center text-center relative overflow-hidden">
        {/* Animated gradient overlay */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${
          isPrimary ? 'from-primary/10 via-transparent to-primary/5' : 'from-accent/10 via-transparent to-accent/5'
        }`} />
        
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>

        {/* Floating sparkles */}
        <div className={`absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 ${
          isPrimary ? 'text-primary' : 'text-accent'
        }`}>
          <Sparkles className="w-5 h-5 animate-pulse-glow" />
        </div>
        
        {/* Version badge */}
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono backdrop-blur-xl transition-all duration-500 group-hover:scale-110 ${
          isPrimary ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
        }`}>
          {version}
        </div>
        
        <div className="mb-6 relative z-10 pt-4">
          <h2 className={`text-2xl md:text-3xl font-bold mb-3 tracking-tight transition-all duration-500 group-hover:tracking-wide ${
            isPrimary ? 'text-primary' : 'text-accent'
          }`}>
            {title}
          </h2>
          <div className={`h-0.5 w-16 mx-auto mb-4 rounded-full transition-all duration-500 group-hover:w-32 group-hover:h-1 ${
            isPrimary ? 'bg-primary/50 group-hover:bg-primary' : 'bg-accent/50 group-hover:bg-accent'
          }`} />
          <p className="text-sm md:text-base text-foreground/70 leading-relaxed max-w-xs transition-colors duration-500 group-hover:text-foreground/90">
            {description}
          </p>
        </div>

        <Button 
          onClick={onClick}
          className={`mt-auto relative overflow-hidden rounded-2xl px-8 md:px-10 py-5 md:py-6 text-base font-semibold tracking-wide transition-all duration-500 hover:scale-110 hover:shadow-xl group/btn ${
            isPrimary 
              ? 'bg-primary/90 hover:bg-primary text-primary-foreground shadow-primary/25 hover:shadow-primary/50' 
              : 'bg-accent/90 hover:bg-accent text-accent-foreground shadow-accent/25 hover:shadow-accent/50'
          }`}
          aria-label={`Enter ${title} Hub`}
        >
          <span className="relative z-10 flex items-center gap-2">
            Play Now
            <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000" />
        </Button>

        {/* Corner accents */}
        <div className={`absolute bottom-0 left-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-all duration-700 ${
          isPrimary ? 'bg-gradient-to-tr from-primary/20 to-transparent' : 'bg-gradient-to-tr from-accent/20 to-transparent'
        } rounded-br-3xl`} />
        <div className={`absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-all duration-700 ${
          isPrimary ? 'bg-gradient-to-bl from-primary/20 to-transparent' : 'bg-gradient-to-bl from-accent/20 to-transparent'
        } rounded-bl-3xl`} />
      </div>
    </article>
  );
};

export default EditionCard;
