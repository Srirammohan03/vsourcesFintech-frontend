import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "Our Services",
    path: "/",
    dropdown: [
      { name: "Abroad Education Loan", path: "/services/abroad-education-loan" },
      { name: "Domestic Education Loan", path: "/services/domestic-education-loan" },
      { name: "Forex Card", path: "/services/forex-card" },
      { name: "Travel Insurance", path: "/services/travel-insurance" },
      { name: "Sim Card", path: "/services/sim-card" },
      { name: "Credit Card", path: "/services/credit-card" },
      { name: "Health Insurance", path: "/services/health-insurance" },
      { name: "Refinancing", path: "/services/refinancing" },
      { name: "GIC", path: "/services/gic" },
      { name: "Block Account", path: "/services/block-account" },
      { name: "Bank Account", path: "/services/bank-account" },
    ],
  },
  { name: "Tools", path: "/tools" },
  { name: "Resources", path: "/resources" },
  {
    name: "Loans",
    path: "/loans",
    dropdown: [
      { name: "Avanse Education Loan", path: "/loans/avanse" },
      { name: "Incred Education Loan", path: "/loans/incred" },
      { name: "HDFC Credila Education Loan", path: "/loans/hdfc-credila" },
      { name: "Auxilo Education Loan", path: "/loans/auxilo" },
      { name: "ICICI Bank Education Loan", path: "/loans/icici" },
      { name: "Prodigy Finance Education Loan", path: "/loans/prodigy" },
      { name: "Education Loan Without Collateral", path: "/loans/without-collateral" },
      { name: "Education Loan Interest Rates", path: "/loans/interest-rates" },
    ],
  },
  { name: "Country", path: "/country" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0); // Add this line
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset menu on route change
  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const toggleDropdown = (itemName: string) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  // Path matching
  const isPathActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const isItemActive = (item: typeof navItems[number]) => {
    if (item.dropdown) {
      if (isPathActive(item.path)) return true;
      return item.dropdown.some((d) => isPathActive(d.path));
    }
    return isPathActive(item.path);
  };

  // Dynamic link classes
  const getLinkClass = (active: boolean) =>
    cn(
      "transition-colors px-1",
      active
        ? "text-red-600"
        : isScrolled
          ? "text-black hover:text-red-600"
          : "text-white hover:text-red-600"
    );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4",
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      )}
    >
      <div className="w-full max-w-[1400px] mx-auto px-4 flex justify-between items-center h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 relative z-20">
          <img
            alt="Vsource Logo"
            className="h-16 md:h-20 w-auto object-contain rounded-xl shadow-md"
            src="/assets/images/fintech-logo.png"
          />
          <div>
            <img
              src="/assets/images/20 years logo-01.png"
              alt="20 Years Logo"
              className="h-20 md:h-18 ml-3 w-auto object-contain drop-shadow-md"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {navItems.map((item) => {
            const active = isItemActive(item);

            return (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <div
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button className={cn("flex items-center space-x-1", getLinkClass(active))}>
                      <span>{item.name}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {/* Dropdown */}
                    <div
                      className={cn(
                        "absolute left-0 top-full mt-1 min-w-[250px] rounded-lg border bg-white p-2 shadow-lg transition-all duration-200 z-50",
                        openDropdown === item.name ? "opacity-100 visible" : "opacity-0 invisible"
                      )}
                    >
                      {item.dropdown.map((d) => {
                        const childActive = isPathActive(d.path);
                        return (
                          <Link
                            key={d.name}
                            to={d.path}
                            className={cn(
                              "block rounded-md px-3 py-2 text-sm ",
                              childActive
                                ? "text-red-600"
                                : "text-black hover:bg-gray-100 hover:text-red-600"
                            )}
                          >
                            {d.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <Link to={item.path} className={getLinkClass(active)}>
                    {item.name}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
        {/* Progress Bar */}
        {scrollProgress > 0 && (
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-200 z-30">
            <div
              className="h-[3px] bg-red-600 transition-all duration-75"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        )}
        {/* Mobile toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const active = isItemActive(item);
              return (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        className={cn(
                          "flex w-full items-center justify-between py-2 text-left transition-colors",
                          active ? "text-red-600" : "text-black hover:text-red-600"
                        )}
                        onClick={() => toggleDropdown(item.name)}
                      >
                        <span>{item.name}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openDropdown === item.name && "rotate-180"
                          )}
                        />
                      </button>

                      {openDropdown === item.name && (
                        <div className="pl-4 space-y-1">
                          {item.dropdown.map((d) => (
                            <Link
                              key={d.name}
                              to={d.path}
                              className={cn(
                                "block py-2 text-sm ",
                                isPathActive(d.path)
                                  ? "text-red-600"
                                  : "text-gray-700 hover:text-red-600"
                              )}
                              onClick={closeMenu}
                            >
                              {d.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={cn(
                        "block py-2 ",
                        active ? "text-red-600" : "text-black hover:text-red-600"
                      )}
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
