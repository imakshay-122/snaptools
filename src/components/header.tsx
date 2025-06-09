import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./ui/logo";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ThemeToggle } from "./theme-toggle";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Explore Tools", href: "/tools" },
  { label: "Features", href: "/features" },
  // { label: "About", href: "/about" },
  { label: "Documentation", href: "/documentation" },
  // { label: "Pricing", href: "/pricing" },
  { label: "Donate", href: "/donate" },
  { label: "Blog", href: "/blog" },
  { label: "Code Runner (Runr)", href: "https://runr.vercel.app/" },
];

const Header = () => {
  const isMobile = useMediaQuery("(max-width: 950px)");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  // const isBlogPage = location.pathname.startsWith('/blog');

  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleBackdropClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    // <header className="fixed top-0 z-[9999] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"></header>
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        
        {!isMobile && (
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Link 
                key={item.label}
                to={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    e.preventDefault();
                    const element = document.querySelector(item.href);
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {!isMobile && (
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="default" onClick={() => window.location.href = '/tools'}>Get Started</Button>
          </div>
        )}

        {isMobile && (
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu}
              className="relative z-50"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        )}

        {/* Mobile Menu Backdrop */}
        {isMobile && mobileMenuOpen && (
          <div 
            className="fixed inset-0 top-16 z-40 bg-background/90 backdrop-blur-md transition-opacity duration-300 shadow-lg"
            onClick={handleBackdropClick}
          />
        )}

        {/* Mobile Menu */}
        {isMobile && (
          <div 
            className={`fixed inset-0 top-16 z-50 bg-gradient-to-b from-background/105 to-background/108 backdrop-blur-md border-t border-border/40 transform transition-transform duration-300 ease-in-out shadow-xl ${
              mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <nav className="container flex flex-col gap-4 p-6 bg-gradient-to-b from-background/95 to-background h-[calc(100vh-4rem)]">
              {navItems.map((item) => (
                <Link 
                  key={item.label}
                  to={item.href}
                  className="text-lg font-medium py-2 transition-colors hover:text-primary active:scale-95"
                  onClick={(e) => {
                    if (item.href.startsWith('#')) {
                      e.preventDefault();
                      const element = document.querySelector(item.href);
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center gap-4 mt-4">
                <Button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.location.href = '/tools';
                  }}
                  className="w-full transition-transform active:scale-95"
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;