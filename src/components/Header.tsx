import { Button } from "@/components/ui/button";
import { Menu, X, FileText, Users, Calendar, Settings } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            {/* Placeholder for IIITD Logo */}
            <div className="h-10 w-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
              <span className="text-accent font-bold text-sm">IIITD</span>
            </div>
            
            {/* Placeholder for Student Council Logo */}
            <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-foreground">Student Council</h1>
              <p className="text-xs text-muted-foreground">IIIT Delhi</p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#home" className="text-sm font-medium hover:text-accent transition-colors">
            Home
          </a>
          <a href="#events" className="text-sm font-medium hover:text-accent transition-colors">
            Events
          </a>
          <a href="#portal" className="text-sm font-medium hover:text-accent transition-colors">
            Portal
          </a>
          <a href="#about" className="text-sm font-medium hover:text-accent transition-colors">
            About
          </a>
          <a href="#contact" className="text-sm font-medium hover:text-accent transition-colors">
            Contact
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <FileText className="h-4 w-4 mr-2" />
            Submit Proposal
          </Button>
          <Button size="sm" className="hidden md:flex">
            <Calendar className="h-4 w-4 mr-2" />
            View Events
          </Button>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 space-y-3">
            <a href="#home" className="block py-2 text-sm font-medium hover:text-accent transition-colors">
              Home
            </a>
            <a href="#events" className="block py-2 text-sm font-medium hover:text-accent transition-colors">
              Events
            </a>
            <a href="#portal" className="block py-2 text-sm font-medium hover:text-accent transition-colors">
              Portal
            </a>
            <a href="#about" className="block py-2 text-sm font-medium hover:text-accent transition-colors">
              About
            </a>
            <a href="#contact" className="block py-2 text-sm font-medium hover:text-accent transition-colors">
              Contact
            </a>
            <div className="pt-3 space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Submit Proposal
              </Button>
              <Button size="sm" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                View Events
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};