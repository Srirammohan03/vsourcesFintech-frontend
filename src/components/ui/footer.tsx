import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
const currentYear = new Date().getFullYear();
export function Footer() {
  return (
    <footer className="bg-[rgb(10,11,26)] text-white pt-6 pb-6">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-5">
            <p className="text-gray-400 mb-4">
              Your trusted educational consultancy with 20+ years of experience
              in university admissions, overseas education, work visas and
              educational loans.
            </p>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/vsourcembbsabroad"
                className="group"
              >
                <img
                  src="/assets/images/icons/fb.png"
                  alt="Facebook"
                  className="w-16 h-16 hover:scale-110 transition-transform duration-300"
                />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/vsource_mbbs_abroad/"
                className="group"
              >
                <img
                  src="/assets/images/icons/insta.png"
                  alt="Instagram"
                  className="w-16 h-16 hover:scale-110 transition-transform duration-300"
                />
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/channel/UCNVjrnqI9L873rkB-5_p4kA"
                className="group"
              >
                <img
                  src="/assets/images/icons/yt.png"
                  alt="YouTube"
                  className="w-16 h-16 hover:scale-110 transition-transform duration-300"
                />
              </a>

              {/* LinkedIn */}
              <a
                href="https://in.linkedin.com/company/vsource-company"
                className="group"
              >
                <img
                  src="/assets/images/icons/linked in.png"
                  alt="LinkedIn"
                  className="w-16 h-16 hover:scale-110 transition-transform duration-300"
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm ">
              {[
                { name: "Home", to: "/" },
                { name: "Tools", to: "/tools" },
                { name: "Resources", to: "/resources" },
                // { name: "Countries", to: "/country" },
                { name: "Contact", to: "/contact" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.to}
                    className="text-muted-foreground hover:text-primary  text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-5">
            <h3 className="text-xl font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              {[
                {
                  name: "Education Loans",
                  to: "/services/abroad-education-loan",
                },
                { name: "Travel Insurance", to: "/services/travel-insurance" },
                { name: "Forex Card", to: "/services/forex-card" },
                { name: "Health Insurance", to: "/services/health-insurance" },
                { name: "Refinancing", to: "/services/refinancing" },
              ].map((service, idx) => (
                <li key={idx}>
                  <Link
                    to={service.to}
                    className="text-muted-foreground hover:text-primary text-gray-400 hover:text-white transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary" />
                <span className="text-gray-400">+91 99126 11119</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-primary" />
                <span className="text-gray-400">
                  Support@vsourcefintech.com
                </span>
              </li>
              <li className="flex">
                <MapPin className="w-5 h-5 mr-3 text-primary shrink-0 mt-1" />
                <span className="text-gray-400">
                  Near Shashi Hospital, Metro pillar no-1519, Dilsukhnagar,
                  Hyderabad- 500060, Telangana.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 mt-6 text-center md:flex md:justify-between md:text-left">
          <p className="text-gray-400 mb-4 md:mb-0">
            © {currentYear}{" "}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault(); // Prevent the default behavior of the anchor tag
                window.location.reload(); // Reload the page
              }}
              className="text-white hover:underline"
            >
              Vsource FinTech
            </a>{" "}
            All rights reserved.
          </p>
          <div className="flex justify-center md:justify-end space-x-6">
            <Link
              to="https://vsourceadmissions.com/Privacy"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="https://vsourceadmissions.com/Terms"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
