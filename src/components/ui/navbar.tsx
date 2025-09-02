import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  {
    name: 'Our Services',
    path: '/',
    dropdown: [
      { name: 'Abroad Education Loan', path: '/services/abroad-education-loan' },
      { name: 'Domestic Education Loan', path: '/services/domestic-education-loan' },
      { name: 'Forex Card', path: '/services/forex-card' },
      { name: 'Travel Insurance', path: '/services/travel-insurance' },
      { name: 'Sim Card', path: '/services/sim-card' },
      { name: 'Credit Card', path: '/services/credit-card' },
      { name: 'Health Insurance', path: '/services/health-insurance' },
      { name: 'Refinancing', path: '/services/refinancing' },
      { name: 'GIC', path: '/services/gic' },
      { name: 'Block Account', path: '/services/block-account' },
      { name: 'Bank Account', path: '/services/bank-account' },
    ]
  },
  { name: 'Tools', path: '/tools' },
  { name: 'Resources', path: '/resources' },
  {
    name: 'Loans',
    path: '/loans',
    dropdown: [
      { name: 'Avanse Education Loan', path: '/loans/avanse' },
      { name: 'Incred Education Loan', path: '/loans/incred' },
      { name: 'HDFC Credila Education Loan', path: '/loans/hdfc-credila' },
      { name: 'Auxilo Education Loan', path: '/loans/auxilo' },
      { name: 'ICICI Bank Education Loan', path: '/loans/icici' },
      { name: 'Prodigy Finance Education Loan', path: '/loans/prodigy' },
      { name: 'Education Loan Without Collateral', path: '/loans/without-collateral' },
      { name: 'Education Loan Interest Rates', path: '/loans/interest-rates' },
    ]
  },
  { name: 'Country', path: '/country' },
  { name: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (itemName: string) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-all duration-300",
      isScrolled && "shadow-card"
    )}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground font-bold text-lg">
            EL
          </div>
          <span className="font-bold text-xl text-foreground">EduLoan</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              {item.dropdown ? (
                <button
                  className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors"
                  onMouseEnter={() => setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <span>{item.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              ) : (
                <Link
                  to={item.path}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              )}

              {/* Dropdown Menu */}
              {item.dropdown && (
                <div
                  className={cn(
                    "absolute left-0 top-full mt-1 w-64 rounded-lg border bg-popover p-2 shadow-lg transition-all duration-200",
                    openDropdown === item.name ? "opacity-100 visible" : "opacity-0 invisible"
                  )}
                  onMouseEnter={() => setOpenDropdown(item.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.dropdown.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.name}
                      to={dropdownItem.path}
                      className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {dropdownItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <Button asChild className="bg-gradient-primary hover:opacity-90">
            <Link to="/contact">Apply Now</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div>
                    <button
                      className="flex w-full items-center justify-between py-2 text-left text-foreground hover:text-primary"
                      onClick={() => toggleDropdown(item.name)}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform",
                        openDropdown === item.name && "rotate-180"
                      )} />
                    </button>
                    {openDropdown === item.name && (
                      <div className="pl-4 space-y-1">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.name}
                            to={dropdownItem.path}
                            className="block py-2 text-sm text-muted-foreground hover:text-primary"
                            onClick={closeMenu}
                          >
                            {dropdownItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className="block py-2 text-foreground hover:text-primary"
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Button asChild className="w-full bg-gradient-primary hover:opacity-90">
                <Link to="/contact" onClick={closeMenu}>Apply Now</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}