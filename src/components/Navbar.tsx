import { Button } from "@/components/ui/button";

const Navbar = () => {
  const menuItems = [
    { name: "Home", href: "#" },
    { name: "Worlds", href: "#" },
    { name: "Addons", href: "#" },
    { name: "Shaders", href: "#" },
    { name: "Patch Downloads", href: "#" },
    { name: "Downloads", href: "#" },
    { name: "FAQ", href: "#" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
            Nextup Studio
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground/70 hover:text-primary transition-colors duration-200 text-sm font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <Button className="hidden lg:block bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
            Get Started
          </Button>

          {/* Mobile Menu Button */}
          <Button variant="ghost" className="lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
