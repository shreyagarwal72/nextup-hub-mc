import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import heroBackground from "@/assets/gaming-hero.jpg";

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleBedrockClick = () => {
    window.location.href = 'https://minecraft-hub-xi.vercel.app/';
  };

  const handleJavaClick = () => {
    window.location.href = 'https://minecraft-hub-op.vercel.app/';
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-background/60" />

      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none transition-all duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.2), transparent 50%)`
        }}
      />

      {/* Floating Orbs Background */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/30 blur-3xl floating-orb" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-20 w-40 h-40 rounded-full bg-primary/20 blur-3xl floating-orb" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-1/4 w-36 h-36 rounded-full bg-primary/25 blur-3xl floating-orb" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-32 right-1/3 w-28 h-28 rounded-full bg-primary/35 blur-3xl floating-orb" style={{ animationDelay: '6s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-primary/15 blur-3xl floating-orb" style={{ animationDelay: '3s' }} />
      <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-primary/25 blur-3xl floating-orb" style={{ animationDelay: '5s' }} />
      
      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent drop-shadow-2xl leading-tight">
            Welcome to Nextup Studio!
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed mb-4">
            Your hub for Minecraft worlds, Techno Gamerz World downloads, feature-rich Bedrock addons, and stunning shaders.
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Designed for players seeking adventure, survival, and epic new visuals.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <Button 
              onClick={handleBedrockClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 active:scale-95 min-w-[200px]"
            >
              Explore My World
            </Button>
            <Button 
              onClick={handleJavaClick}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 active:scale-95 min-w-[200px]"
            >
              Discover Addons
            </Button>
          </div>
        </section>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="w-8 h-12 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
