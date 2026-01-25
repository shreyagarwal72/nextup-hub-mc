import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import ThemeToggle from "@/components/ThemeToggle";
import SettingsPanel from "@/components/SettingsPanel";
import MatrixRain from "@/components/MatrixRain";
import EditionCard from "@/components/EditionCard";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [matrixEnabled, setMatrixEnabled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const handleBedrockClick = () => {
    window.location.href = "https://minecraft-hub-xi.vercel.app/";
  };

  const handleJavaClick = () => {
    window.location.href = "https://minecraft-hub-op.vercel.app/";
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-700">
      {/* Matrix Rain Effect */}
      <MatrixRain enabled={matrixEnabled} />

      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      {/* Floating gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-float-delayed" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] animate-float" />

      {/* Theme Toggle */}
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />

      {/* Settings Panel */}
      <SettingsPanel matrixEnabled={matrixEnabled} onMatrixToggle={setMatrixEnabled} />

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <header className="text-center mb-16 md:mb-20">
          <div className="inline-block mb-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient-x">
                Minecraft Hub
              </span>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-foreground/60 font-medium mb-3">
            Official NextUp Studio
          </p>
          <p className="text-base md:text-lg text-foreground/50 max-w-xl mx-auto leading-relaxed">
            Choose Your Edition · Free Downloads · Custom Worlds · Mods & Shaders
          </p>
        </header>

        {/* Edition Cards */}
        <section className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-16" aria-label="Choose Minecraft Edition">
          <EditionCard
            title="Bedrock Edition"
            description="Cross-platform play on Android, iOS, Windows, Xbox, PlayStation, and Nintendo Switch."
            version="v1.21.x"
            variant="primary"
            onClick={handleBedrockClick}
          />
          <EditionCard
            title="Java Edition"
            description="The classic PC experience with unlimited mods, custom servers, and community content."
            version="v1.21.x"
            variant="accent"
            onClick={handleJavaClick}
          />
        </section>

        {/* YouTube Subscribe Section */}
        <section className="text-center mb-16">
          <div className="inline-block glass-card rounded-3xl p-8 md:p-10">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground/80 mb-6">
              Join Our Community
            </h3>
            <div className="youtube-subscribe flex justify-center">
              <div 
                className="g-ytsubscribe"
                data-channelid="UCFEyuiIys7KoiZkczq4erJw"
                data-layout="full"
                data-count="default"
                data-theme="default"
              />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-foreground/40 text-sm" role="contentinfo">
          <div className="h-px w-48 bg-gradient-to-r from-transparent via-foreground/20 to-transparent mx-auto mb-6" />
          <p className="mb-2">© 2025 NextUp Studio · All Rights Reserved</p>
          <p className="text-xs text-foreground/30">
            Minecraft Hub - Your source for Minecraft content
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
