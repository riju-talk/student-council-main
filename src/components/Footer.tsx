import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              {/* Placeholder for logos */}
              <div className="h-10 w-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                <span className="text-accent font-bold text-sm">IIITD</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Student Council</h3>
                <p className="text-sm text-muted-foreground">IIIT Delhi</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Empowering student initiatives and fostering academic excellence through 
              streamlined event management and collaborative decision-making.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#events" className="text-muted-foreground hover:text-accent transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#portal" className="text-muted-foreground hover:text-accent transition-colors">
                  Portal
                </a>
              </li>
              <li>
                <a href="#guidelines" className="text-muted-foreground hover:text-accent transition-colors">
                  Guidelines
                </a>
              </li>
              <li>
                <a href="#resources" className="text-muted-foreground hover:text-accent transition-colors">
                  Resources
                </a>
              </li>
              <li>
                <a href="#help" className="text-muted-foreground hover:text-accent transition-colors">
                  Help & Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">council@iiitd.ac.in</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">+91 11 2690 7400</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Okhla Industrial Estate, Phase III<br />
                  New Delhi - 110020
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © 2024 IIIT Delhi Student Council. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#privacy" className="text-muted-foreground hover:text-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="text-muted-foreground hover:text-accent transition-colors">
              Terms of Service
            </a>
            <a href="#accessibility" className="text-muted-foreground hover:text-accent transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};