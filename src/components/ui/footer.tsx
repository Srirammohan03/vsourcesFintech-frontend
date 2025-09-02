import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-surface border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground font-bold text-lg">
                EL
              </div>
              <span className="font-bold text-xl text-foreground">EduLoan</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your trusted partner for education loans, scholarships, and study abroad guidance.
              Making dreams of international education accessible to everyone.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
              <li><Link to="/tools" className="text-muted-foreground hover:text-primary">Tools</Link></li>
              <li><Link to="/resources" className="text-muted-foreground hover:text-primary">Resources</Link></li>
              <li><Link to="/country" className="text-muted-foreground hover:text-primary">Countries</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services/abroad-education-loan" className="text-muted-foreground hover:text-primary">Education Loans</Link></li>
              <li><Link to="/services/travel-insurance" className="text-muted-foreground hover:text-primary">Travel Insurance</Link></li>
              <li><Link to="/services/forex-card" className="text-muted-foreground hover:text-primary">Forex Card</Link></li>
              <li><Link to="/services/health-insurance" className="text-muted-foreground hover:text-primary">Health Insurance</Link></li>
              <li><Link to="/services/refinancing" className="text-muted-foreground hover:text-primary">Refinancing</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">info@eduloan.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-muted-foreground">
                  123 Education Street,<br />
                  Learning City, LC 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 EduLoan. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link>
              <Link to="/cookies" className="text-muted-foreground hover:text-primary">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}