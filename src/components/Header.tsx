import { Button } from "@/components/ui/button";
import { Menu, X, Users, Award } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full header-footer-bg backdrop-blur-xl shadow-elegant border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:py-5">
        {/* Logo Section with enhanced styling */}
        <div className="flex items-center space-x-4">
          <div>
            <img src="IIITD.png" alt="IIIT Delhi Logo" className="h-12 transition-transform hover:scale-110 duration-300" />
          </div>
          <div className="relative">
            <img 
              src="student_council.jpg" 
              alt="Student Council Logo" 
              className="h-12 rounded-full transition-transform hover:scale-110 duration-300" 
            />
          </div>
          <div className="hidden md:block">
            <h1 className="text-xl text-primary font-display font-bold">
              Student Council
            </h1>
            <p className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
              IIIT Delhi
            </p>
          </div>
        </div>

        {/* Desktop Navigation with enhanced styling */}
        <nav className="hidden xl:flex items-center space-x-8 font-medium text-sm">
          <Link 
            to="/" 
            className="nav-link text-foreground/80 hover:text-primary transition-all duration-300 font-sans"
          >
            Home
          </Link>
          <Link 
            to="/representatives" 
            className="nav-link text-foreground/80 hover:text-primary transition-all duration-300 font-sans"
          >
            Representatives
          </Link>
          <Link 
            to="/clubs" 
            className="nav-link text-foreground/80 hover:text-primary transition-all duration-300 font-sans"
          >
            Clubs
          </Link>
          <Link 
            to="/hostel" 
            className="nav-link text-foreground/80 hover:text-primary transition-all duration-300 font-sans"
          >
            Hostel
          </Link>
          <Link 
            to="/important-contacts" 
            className="nav-link text-foreground/80 hover:text-primary transition-all duration-300 font-sans"
          >
            Contacts
          </Link>
          <Link 
            to="/penalties" 
            className="nav-link text-foreground/80 hover:text-primary transition-all duration-300 font-sans"
          >
            Penalties
          </Link>
          <Link 
            to="/meeting-minutes" 
            className="nav-link text-foreground/80 hover:text-primary transition-all duration-300 font-sans"
          >
            Minutes
          </Link>
        </nav>

        {/* Action Buttons (Desktop) with enhanced styling */}
        <div className="hidden xl:flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-primary/50 text-foreground hover:border-primary hover:bg-primary/20 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25" 
            onClick={() => navigate("/about")}
          >
            <Award className="h-4 w-4 mr-2" />
            About Council
          </Button>
        </div>

        {/* Mobile Menu Toggle with enhanced styling */}
        <Button
          variant="ghost"
          size="sm"
          className="xl:hidden hover:bg-primary/20 transition-all duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Dropdown Menu with enhanced styling */}
      {isMenuOpen && (
        <div className="xl:hidden header-footer-bg backdrop-blur-xl border-t border-border/50">
          <div className="flex flex-col items-start space-y-1 p-6">
            <Link 
              to="/" 
              className="w-full py-3 text-lg font-medium text-foreground/80 hover:text-primary transition-all duration-300" 
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/representatives" 
              className="w-full py-3 text-lg font-medium text-foreground/80 hover:text-primary transition-all duration-300" 
              onClick={() => setIsMenuOpen(false)}
            >
              Representatives
            </Link>
            <Link 
              to="/clubs" 
              className="w-full py-3 text-lg font-medium text-foreground/80 hover:text-primary transition-all duration-300" 
              onClick={() => setIsMenuOpen(false)}
            >
              Clubs
            </Link>
            <Link 
              to="/hostel" 
              className="w-full py-3 text-lg font-medium text-foreground/80 hover:text-primary transition-all duration-300" 
              onClick={() => setIsMenuOpen(false)}
            >
              Hostel
            </Link>
            <Link 
              to="/important-contacts" 
              className="w-full py-3 text-lg font-medium text-foreground/80 hover:text-primary transition-all duration-300" 
              onClick={() => setIsMenuOpen(false)}
            >
              Important Contacts
            </Link>
            <Link 
              to="/penalties" 
              className="w-full py-3 text-lg font-medium text-foreground/80 hover:text-primary transition-all duration-300" 
              onClick={() => setIsMenuOpen(false)}
            >
              Penalties
            </Link>
            <Link 
              to="/meeting-minutes" 
              className="w-full py-3 text-lg font-medium text-foreground/80 hover:text-primary transition-all duration-300" 
              onClick={() => setIsMenuOpen(false)}
            >
              Meeting Minutes
            </Link>

            <div className="pt-4 w-full">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-primary/50 hover:border-primary hover:bg-primary/20 transition-all duration-300" 
                onClick={() => { navigate("/about"); setIsMenuOpen(false); }}
              >
                <Award className="h-4 w-4 mr-2" /> 
                About Council
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
