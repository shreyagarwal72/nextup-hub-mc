import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/Loading.json";
import heroBackground from "@/assets/gaming-hero.jpg";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Loading animation duration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
        <div className="grid-background absolute inset-0" />
        <div className="scan-line-effect absolute inset-0" />
        
        {/* Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="w-64 h-64">
            <Lottie animationData={loadingAnimation} loop={true} />
          </div>
          <h2 className="text-3xl font-bold text-primary neon-text tracking-wider">
            LOADING...
          </h2>
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Grid Background */}
      <div className="grid-background absolute inset-0" />
      
      {/* Scan Line Effect */}
      <div className="scan-line-effect absolute inset-0" />

      {/* Hero Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/95 to-background" />

      {/* Animated Cursor Glow */}
      <div 
        className="absolute w-96 h-96 rounded-full pointer-events-none transition-all duration-300 blur-3xl"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: `radial-gradient(circle, hsl(var(--neon-green) / 0.15), transparent 70%)`
        }}
      />

      {/* Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="particle absolute w-1 h-1 bg-primary rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        />
      ))}

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <header className="text-center mb-12 md:mb-16">
          <div className="corner-bracket inline-block mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary neon-text px-8 py-4 tracking-tight">
              MINECRAFT HUB
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-accent font-semibold mb-4 tracking-wider">
            // OFFICIAL NEXTUP STUDIO //
          </p>
          <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed mb-2">
            Choose Your Minecraft Edition: Bedrock or Java
          </p>
          <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto">
            Free Minecraft downloads, custom worlds, Bedrock addons, Java mods, and stunning shaders.
          </p>
        </header>

        {/* Edition Cards */}
        <section className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto mb-12 md:mb-16" aria-label="Choose Minecraft Edition">
          {/* Bedrock Edition Card */}
          <article className="group gaming-card rounded-lg p-1 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px] hover:shadow-primary/30">
            <div className="bg-card rounded-md p-6 md:p-8 h-full flex flex-col items-center text-center relative">
              <div className="absolute top-2 left-2 text-xs text-primary/60 font-mono">v1.21.x</div>
              
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3 tracking-wider group-hover:glitch-text">
                  BEDROCK EDITION
                </h2>
                <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-4" />
                <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                  Play cross-platform Minecraft Bedrock Edition with friends on Android, iOS, Windows, Xbox, PlayStation, and Nintendo Switch.
                </p>
              </div>

              <Button 
                onClick={handleBedrockClick}
                className="mt-auto bg-primary hover:bg-primary/90 text-black font-bold px-8 md:px-12 py-4 md:py-6 text-base md:text-lg tracking-wider transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px] hover:shadow-primary relative overflow-hidden group/btn"
                aria-label="Enter Minecraft Bedrock Edition Hub"
              >
                <span className="relative z-10">» PLAY NOW «</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
              </Button>

              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/50" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/50" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/50" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/50" />
            </div>
          </article>

          {/* Java Edition Card */}
          <article className="group gaming-card rounded-lg p-1 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px] hover:shadow-accent/30">
            <div className="bg-card rounded-md p-6 md:p-8 h-full flex flex-col items-center text-center relative">
              <div className="absolute top-2 left-2 text-xs text-accent/60 font-mono">v1.21.x</div>
              
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-accent mb-3 tracking-wider group-hover:glitch-text">
                  JAVA EDITION
                </h2>
                <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-4" />
                <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                  Experience classic Minecraft Java Edition for PC with unlimited mods, custom servers, and community content for Windows, Mac, and Linux.
                </p>
              </div>

              <Button 
                onClick={handleJavaClick}
                className="mt-auto bg-accent hover:bg-accent/90 text-black font-bold px-8 md:px-12 py-4 md:py-6 text-base md:text-lg tracking-wider transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px] hover:shadow-accent relative overflow-hidden group/btn"
                aria-label="Enter Minecraft Java Edition Hub"
              >
                <span className="relative z-10">» PLAY NOW «</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700" />
              </Button>

              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/50" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent/50" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent/50" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent/50" />
            </div>
          </article>
        </section>

        {/* YouTube Subscribe Section */}
        <section className="text-center mb-12 animate-fade-in">
          <div className="inline-block gaming-card rounded-lg p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-primary mb-4 tracking-wider">
              JOIN OUR COMMUNITY
            </h3>
            <div className="youtube-subscribe flex justify-center">
              <div 
                className="g-ytsubscribe"
                data-channelid="UCFEyuiIys7KoiZkczq4erJw"
                data-layout="full"
                data-count="default"
                data-theme="dark"
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-muted-foreground text-xs md:text-sm font-mono" role="contentinfo">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-4" />
          <p className="mb-2">© 2025 NEXTUP STUDIO · ALL RIGHTS RESERVED</p>
          <p className="text-xs">MINECRAFT HUB - BEDROCK & JAVA EDITION DOWNLOADS</p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            Official source for Minecraft worlds, addons, mods, shaders, and free downloads
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
