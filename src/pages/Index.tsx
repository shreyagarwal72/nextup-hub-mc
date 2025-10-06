import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
      <main className="relative z-10 container mx-auto px-4 py-20">
        {/* Hero Section */}
        <header className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent drop-shadow-2xl leading-tight">
            Minecraft Hub - Official Nextup Studio
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto leading-relaxed mb-3">
            Choose Your Minecraft Edition: Bedrock or Java
          </p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            Free Minecraft downloads, custom worlds, Bedrock addons, Java mods, and stunning shaders. Your ultimate hub for Minecraft Bedrock Edition and Java Edition gaming.
          </p>
        </header>

        {/* Edition Cards */}
        <section className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16" aria-label="Choose Minecraft Edition - Bedrock or Java">
          {/* Bedrock Edition Card */}
          <article className="group animate-scale-in" itemScope itemType="https://schema.org/SoftwareApplication">
            <meta itemProp="name" content="Minecraft Bedrock Edition" />
            <meta itemProp="applicationCategory" content="Game" />
            <meta itemProp="operatingSystem" content="Windows, Android, iOS, Xbox, PlayStation, Nintendo Switch" />
            <Card className="bg-card/40 backdrop-blur-md border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 h-full">
              <CardHeader className="text-center pb-4 pt-8">
                <CardTitle className="text-3xl md:text-4xl font-bold text-primary mb-3 transition-all duration-300 group-hover:scale-105" itemProp="name">
                  Minecraft Bedrock Edition
                </CardTitle>
                <CardDescription className="text-base md:text-lg text-foreground/70 leading-relaxed px-4" itemProp="description">
                  Play cross-platform Minecraft Bedrock Edition with friends on Android, iOS, Windows, Xbox, PlayStation, and Nintendo Switch. Free download, worlds, and addons.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pt-2 pb-8">
                <Button 
                  onClick={handleBedrockClick}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 py-6 text-lg rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-primary/50 active:scale-95"
                  aria-label="Download and play Minecraft Bedrock Edition - Cross-platform gaming"
                  title="Access Minecraft Bedrock Edition worlds, addons, and downloads"
                >
                  Enter
                </Button>
              </CardContent>
            </Card>
          </article>

          {/* Java Edition Card */}
          <article className="group animate-scale-in" style={{ animationDelay: '0.1s' }} itemScope itemType="https://schema.org/SoftwareApplication">
            <meta itemProp="name" content="Minecraft Java Edition" />
            <meta itemProp="applicationCategory" content="Game" />
            <meta itemProp="operatingSystem" content="Windows, macOS, Linux" />
            <Card className="bg-card/40 backdrop-blur-md border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 h-full">
              <CardHeader className="text-center pb-4 pt-8">
                <CardTitle className="text-3xl md:text-4xl font-bold text-primary mb-3 transition-all duration-300 group-hover:scale-105" itemProp="name">
                  Minecraft Java Edition
                </CardTitle>
                <CardDescription className="text-base md:text-lg text-foreground/70 leading-relaxed px-4" itemProp="description">
                  Experience classic Minecraft Java Edition for PC with unlimited mods, custom servers, and community content. Free resources and downloads for Windows, Mac, and Linux.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pt-2 pb-8">
                <Button 
                  onClick={handleJavaClick}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 py-6 text-lg rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-primary/50 active:scale-95"
                  aria-label="Download and play Minecraft Java Edition - PC gaming with mods"
                  title="Access Minecraft Java Edition mods, servers, and custom content"
                >
                  Enter
                </Button>
              </CardContent>
            </Card>
          </article>
        </section>

        {/* Footer */}
        <footer className="text-center text-muted-foreground text-sm animate-fade-in" style={{ animationDelay: '0.3s' }} role="contentinfo">
          <p>© 2025 Nextup Studio · All Rights Reserved · Minecraft Hub - Bedrock & Java Edition Downloads</p>
          <p className="mt-2 text-xs">Official source for Minecraft worlds, addons, mods, shaders, and free downloads</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
