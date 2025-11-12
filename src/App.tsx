import { useEffect, useState, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/layout";
import ContactBar from "./components/ContactBar";
import ScrollToTop from "./ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Navbar from "./components/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroSkeleton from "./components/HeroSkeleton";
import DelayedPopup from "./components/DelayedPopup";
import Footer from "./components/Footer";

const Home = lazy(() => import("./pages/Home"));
const Tools = lazy(() => import("./pages/Tools"));
const Contact = lazy(() => import("./pages/Contact"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const EducationLoan = lazy(() => import("./pages/EducationLoan"));
const AbroadEducation = lazy(
  () => import("./pages/ourServices/AbroadEducation")
);
const CreditCardComponent = lazy(
  () => import("./pages/ourServices/CreditCardComponent")
);
const BlockedAccount = lazy(() => import("./pages/ourServices/BlockedAccount"));
const BankAccount = lazy(() => import("./pages/ourServices/BankAccount"));
const HealthInasurance = lazy(
  () => import("./pages/ourServices/HealthInsurance")
);
const ForexCard = lazy(() => import("./pages/ourServices/ForexCard"));
const TravelInsurance = lazy(
  () => import("./pages/ourServices/TravelInsurance")
);
const SimCard = lazy(() => import("./pages/ourServices/SimCard"));
const GIC = lazy(() => import("./pages/ourServices/GIC"));

const BankComparisonTool = lazy(
  () => import("./pages/ourpartner/BankComparisonTool")
);
const CompareLoanOffers = lazy(
  () => import("./pages/ourpartner/CompareLoanOffers")
);
const BankPage = lazy(() => import("./pages/ourpartner/BankPage"));

const LoanCalculator = lazy(() => import("./pages/tools/LoanCalculator"));
const CurrencyConverter = lazy(() => import("./pages/tools/CurrencyConverter"));
const ExpenseCalculator = lazy(() => import("./pages/tools/ExpenseCalculator"));
const SavingsCalculator = lazy(() => import("./pages/tools/SavingsCalculator"));
const InterestCalculator = lazy(
  () => import("./pages/tools/InterestCalculator")
);
const LoanRepaymentCalculator = lazy(
  () => import("./pages/tools/LoanRepaymentCalculator")
);
const EducationLoanEmiCalculator = lazy(
  () => import("./pages/tools/EducationLoanEmiCalculator")
);
const TimeZoneConverter = lazy(() => import("./pages/tools/TimeZoneConverter"));
const WeatherAbroad = lazy(() => import("./pages/tools/WeatherAbroad"));
const PackingList = lazy(() => import("./pages/tools/PackingList"));
const SOPGenerator = lazy(() => import("./pages/tools/SOPGenerator"));
const CostOfStudyAbroadPage = lazy(
  () => import("./pages/tools/CostOfStudyAbroadPage")
);
const HealthInsuranceComparePage = lazy(
  () => import("./pages/tools/HealthInsuranceComparePage")
);
const CompareCostOfLivingPage = lazy(
  () => import("./pages/tools/CompareCostOfLivingPage")
);
const ROICalculator = lazy(() => import("./pages/tools/ROICalculator"));
const EstimateFutureEarnings = lazy(
  () => import("./pages/tools/EstimateFutureEarnings")
);
const GpaCalculatorPage = lazy(() => import("./pages/tools/GpaCalculatorPage"));
const View360 = lazy(() => import("./pages/View360"));
const GoVirtual = lazy(() => import("./services/GoVirtual"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchInterval: false,
      staleTime: 10 * 60 * 1000,
    },
  },
});

const AppContent = () => {
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();
  const [showFormIcon, setShowFormIcon] = useState(false);
  const isGoVirtualPage = location.pathname === "/meeting";

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollTop / docHeight >= 0.2) {
        setShowForm(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    AOS.init({ once: false, mirror: true });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (
        scrollTop / docHeight >= 0.2 &&
        !localStorage.getItem("vsource_form_submitted")
      ) {
        setShowForm(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <Layout>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        {!isGoVirtualPage && <Navbar />}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/view-360" element={<View360 />} />
            <Route
              path="/services/abroad-education-loan"
              element={<AbroadEducation />}
            />
            <Route
              path="/services/credit-card"
              element={<CreditCardComponent />}
            />
            <Route
              path="/services/block-account"
              element={<BlockedAccount />}
            />
            <Route path="/services/bank-account" element={<BankAccount />} />
            <Route
              path="/services/health-insurance"
              element={<HealthInasurance />}
            />
            <Route path="/services/forex-card" element={<ForexCard />} />
            <Route
              path="/services/travel-insurance"
              element={<TravelInsurance />}
            />
            <Route path="/services/sim-card" element={<SimCard />} />
            <Route path="/services/gic" element={<GIC />} />

            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/loan-calculator" element={<LoanCalculator />} />
            <Route
              path="/tools/expense-calculator"
              element={<ExpenseCalculator />}
            />
            <Route
              path="/tools/currency-converter"
              element={<CurrencyConverter />}
            />
            <Route
              path="/tools/savings-calculator"
              element={<SavingsCalculator />}
            />
            <Route
              path="/tools/interest-calculator"
              element={<InterestCalculator />}
            />
            <Route
              path="/tools/loan-repayment-calculator"
              element={<LoanRepaymentCalculator />}
            />
            <Route
              path="/tools/education-loan-emi-calculator"
              element={<EducationLoanEmiCalculator />}
            />
            <Route
              path="/tools/bank-comparison-tool"
              element={<BankComparisonTool />}
            />
            <Route
              path="/tools/time-zone-converter"
              element={<TimeZoneConverter />}
            />
            <Route path="/tools/weather-abroad" element={<WeatherAbroad />} />
            <Route
              path="/tools/gpa-calculator"
              element={<GpaCalculatorPage />}
            />
            <Route path="/tools/packing-list" element={<PackingList />} />
            <Route path="/tools/sop-generator" element={<SOPGenerator />} />
            <Route
              path="/tools/cost-of-studying-abroad"
              element={<CostOfStudyAbroadPage />}
            />
            <Route
              path="/tools/health-insurance-compare"
              element={<HealthInsuranceComparePage />}
            />
            <Route
              path="/tools/living-calculator"
              element={<CompareCostOfLivingPage />}
            />
            <Route path="/tools/roi-calculator" element={<ROICalculator />} />
            <Route
              path="/tools/estimate-future-earnings"
              element={<EstimateFutureEarnings />}
            />
            <Route path="/our-partners/:slug" element={<BankPage />} />
            <Route
              path="/our-partners/compare-loan-offers"
              element={<CompareLoanOffers />}
            />
            <Route
              path="/our-partners/bank-comparison-tool"
              element={<BankComparisonTool />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/education-loan" element={<EducationLoan />} />
            <Route path="/meeting" element={<GoVirtual />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {!isGoVirtualPage && <ContactBar />}
        {!isGoVirtualPage && <Footer />}

        <ScrollToTopButton
          showFormIcon={showFormIcon}
          onFormIconClick={() => {
            setShowForm(true);
            setShowFormIcon(false);
          }}
        />

        {showForm && (
          <DelayedPopup
            onMinimize={() => {
              setShowForm(false);
              setShowFormIcon(true);
            }}
          />
        )}
      </div>
    </Layout>
  );
};

const App = () => {
  useEffect(() => {
    AOS.init({ once: false, mirror: true });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<HeroSkeleton />}>
            <AppContent />
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
