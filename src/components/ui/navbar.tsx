import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Calculator,
  Banknote,
  BarChart3,
  PiggyBank,
  TrendingUp,
  Coins,
  Globe,
  CloudSun,
  ClipboardList,
  GraduationCap,
  FileText,
  Luggage,
  ShieldCheck,
  Building2,
  Scale,
} from "lucide-react";
import path from "path";
const iconColors: Record<string, string> = {
  Banknote: "text-green-600",
  CreditCard: "text-blue-600",
  Scale: "text-purple-600",
  Building2: "text-gray-700",
  Coins: "text-yellow-600",
  ShieldCheck: "text-teal-600",
  Globe: "text-indigo-600",
  PiggyBank: "text-pink-600",
  Calculator: "text-orange-600",
  BarChart3: "text-sky-600",
  TrendingUp: "text-emerald-600",
  CloudSun: "text-amber-500",
  ClipboardList: "text-red-500",
  GraduationCap: "text-cyan-600",
  FileText: "text-gray-600",
  Luggage: "text-fuchsia-600",
};
const navItems = [
  {
    name: "Our Services",
    path: "/",
    dropdown: [
      {
        heading: "BANKING & LOANS",
        items: [
          { name: "Abroad Education Loan", path: "/services/abroad-education-loan", icon: Banknote },
          { name: "Credit Card", path: "/services/credit-card", icon: CreditCard },
          { name: "Block Account", path: "/services/block-account", icon: Scale },
          { name: "Bank Account", path: "/services/bank-account", icon: Building2 },
        ],
      },
      {
        heading: "TRAVEL & INSURANCE",
        items: [
          { name: "Forex Card", path: "/services/forex-card", icon: Coins },
          { name: "Travel Insurance", path: "/services/travel-insurance", icon: ShieldCheck },
          { name: "Sim Card", path: "/services/sim-card", icon: Globe },
          { name: "Health Insurance", path: "/services/health-insurance", icon: ShieldCheck },
          { name: "GIC", path: "/services/gic", icon: PiggyBank },
        ],
      },
    ],
  },
  {
    name: "Tools",
    path: "/tools",
    dropdown: [
      {
        heading: "LOAN TOOLS",
        items: [
          {name: "Loan Calculator", path: "/tools/loan-calculator", icon: Calculator },
          { name: "Interest Calculator", path: "/tools/interest-calculator", icon: Calculator },
          { name: "Loan Repayment Calculator", path: "/tools/loan-repayment-calculator", icon: PiggyBank },
          // { name: "Education Loan Eligibility Checker", path: "/tools/education-loan-eligibility-checker", icon: ClipboardList },
          { name: "Education Loan EMI Calculator", path: "/tools/education-loan-emi-calculator", icon: Calculator },
          // { name: "Bank Comparison Tool", path: "/tools/bank-comparison-tool", icon: Building2 },
        ],
      },
      {
        heading: "FINANCIAL PLANNING TOOLS",
        items: [
          { name: "Cost of Studying Abroad", path: "/tools/cost-of-studying-abroad", icon: Coins },
          { name: "Living Calculator", path: "/tools/living-calculator", icon: PiggyBank },
          { name: "ROI Calculator", path: "/tools/roi-calculator", icon: BarChart3 },
          { name: "Estimate Future Earnings", path: "/tools/estimate-future-earnings", icon: TrendingUp },
        ],
      },
      {
        heading: "UTILITIES TOOLS",
        items: [
          { name: "Time Zone Converter", path: "/tools/time-zone-converter", icon: Globe },
          { name: "Weather Abroad", path: "/tools/weather-abroad", icon: CloudSun },
          // { name: "Budget Calculator", path: "/tools/budget-calculator", icon: Calculator },
          { name: "Currency Converter", path: "/tools/currency-converter", icon: Coins },
        ],
      },
      {
        heading: "ACADEMIC TOOLS",
        items: [
          { name: "GPA Calculator", path: "/tools/gpa-calculator", icon: GraduationCap },
          { name: "SOP Generator", path: "/tools/sop-generator", icon: FileText },
        ],
      },
      {
        heading: "TRAVEL & INSURANCE TOOLS",
        items: [
          { name: "Student Packing List", path: "/tools/packing-list", icon: Luggage },
          { name: "Health Insurance Compare", path: "/tools/health-insurance-compare", icon: ShieldCheck },
        ],
      },
    ],
  },
  {
    name: "Our Partners",
    path: "/our-partners",
    dropdown: [
      {
        heading: "OUR LENDING PARTNERS",
        items: [
          { name: "Credila", path: "/our-partners/credila", icon: Banknote },
          { name: "Auxilo", path: "/our-partners/auxilo", icon: Banknote },
          { name: "Avanse", path: "/our-partners/avanse", icon: Banknote },
          { name: "Incred Finance", path: "/our-partners/incred-finance", icon: Banknote },
          { name: "MPOWER Financing", path: "/our-partners/mpower-financing", icon: Banknote },
          { name: "Prodigy Finance", path: "/our-partners/prodigy-finance", icon: Banknote },
          { name: "IDFC FIRST Bank", path: "/our-partners/idfc-first-bank", icon: Banknote },
          { name: "Axis Bank", path: "/our-partners/axis-bank", icon: Banknote },
        ],
      },
      {
        heading: "IMPORTANT LOAN TOOLS",
        items: [
          { name: "Compare Loan Offers", path: "/our-partners/compare-loan-offers", icon: Scale },
          { name: "Bank Comparison Tool", path: "/our-partners/bank-comparison-tool", icon: Building2 },
        ],
      },
    ],
  },
  { name: "Blog", path: "/blog" },
  { name: "Country", path: "/country" },
  { name: "Contact", path: "/contact" },
];

// ------------------ NAVBAR COMPONENT ------------------
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
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

  const isPathActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const isItemActive = (item: typeof navItems[number]) => {
    if (item.dropdown) {
      if (isPathActive(item.path)) return true;
      return item.dropdown.some((section) =>
        section.items.some((child) => isPathActive(child.path))
      );
    }
    return isPathActive(item.path);
  };

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
            className="h-16 md:h-20 w-auto object-contain rounded-xl "
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
                        "absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[720px] max-w-[90vw] grid grid-cols-2 gap-6 p-6 rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-200 z-50",
                        openDropdown === item.name ? "opacity-100 visible" : "opacity-0 invisible"
                      )}
                    >
                      {item.dropdown.map((section) => (
                        <div key={section.heading}>
                          <h4 className="mb-2 text-xs font-semibold uppercase text-gray-500">
                            {section.heading}
                          </h4>
                          <div className="space-y-2">
                            {section.items.map((d) => {
                              const childActive = isPathActive(d.path);
                              const Icon = d.icon;
                              const iconColor = iconColors[Icon.displayName || Icon.name] || "text-gray-500";
                              return (
                                <Link
                                  key={d.name}
                                  to={d.path}
                                  className={cn(
                                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm",
                                    childActive
                                      ? "text-red-600"
                                      : "text-black hover:bg-gray-100 hover:text-red-600"
                                  )}
                                >
                                  <Icon className={cn("h-4 w-4", iconColor)} />
                                  {d.name}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
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
          className={cn(isScrolled ? "text-black" : "text-white", "md:hidden")}
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
                        <div className="pl-4 space-y-4">
                          {item.dropdown.map((section) => (
                            <div key={section.heading}>
                              <h4 className="mt-2 mb-1 text-xs font-semibold uppercase text-gray-500">
                                {section.heading}
                              </h4>
                              <div className="space-y-1">
                                {section.items.map((d) => {
                                  const Icon = d.icon;
                                  const iconColor = iconColors[Icon.displayName || Icon.name] || "text-gray-500";
                                  return (
                                    <Link
                                      key={d.name}
                                      to={d.path}
                                      className={cn(
                                        "flex items-center gap-2 py-2 text-sm",
                                        isPathActive(d.path)
                                          ? "text-red-600"
                                          : "text-gray-700 hover:text-red-600"
                                      )}
                                      onClick={closeMenu}
                                    >
                                      <Icon className={cn("h-4 w-4", iconColor)} />
                                      {d.name}
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className={cn(
                        "block py-2",
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
