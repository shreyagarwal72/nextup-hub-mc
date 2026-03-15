import { useEffect, useState, lazy, Suspense } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import ThemeToggle from "@/components/ThemeToggle";
import SettingsPanel from "@/components/SettingsPanel";
import MatrixRain from "@/components/MatrixRain";
import ParticleField from "@/components/ParticleField";
import AuroraBorealis from "@/components/AuroraBorealis";
import EditionCard from "@/components/EditionCard";
import { useHoverSound } from "@/hooks/useHoverSound";

const MinecraftBlock = lazy(() => import("@/components/MinecraftBlock"));

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [matrixEnabled, setMatrixEnabled] = useState(false);
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const [auroraEnabled, setAuroraEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const { playSound } = useHoverSound(soundEnabled);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const handleBedrockClick = () => {
    playSound("click");
    window.location.href = "https://minecraft-hub-xi.vercel.app/";
  };

  const handleJavaClick = () => {
    playSound("click");
    window.location.href = "https://minecraft-hub-op.vercel.app/";
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden transition-colors duration-700">
      {/* Background Effects */}
      <MatrixRain enabled={matrixEnabled} />
      <ParticleField enabled={particlesEnabled} />
      <AuroraBorealis enabled={auroraEnabled} />

      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 animate-gradient" />
      
      {/* Floating gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-float-delayed" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] animate-float-slow" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-[90px] animate-float-reverse" />

      {/* Theme Toggle */}
      <ThemeToggle isDark={isDark} onToggle={() => { setIsDark(!isDark); playSound("toggle"); }} />

      {/* Settings Panel */}
      <SettingsPanel 
        matrixEnabled={matrixEnabled} 
        onMatrixToggle={setMatrixEnabled}
        particlesEnabled={particlesEnabled}
        onParticlesToggle={setParticlesEnabled}
        auroraEnabled={auroraEnabled}
        onAuroraToggle={setAuroraEnabled}
        soundEnabled={soundEnabled}
        onSoundToggle={setSoundEnabled}
        playSound={playSound}
      />

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section with 3D Block */}
        <header className="text-center mb-12 md:mb-16 animate-fade-in">
          {/* 3D Minecraft Block */}
          <Suspense fallback={<div className="h-[220px] md:h-[280px]" />}>
            <MinecraftBlock />
          </Suspense>

          <div className="inline-block mb-4 -mt-2">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tighter animate-title-reveal">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%]">
                Minecraft Hub
              </span>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-foreground/60 font-semibold mb-2 animate-fade-in-up animation-delay-200 tracking-wide uppercase">
            Official Nextup Studio
          </p>
          <p className="text-sm md:text-base text-foreground/40 max-w-lg mx-auto leading-relaxed animate-fade-in-up animation-delay-400 font-medium">
            Choose Your Edition · Free Downloads · Custom Worlds · Mods & Shaders
          </p>
          
          {/* Animated underline */}
          <div className="mt-5 flex justify-center gap-2 animate-fade-in-up animation-delay-600">
            <div className="h-1 w-12 bg-primary/60 rounded-full animate-pulse-width" />
            <div className="h-1 w-8 bg-accent/60 rounded-full animate-pulse-width animation-delay-200" />
            <div className="h-1 w-4 bg-secondary/60 rounded-full animate-pulse-width animation-delay-400" />
          </div>
        </header>

        {/* Edition Cards */}
        <section className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto mb-16" aria-label="Choose Minecraft Edition">
          <div className="animation-delay-300">
            <EditionCard
              title="Bedrock Edition"
              description="Cross-platform play on Android, iOS, Windows, Xbox, PlayStation, and Nintendo Switch."
              version="v1.21.x"
              variant="primary"
              onClick={handleBedrockClick}
              onHover={() => playSound("hover")}
            />
          </div>
          <div className="animation-delay-500">
            <EditionCard
              title="Java Edition"
              description="The classic PC experience with unlimited mods, custom servers, and community content."
              version="v1.21.x"
              variant="accent"
              onClick={handleJavaClick}
              onHover={() => playSound("hover")}
            />
          </div>
        </section>

        {/* YouTube Subscribe Section */}
        <section className="text-center mb-16 animate-fade-in-up animation-delay-700">
          <div className="inline-block glass-card rounded-3xl p-8 md:p-10 hover:scale-[1.02] transition-transform duration-500">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground/80 mb-6 flex items-center justify-center gap-2">
              <span className="animate-bounce-subtle">🎮</span>
              Join Our Community
              <span className="animate-bounce-subtle animation-delay-200">🎮</span>
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
        <footer className="text-center text-foreground/40 text-sm animate-fade-in animation-delay-800" role="contentinfo">
          <div className="h-px w-48 bg-gradient-to-r from-transparent via-foreground/20 to-transparent mx-auto mb-6 animate-expand-width" />
          <p className="mb-2 hover:text-foreground/60 transition-colors">© 2025 Nextup Studio · All Rights Reserved</p>
          <p className="text-xs text-foreground/30">
            Minecraft Hub - Your source for Minecraft content
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
