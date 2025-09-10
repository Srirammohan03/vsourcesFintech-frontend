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
import PartnerDetails from "./components/layout/PartnerDetails";
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
const queryClient = new QueryClient();

const AppContent = () => {
  const [showForm, setShowForm] = useState(false);
  const location = useLocation(); // ✅ React Router hook
  const isGoVirtualPage = location.pathname === "/meeting";

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
            
            <Route path="/tools" element={<Tools />} />
          <Route path="/tools/loan-calculator" element={<LoanCalculator />} />
          <Route path="/tools/expense-calculator" element={<ExpenseCalculator />} />
          <Route path="/tools/currency-converter" element={<CurrencyConverter />} />
          <Route path="/tools/savings-calculator" element={<SavingsCalculator />} />



            {/* <Route path="/our-partners" element={<Resources />} /> */}
            <Route path="/our-partners/credila" element={<CredilaPage/>} />
            <Route path="/our-partners/auxilo" element={<Auxilopage />} />
            <Route path="/our-partners/avanse" element={<AvansePage/>} />
            <Route path="/our-partners/incred-finance" element={<IncredFinancingPage/>}/>
            <Route  path="/our-partners/mpower-financing" element={<MpowerFinancePage/>}/>
            <Route path= "/our-partners/prodigy-finance" element={<ProdigyFinancePage/>}/>
            <Route path="/our-partners/idfc-first-bank" element={<IDFCpage/>}/>
            <Route path= "/our-partners/axis-bank" element={<AxisPage/>}/>

            <Route path="/country" element={<Country />} />
            <Route path="/contact" element={<Contact />} />


            <Route path="/partners/:slug" element={<PartnerDetails />} />
            <Route path="/education-loan" element={<EducationLoan />} />

            {/* Services */}
            <Route
              path="/services/abroad-education-loan"
              element={<AbroadEducation />}
            />
            {/* Add more services here later */}

            <Route path="/meeting" element={<GoVirtual />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {!isGoVirtualPage && <ContactBar />}
        {!isGoVirtualPage && <Footer />}
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
