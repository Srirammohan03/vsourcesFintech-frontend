import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/layout";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import Resources from "./pages/Resources";
import Country from "./pages/Country";
import Contact from "./pages/Contact";
import LoanCalculator from "./pages/tools/LoanCalculator";
import NotFound from "./pages/NotFound";
// import PartnerDetails from "./components/layout/PartnerDetails";
import ContactBar from "./components/ContactBar";
import { Footer } from "./components/ui/footer";
import GoVirtual from "./services/GoVirtual";
import { Navbar } from "./components/ui/navbar";
import EducationLoan from "./pages/EducationLoan";
import ScrollToTop from "./ScrollToTop";

// Service pages
import AbroadEducation from "./pages/ourServices/AbroadEducation";
import CurrencyConverter from "./pages/tools/CurrencyConverter";
import ExpenseCalculator from "./pages/tools/ExpenseCalculator";
import SavingsCalculator from "./pages/tools/SavingsCalculator";
// ⚠️ You can later add imports for DomesticEducationLoan, ForexCard, etc.
import AOS from "aos";
import "aos/dist/aos.css";
import CredilaPage from "./pages/ourpartner/CredilaPage";
import Auxilopage from "./pages/ourpartner/Auxilopage";
import AvansePage from "./pages/ourpartner/AvansePage";
import { IncredFinancingPage } from "./pages/ourpartner/IncredFinancingPage";
import { MpowerFinancePage } from "./pages/ourpartner/MpowerFinancePage";
import { ProdigyFinancePage } from "./pages/ourpartner/ProdigyFinancePage";
import { IDFCpage } from "./pages/ourpartner/IDFCpage";
import AxisPage from "./pages/ourpartner/AxisPage";
import BankComparisonTool from "./pages/ourpartner/BankComparisonTool";
import CompareLoanOffers from "./pages/ourpartner/CompareLoanOffers";
import InterestCalculator from "./pages/tools/InterestCalculator";
import LoanRepaymentCalculator from "./pages/tools/LoanRepaymentCalculator";
import EducationLoanEmiCalculator from "./pages/tools/EducationLoanEmiCalculator";
import TimeZoneConverter from "./pages/tools/TimeZoneConverter";
import WeatherAbroad from "./pages/tools/WeatherAbroad";
import CreditCardComponent from "./pages/ourServices/CreditCardComponent";
import BlockedAccount from "./pages/ourServices/BlockedAccount";
import BankAccount from "./pages/ourServices/BankAccount";
import PackingList from "./pages/tools/PackingList";
import SOPGenerator from "./pages/tools/SOPGenerator";
import CostOfStudyAbroadPage from "./pages/tools/CostOfStudyAbroadPage";
import HealthInsuranceComparePage from "./pages/tools/HealthInsuranceComparePage";
import CompareCostOfLivingPage from "./pages/tools/CompareCostOfLivingPage";
import ROICalculator from "./pages/tools/ROICalculator";
import EstimateFutureEarnings from "./pages/tools/EstimateFutureEarnings";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import HealthInasurance from "./pages/ourServices/HealthInsurance";
import ForexCard from "./pages/ourServices/ForexCard";
import TravelInsurance from "./pages/ourServices/TravelInsurance";
import GpaCalculatorPage from "./pages/tools/GpaCalculatorPage";
import SimCard from "./pages/ourServices/SimCard";
import GIC from "./pages/ourServices/GIC";
import ScrollToTopButton from "./components/ScrollToTopButton";
import DelayedPopup from "./components/DelayedPopup";
import NbfcPage from "./pages/ourpartner/NbfcPage";
import BankPage from "./pages/ourpartner/BankPage";
const queryClient = new QueryClient();

const AppContent = () => {
  const [showForm, setShowForm] = useState(false);
  const location = useLocation(); //
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

  // Show form after scroll
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

            {/* <Route path="/our-partners" element={<Resources />} /> */}
            <Route path="/our-partners/:slug" element={<BankPage />} />
            {/* <Route path="/our-partners/credila" element={<CredilaPage />} />
            <Route path="/our-partners/nbfc" element={<NbfcPage />} />
            <Route path="/our-partners/auxilo" element={<Auxilopage />} />
            <Route path="/our-partners/avanse" element={<AvansePage />} />
            <Route
              path="/our-partners/incred-finance"
              element={<IncredFinancingPage />}
            />
            <Route
              path="/our-partners/mpower-financing"
              element={<MpowerFinancePage />}
            />
            <Route
              path="/our-partners/prodigy-finance"
              element={<ProdigyFinancePage />}
            />
            <Route
              path="/our-partners/idfc-first-bank"
              element={<IDFCpage />}
            />
            <Route path="/our-partners/axis-bank" element={<AxisPage />} /> */}
            <Route
              path="/our-partners/compare-loan-offers"
              element={<CompareLoanOffers />}
            />
            <Route
              path="/our-partners/bank-comparison-tool"
              element={<BankComparisonTool />}
            />

            {/* <Route path="/country" element={<Country />} /> */}
            <Route path="/contact" element={<Contact />} />

            {/* <Route path="/partners/:slug" element={<PartnerDetails />} /> */}
            <Route path="/education-loan" element={<EducationLoan />} />

            {/* Add more services here later */}

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
  // Init AOS
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
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
