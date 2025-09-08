import { Button } from "@/components/ui/button";
import { Menu, X, FileText, Users, Plus, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { EventProposalModal } from "./EventProposalModal";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            {/* Placeholder for IIITD Logo */}
            <div className="h-10 w-auto rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
              <img src="IIITD.png" alt="IIIT Delhi Logo" className="h-12 w-auto" />
            </div>
            
            {/* Placeholder for Student Council Logo */}
            <div className="h-10 w-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
              <img src="student_council.jpg" alt="Student Council Logo" className="h-10 w-10 rounded-full" />
            </div>
            
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-primary">Student Council</h1>
              <p className="text-xs text-accent">IIIT Delhi</p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-accent transition-all duration-200 hover:scale-105 story-link">
            Home
          </Link>
          <Link to="/representatives" className="text-sm font-medium hover:text-accent transition-all duration-200 hover:scale-105 story-link">
            Representatives
          </Link>
          <Link to="/clubs" className="text-sm font-medium hover:text-accent transition-all duration-200 hover:scale-105 story-link">
            Clubs
          </Link>
          <Link to="/hostel" className="text-sm font-medium hover:text-accent transition-all duration-200 hover:scale-105 story-link">
            Hostel
          </Link>
          <Link to="/important-contacts" className="text-sm font-medium hover:text-accent transition-all duration-200 hover:scale-105 story-link">
            Important Contacts
          </Link>
          <Link to="/penalties" className="text-sm font-medium hover:text-accent transition-all duration-200 hover:scale-105 story-link">
            Penalties
          </Link>
          <Link to="/meeting-minutes" className="text-sm font-medium hover:text-accent transition-all duration-200 hover:scale-105 story-link">
            Meeting Minutes
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <Button 
            variant="default" 
            size="sm" 
            className="hidden md:flex hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl bg-primary hover:bg-primary/90 hover:animate-none group"
            onClick={() => setIsEventModalOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2 group-hover:rotate-180 transition-transform duration-300" />
            Propose an Event
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:flex hover:scale-105 transition-all duration-200 border-accent hover:bg-accent/20 hover:border-accent/50 hover:text-white"
            onClick={() => navigate("/about")}
          >
            <Users className="h-4 w-4 mr-2" />
            About Council
          </Button>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden hover:bg-accent/20 hover:scale-110 transition-all duration-200"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-5 w-5 rotate-180 transition-transform duration-200" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-sm animate-fade-in">
          <div className="container py-4 space-y-3">
            <Link to="/" className="block py-2 text-sm font-medium hover:text-accent transition-all duration-200 hover:pl-2">
              Home
            </Link>
            <Link to="/representatives" className="block py-2 text-sm font-medium hover:text-accent transition-all duration-200 hover:pl-2">
              Representatives
            </Link>
            <Link to="/clubs" className="block py-2 text-sm font-medium hover:text-accent transition-all duration-200 hover:pl-2">
              Clubs
            </Link>
            <Link to="/hostel" className="block py-2 text-sm font-medium hover:text-accent transition-all duration-200 hover:pl-2">
              Hostel
            </Link>
            <Link to="/important-contacts" className="block py-2 text-sm font-medium hover:text-accent transition-all duration-200 hover:pl-2">
              Important Contacts
            </Link>
            <Link to="/meeting-minutes" className="block py-2 text-sm font-medium hover:text-accent transition-all duration-200 hover:pl-2">
              Meeting Minutes
            </Link>
            <div className="pt-3 space-y-2">
              <Button 
                variant="default" 
                size="sm" 
                className="w-full hover:scale-105 transition-all duration-200"
                onClick={() => setIsEventModalOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Propose an Event
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full hover:scale-105 transition-all duration-200 border-accent hover:bg-accent/20"
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate("/about");
                }}
              >
                <Users className="h-4 w-4 mr-2" />
                About Council
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <EventProposalModal 
        open={isEventModalOpen} 
        onOpenChange={setIsEventModalOpen} 
      />
    </header>
  );
};