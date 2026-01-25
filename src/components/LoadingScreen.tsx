import Lottie from "lottie-react";
import loadingAnimation from "@/assets/Loading.json";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 animate-gradient" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-float-delayed" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="w-48 h-48 glass-card rounded-3xl p-4 backdrop-blur-xl">
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
        
        <h2 className="text-2xl font-semibold text-foreground/80 tracking-wide">
          Loading...
        </h2>
        
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
