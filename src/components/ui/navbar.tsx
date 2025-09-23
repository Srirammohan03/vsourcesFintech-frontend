import React, { useEffect, useState, useRef } from "react";
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
  ClipboardList,
  GraduationCap,
  FileText,
  Luggage,
  ShieldCheck,
  Building2,
  Scale,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { BankLayoutProps } from "@/components/layout/BankLayout";
import axios from "axios";

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

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;
type SectionItem = { name: string; path: string; icon: IconType };
type Section = { heading: string; items: SectionItem[] };

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

type NavNode =
  | { type: "link"; name: string; path: string }
  | { type: "external"; name: string; href: string }
  | { type: "dropdown"; name: string; sections: Section[] };

const NAV_STRUCTURE = (banks: BankLayoutProps[]): NavNode[] => [
  { type: "link", name: "Home", path: "/" },
  { type: "link", name: "About", path: "/about-us" },
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
  {
    type: "external",
    name: "360",
    href: "https://vsourceoverseas.com/360View/",
  },
  { type: "link", name: "Gallery", path: "/gallery" },
  { type: "link", name: "Branches", path: "/contact" },
];

export const fetchBanks = async (): Promise<BankLayoutProps[]> => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_CMS_GLOBALURL
    }/api/our-patners?populate[background_image][fields][0]=url&populate[bankImage][fields][0]=url&populate[trustedBy]=true&populate[documents]=true&populate[eligibility]=true`
  );
  return data.data;
};

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const ddRef = useRef<HTMLDivElement | null>(null);

  const { data: banks = [], isLoading } = useQuery<BankLayoutProps[]>({
    queryKey: ["bank"],
    queryFn: fetchBanks,
  });

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 10);
      const top = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (top / docH) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
    setOpenMobileDropdown(null);
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

  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      const prev = body.style.overflow;
      body.style.overflow = "hidden";
      return () => {
        body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isPathActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const isDropdownActive = (sections: Section[]) =>
    sections.some((sec) => sec.items.some((it) => isPathActive(it.path)));

  const getLinkClass = (active: boolean) =>
    cn(
      "font-medium transition-colors px-1",
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
        <Link to="/" className="flex items-center gap-2 relative z-20">
          <img
            alt="Vsource Logo"
            className="h-16 md:h-20 w-auto object-contain rounded-xl"
            src="/assets/images/fintech-logo.png"
          />
          <img
            alt="Vsource Logo"
            className="h-16 md:h-20 w-auto object-contain rounded-xl"
            src="/assets/images/20 years logo-01.png"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {NAV_STRUCTURE(banks).map((node) => {
            if (node.type === "link") {
              return (
                <Link
                  key={node.name}
                  to={node.path}
                  className={getLinkClass(isPathActive(node.path))}
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
                  className={getLinkClass(false)}
                >
                  {node.name}
                </a>
              );
            }
            const active = isDropdownActive(node.sections);
            return (
              <div
                key={node.name}
                className="relative group"
                ref={ddRef}
                onMouseEnter={() => setOpenDropdown(node.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className={cn(
                    "flex items-center space-x-1",
                    getLinkClass(active)
                  )}
                  onClick={() =>
                    setOpenDropdown((v) => (v === node.name ? null : node.name))
                  }
                  type="button"
                >
                  <span>{node.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[720px] max-w-[90vw] grid grid-cols-2 gap-6 p-6 rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-200 z-50",
                    openDropdown === node.name
                      ? "opacity-100 visible"
                      : "opacity-0 invisible"
                  )}
                >
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
                          {section.items.map((d) => {
                            const Icon = d.icon;
                            const iconColor =
                              iconColors[Icon.displayName || Icon.name] ||
                              "text-gray-500";
                            return (
                              <Link
                                key={d.name}
                                to={d.path}
                                className={cn(
                                  "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm",
                                  isPathActive(d.path)
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
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </nav>
        {scrollProgress > 0 && (
          <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gray-200 z-30">
            <div
              className="h-[3px] bg-red-600 transition-all duration-75"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        )}

        <button
          className={cn(isScrolled ? "text-black" : "text-white", "md:hidden")}
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[60] md:hidden bg-white flex flex-col"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full border-b">
            <div className="w-full max-w-[1400px] mx-auto px-4 h-20 flex items-center justify-between">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3"
              >
                <img
                  src="/assets/images/fintech-logo.png"
                  alt="Vsource"
                  className="h-16 md:h-20 w-auto object-contain rounded-xl shadow-md"
                />
                <img
                  src="/assets/images/20 years logo-01.png"
                  alt="20 Years"
                  className="h-12 w-auto object-contain"
                />
              </Link>
              <button
                aria-label="Close menu"
                className="text-gray-800 hover:text-red-600"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain">
            <div className="w-full max-w-[1400px] mx-auto px-4 py-4 space-y-3">
              {NAV_STRUCTURE(banks).map((node) => {
                if (node.type === "link") {
                  return (
                    <Link
                      key={node.name}
                      to={node.path}
                      className={cn(
                        "block py-2 text-lg font-medium",
                        isPathActive(node.path)
                          ? "text-red-600"
                          : "text-gray-800 hover:text-red-600"
                      )}
                      onClick={() => setIsOpen(false)}
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
                      className="block py-2 text-lg font-medium text-gray-800 hover:text-red-600"
                      onClick={() => setIsOpen(false)}
                    >
                      {node.name}
                    </a>
                  );
                }
                const open = openMobileDropdown === node.name;
                return (
                  <div
                    key={node.name}
                    className="rounded-2xl border border-gray-200"
                  >
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-4 py-3 font-semibold text-gray-900"
                      onClick={() =>
                        setOpenMobileDropdown(open ? null : node.name)
                      }
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
                        <div className="px-4 pb-4 space-y-4">
                          {isLoading ? (
                            <div className="text-center text-gray-500">
                              Loading partners...
                            </div>
                          ) : (
                            node.sections.map((section) => (
                              <div key={section.heading}>
                                <h4 className="mt-2 mb-1 text-xs font-semibold uppercase text-gray-500">
                                  {section.heading}
                                </h4>
                                <div className="space-y-1">
                                  {section.items.map((d) => {
                                    const Icon = d.icon;
                                    const iconColor =
                                      iconColors[
                                        Icon.displayName || Icon.name
                                      ] || "text-gray-500";
                                    return (
                                      <Link
                                        key={d.name}
                                        to={d.path}
                                        className={cn(
                                          "flex items-center gap-2 py-2 text-sm",
                                          isPathActive(d.path)
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
                                        {d.name}
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
              <div className="h-10" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
