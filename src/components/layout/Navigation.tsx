import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5',
        isMobileMenuOpen && 'bg-white'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/976fd8bd-8c22-4237-9751-2f1e53020e6a.png" 
                alt="Bemol Spaces" 
                className="h-10 md:h-12 transition-all duration-300"
              />
            </Link>
          </div>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-6">
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#spaces"
                  className={cn(
                    "text-gray-700 hover:text-bemol-blue transition-colors duration-300",
                    !isScrolled && "text-white hover:text-white/80"
                  )}
                >
                  Espaços
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#locations"
                  className={cn(
                    "text-gray-700 hover:text-bemol-blue transition-colors duration-300",
                    !isScrolled && "text-white hover:text-white/80"
                  )}
                >
                  Lojas
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#success-cases"
                  className={cn(
                    "text-gray-700 hover:text-bemol-blue transition-colors duration-300",
                    !isScrolled && "text-white hover:text-white/80"
                  )}
                >
                  Casos de Sucesso
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/auth/login">
                  <Button 
                    variant="outline" 
                    className={cn(
                      "border-2 mr-2",
                      !isScrolled 
                        ? "border-white text-white hover:bg-white hover:text-bemol-blue" 
                        : "border-bemol-blue text-bemol-blue hover:bg-bemol-blue hover:text-white"
                    )}
                  >
                    Login
                  </Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/auth/register">
                  <Button 
                    variant="default" 
                    className={cn(
                      "bg-bemol-blue hover:bg-bemol-lightblue transition-all duration-300",
                      !isScrolled && "bg-white text-bemol-blue hover:bg-white/90"
                    )}
                  >
                    Cadastre-se
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              className={cn(
                "text-gray-700",
                !isScrolled && !isMobileMenuOpen && "text-white"
              )}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md animate-in slide-in-from-top duration-300">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <a 
                href="#spaces" 
                className="text-gray-700 hover:text-bemol-blue transition-colors py-2 px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Espaços
              </a>
              <a 
                href="#locations" 
                className="text-gray-700 hover:text-bemol-blue transition-colors py-2 px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Lojas
              </a>
              <a 
                href="#success-cases" 
                className="text-gray-700 hover:text-bemol-blue transition-colors py-2 px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Casos de Sucesso
              </a>
              <Link 
                to="/auth/login"
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button 
                  variant="outline"
                  className="w-full border-2 border-bemol-blue text-bemol-blue hover:bg-bemol-blue hover:text-white"
                >
                  Login
                </Button>
              </Link>
              <Link 
                to="/auth/register"
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button 
                  className="w-full bg-bemol-blue hover:bg-bemol-lightblue"
                >
                  Cadastre-se
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
