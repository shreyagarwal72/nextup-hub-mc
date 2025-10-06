import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Floating Orbs Background */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-primary/20 blur-3xl floating-orb" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-primary/15 blur-3xl floating-orb" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-1/4 w-28 h-28 rounded-full bg-primary/20 blur-3xl floating-orb" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-20 right-1/3 w-20 h-20 rounded-full bg-primary/25 blur-3xl floating-orb" style={{ animationDelay: '6s' }} />
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            Minecraft Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your edition and start your adventure
          </p>
        </div>

        {/* Edition Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Bedrock Edition Card */}
          <Card className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 animate-scale-in">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl font-bold text-primary mb-2">
                Bedrock Edition
              </CardTitle>
              <CardDescription className="text-base text-foreground/70">
                Play the cross-platform Minecraft experience with friends across devices.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pt-2">
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
              >
                Enter
              </Button>
            </CardContent>
          </Card>

          {/* Java Edition Card */}
          <Card className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-3xl font-bold text-primary mb-2">
                Java Edition
              </CardTitle>
              <CardDescription className="text-base text-foreground/70">
                Enjoy the classic PC Minecraft experience with mods and servers.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pt-2">
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
              >
                Enter
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="text-center mt-20 text-muted-foreground text-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
          © 2025 Nextup Studio · All Rights Reserved
        </footer>
      </div>
    </div>
  );
};

export default Index;
