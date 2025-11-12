import React, { useEffect, useState, useRef, memo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  CreditCard,
  Calculator,
  Banknote,
  BarChart3,
  PiggyBank,
  TrendingUp,
  Coins,
  Globe,
  CloudSun,
  GraduationCap,
  FileText,
  Luggage,
  ShieldCheck,
  Building2,
  Scale,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { BankLayoutProps, fetchBanks } from "@/lib/types/BankConfig";

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
  GraduationCap: "text-cyan-600",
  FileText: "text-gray-600",
  Luggage: "text-fuchsia-600",
};

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;
type SectionItem = { name: string; path: string; icon: IconType };
type Section = { heading: string; items: SectionItem[] };

type NavNode =
  | { type: "link"; name: string; path: string }
  | { type: "external"; name: string; href: string }
  | { type: "dropdown"; name: string; sections: Section[] };

const SERVICES_SECTIONS: Section[] = [
  {
    heading: "BANKING & LOANS",
    items: [
      {
        name: "Abroad Education Loan",
        path: "/services/abroad-education-loan",
        icon: Banknote,
      },
      { name: "Credit Card", path: "/services/credit-card", icon: CreditCard },
      { name: "Block Account", path: "/services/block-account", icon: Scale },
      { name: "Bank Account", path: "/services/bank-account", icon: Building2 },
    ],
  },
  {
    heading: "TRAVEL & INSURANCE",
    items: [
      { name: "Forex Card", path: "/services/forex-card", icon: Coins },
      {
        name: "Travel Insurance",
        path: "/services/travel-insurance",
        icon: ShieldCheck,
      },
      { name: "Sim Card", path: "/services/sim-card", icon: Globe },
      {
        name: "Health Insurance",
        path: "/services/health-insurance",
        icon: ShieldCheck,
      },
      { name: "GIC", path: "/services/gic", icon: PiggyBank },
    ],
  },
];

const TOOLS_SECTIONS: Section[] = [
  {
    heading: "LOAN TOOLS",
    items: [
      {
        name: "Loan Calculator",
        path: "/tools/loan-calculator",
        icon: Calculator,
      },
      {
        name: "Interest Calculator",
        path: "/tools/interest-calculator",
        icon: Calculator,
      },
      {
        name: "Loan Repayment Calculator",
        path: "/tools/loan-repayment-calculator",
        icon: PiggyBank,
      },
      {
        name: "Education Loan EMI Calculator",
        path: "/tools/education-loan-emi-calculator",
        icon: Calculator,
      },
      {
        name: "Bank Comparison Tool",
        path: "/tools/bank-comparison-tool",
        icon: Building2,
      },
    ],
  },
  {
    heading: "FINANCIAL PLANNING TOOLS",
    items: [
      {
        name: "Cost of Studying Abroad",
        path: "/tools/cost-of-studying-abroad",
        icon: Coins,
      },
      {
        name: "Living Calculator",
        path: "/tools/living-calculator",
        icon: PiggyBank,
      },
      {
        name: "ROI Calculator",
        path: "/tools/roi-calculator",
        icon: BarChart3,
      },
      {
        name: "Estimate Future Earnings",
        path: "/tools/estimate-future-earnings",
        icon: TrendingUp,
      },
    ],
  },
  {
    heading: "UTILITIES TOOLS",
    items: [
      {
        name: "Time Zone Converter",
        path: "/tools/time-zone-converter",
        icon: Globe,
      },
      { name: "Weather Abroad", path: "/tools/weather-abroad", icon: CloudSun },
      {
        name: "Currency Converter",
        path: "/tools/currency-converter",
        icon: Coins,
      },
    ],
  },
  {
    heading: "ACADEMIC TOOLS",
    items: [
      {
        name: "GPA Calculator",
        path: "/tools/gpa-calculator",
        icon: GraduationCap,
      },
      { name: "SOP Generator", path: "/tools/sop-generator", icon: FileText },
    ],
  },
  {
    heading: "TRAVEL & INSURANCE TOOLS",
    items: [
      {
        name: "Student Packing List",
        path: "/tools/packing-list",
        icon: Luggage,
      },
      {
        name: "Health Insurance Compare",
        path: "/tools/health-insurance-compare",
        icon: ShieldCheck,
      },
    ],
  },
];

const NAV_STRUCTURE = (banks: BankLayoutProps[]): NavNode[] => [
  { type: "link", name: "Home", path: "/" },
  { type: "link", name: "About Us", path: "/about-us" },
  { type: "dropdown", name: "Our Services", sections: SERVICES_SECTIONS },
  { type: "dropdown", name: "Tools", sections: TOOLS_SECTIONS },
  {
    type: "dropdown",
    name: "Our Partners",
    sections: [
      {
        heading: "OUR LENDING PARTNERS",
        items: banks.map((bank) => ({
          name: bank.title,
          path: `/our-partners/${bank?.slug}`,
          icon: Banknote,
        })),
      },
      {
        heading: "IMPORTANT LOAN TOOLS",
        items: [
          {
            name: "Compare Loan Offers",
            path: "/our-partners/compare-loan-offers",
            icon: Scale,
          },
          {
            name: "Bank Comparison Tool",
            path: "/our-partners/bank-comparison-tool",
            icon: Building2,
          },
        ],
      },
    ],
  },
  { type: "link", name: "360 View", path: "/view-360" },
  { type: "link", name: "Gallery", path: "/gallery" },
  { type: "link", name: "Branches", path: "/contact" },
];

function Navbar() {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // desktop
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null
  );
  const ddRef = useRef<HTMLDivElement | null>(null);

  const { data: banks = [], isLoading } = useQuery<BankLayoutProps[]>({
    queryKey: ["bank"],
    queryFn: fetchBanks,
  });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenMobileDropdown(null);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const isPathActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const linkColor = (path: string) =>
    isPathActive(path)
      ? "text-red-600"
      : isScrolled
      ? "text-gray-800"
      : "text-white";

  const dropdownActive = (sections: Section[]) =>
    sections.some((s) => s.items.some((it) => isPathActive(it.path)));

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-3",
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      )}
    >
      {/* Container – same sizing & spacing as your previous navbar */}
      <div className="w-full max-w-[1400px] mx-auto px-4 flex justify-between items-center h-20">
        {/* Logo (single set, no duplicates) */}
        <Link to="/" className="flex items-center gap-2 relative z-20">
          <img
            alt="Vsource Logo"
            className="h-16 md:h-20 w-auto object-contain rounded-xl"
            src="/assets/images/fintech-logo.webp"
          />
          <img
            src="https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_200,c_limit,dpr_auto/v1762706239/nav-badge20years_re4asz.webp"
            alt="20 Years Logo"
            className="h-20 md:h-18 ml-3 w-auto object-contain drop-shadow-md"
          />
        </Link>

        {/* Desktop Navigation – identical layout/behavior */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {NAV_STRUCTURE(banks).map((node) => {
            if (node.type === "link") {
              return (
                <Link
                  key={node.name}
                  to={node.path}
                  className={cn(
                    "font-medium transition-colors hover:text-red-600",
                    linkColor(node.path)
                  )}
                >
                  {node.name}
                </Link>
              );
            }

            if (node.type === "external") {
              return (
                <a
                  key={node.name}
                  href={node.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "font-medium transition-colors hover:text-red-600",
                    isScrolled ? "text-gray-800" : "text-white"
                  )}
                >
                  {node.name}
                </a>
              );
            }

            const active = dropdownActive(node.sections);
            return (
              <div
                key={node.name}
                className="relative"
                ref={ddRef}
                onMouseEnter={() => setOpenDropdown(node.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown((v) => (v === node.name ? null : node.name))
                  }
                  className={cn(
                    "flex items-center gap-1 font-medium transition-colors hover:text-red-600",
                    active
                      ? "text-red-600"
                      : isScrolled
                      ? "text-gray-800"
                      : "text-white"
                  )}
                >
                  {node.name}
                  <ChevronDown
                    size={16}
                    className={cn(
                      "transition-transform",
                      openDropdown === node.name ? "rotate-180" : ""
                    )}
                  />
                </button>

                {/* Dropdown panel – centered wide box, grid, smooth show/hide */}
                <div
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 mt-3 w-[720px] max-w-[90vw] rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-200",
                    openDropdown === node.name
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-1"
                  )}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 p-6">
                    {isLoading ? (
                      <div className="col-span-2 text-center text-gray-500">
                        Loading partners...
                      </div>
                    ) : (
                      node.sections.map((section) => (
                        <div key={section.heading}>
                          <h4 className="mb-2 text-xs font-semibold uppercase text-gray-500">
                            {section.heading}
                          </h4>
                          <div className="space-y-2">
                            {section.items.map((item) => {
                              const Icon = item.icon;
                              const iconColor =
                                iconColors[Icon.displayName || Icon.name] ||
                                "text-gray-500";
                              return (
                                <Link
                                  key={item.path + item.name}
                                  to={item.path}
                                  className="flex items-center gap-3 group rounded-md px-2 py-1.5 text-sm text-gray-800 hover:text-red-600 hover:bg-gray-50"
                                >
                                  <Icon className={cn("h-4 w-4", iconColor)} />
                                  <span className="group-hover:text-red-600 font-medium">
                                    {item.name}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Mobile Menu Button – same sizing/hover feel */}
        <button
          className={cn(
            "md:hidden relative z-20 flex items-center justify-center transition-all duration-300 ease-in-out rounded-md font-bold w-12 h-12",
            isOpen || isScrolled ? "text-black bg-white" : "text-black",
            "hover:bg-red-600 hover:text-white"
          )}
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X size={28} strokeWidth={3} />
          ) : (
            <Menu size={40} strokeWidth={4} />
          )}
        </button>
      </div>

      {/* Mobile Menu – full-screen white overlay with accordions (exact behavior) */}
      <div
        className={cn(
          "md:hidden fixed left-0 right-0 bg-white z-40 transition-all duration-300 ease-in-out",
          "top-[100px] h-[calc(100vh-80px)]", // 👈 below navbar
          "overflow-y-auto overscroll-contain touch-pan-y",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 py-4 space-y-4">
          {NAV_STRUCTURE(banks).map((node) => {
            if (node.type === "link") {
              return (
                <Link
                  key={node.name}
                  to={node.path}
                  className={cn(
                    "block text-lg font-medium py-2 transition-colors hover:text-red-600",
                    isPathActive(node.path) ? "text-red-600" : "text-gray-800"
                  )}
                >
                  {node.name}
                </Link>
              );
            }

            if (node.type === "external") {
              return (
                <a
                  key={node.name}
                  href={node.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-lg font-medium py-2 transition-colors hover:text-red-600 text-gray-800"
                >
                  {node.name}
                </a>
              );
            }

            const open = openMobileDropdown === node.name;
            return (
              <div
                key={node.name}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-4 py-3 font-semibold text-gray-800"
                  onClick={() => setOpenMobileDropdown(open ? null : node.name)}
                >
                  {node.name}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      open && "rotate-180"
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-in-out",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-3 space-y-3">
                      {isLoading ? (
                        <div className="text-center text-gray-500">
                          Loading partners...
                        </div>
                      ) : (
                        node.sections.map((section) => (
                          <div key={section.heading}>
                            <h4 className="mt-1 mb-2 text-xs font-semibold uppercase text-gray-500">
                              {section.heading}
                            </h4>
                            <div className="space-y-1">
                              {section.items.map((item) => {
                                const Icon = item.icon;
                                const iconColor =
                                  iconColors[Icon.displayName || Icon.name] ||
                                  "text-gray-500";
                                return (
                                  <Link
                                    key={item.path + item.name}
                                    to={item.path}
                                    className={cn(
                                      "flex items-center gap-3 py-1.5 text-sm",
                                      isPathActive(item.path)
                                        ? "text-red-600"
                                        : "text-gray-800 hover:text-red-600"
                                    )}
                                    onClick={() => {
                                      setIsOpen(false);
                                      setOpenMobileDropdown(null);
                                    }}
                                  >
                                    <Icon
                                      className={cn("h-4 w-4", iconColor)}
                                    />
                                    {item.name}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default memo(Navbar);
