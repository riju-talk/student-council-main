import { Button } from "@/components/ui/button";
import { Menu, X, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur shadow-sm border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img src="IIITD.png" alt="IIIT Delhi Logo" className="h-10" />
          <img src="student_council.jpg" alt="Student Council Logo" className="h-10 rounded-full" />
          <div className="hidden md:block">
            <h1 className="text-lg font-bold text-primary">Student Council</h1>
            <p className="text-xs text-muted-foreground">IIIT Delhi</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center space-x-6 font-medium text-sm">
          <Link to="/" className="hover:text-accent transition">Home</Link>
          <Link to="/representatives" className="hover:text-accent transition">Representatives</Link>
          <Link to="/clubs" className="hover:text-accent transition">Clubs</Link>
          <Link to="/hostel" className="hover:text-accent transition">Hostel</Link>
          <Link to="/important-contacts" className="hover:text-accent transition">Contacts</Link>
          <Link to="/penalties" className="hover:text-accent transition">Penalties</Link>
          <Link to="/meeting-minutes" className="hover:text-accent transition">Meeting Minutes</Link>
        </nav>

        {/* Action Buttons (Desktop) */}
        <div className="hidden xl:flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={() => navigate("/about")}>
            <Users className="h-4 w-4 mr-1" />
            About Council
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="xl:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="hidden xl:flex items-center space-x-6 font-medium text-sm">
          <div className="flex flex-col items-start space-y-4 p-6">
            <Link to="/" className="w-full py-2 text-lg font-medium hover:text-accent" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/representatives" className="w-full py-2 text-lg font-medium hover:text-accent" onClick={() => setIsMenuOpen(false)}>Representatives</Link>
            <Link to="/clubs" className="w-full py-2 text-lg font-medium hover:text-accent" onClick={() => setIsMenuOpen(false)}>Clubs</Link>
            <Link to="/hostel" className="w-full py-2 text-lg font-medium hover:text-accent" onClick={() => setIsMenuOpen(false)}>Hostel</Link>
            <Link to="/important-contacts" className="w-full py-2 text-lg font-medium hover:text-accent" onClick={() => setIsMenuOpen(false)}>Important Contacts</Link>
            <Link to="/penalties" className="w-full py-2 text-lg font-medium hover:text-accent" onClick={() => setIsMenuOpen(false)}>Penalties</Link>
            <Link to="/meeting-minutes" className="w-full py-2 text-lg font-medium hover:text-accent" onClick={() => setIsMenuOpen(false)}>Meeting Minutes</Link>

            <div className="pt-4 w-full flex flex-col space-y-2">
              <Button variant="outline" size="sm" className="w-full" onClick={() => { navigate("/about"); setIsMenuOpen(false); }}>
                <Users className="h-4 w-4 mr-2" /> About Council
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
