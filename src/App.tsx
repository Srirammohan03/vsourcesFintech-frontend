import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { useEffect, useState } from "react";
const queryClient = new QueryClient();
  
const App = () => {
const [showForm, setShowForm] = useState(false);
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
  const isGoVirtualPage = location.pathname === "/meeting";
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
              {!isGoVirtualPage && <Navbar />}
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/tools" element={<Tools />} />
                  <Route path="/tools/loan-calculator" element={<LoanCalculator />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/country" element={<Country />} />
                  <Route path="/contact" element={<Contact />} />

                  <Route path="/partners/:slug" element={<PartnerDetails />} />
                  <Route path="/education-loan" element={<EducationLoan />} />
                  <Route path="/meeting" element={<GoVirtual />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              {!isGoVirtualPage && <ContactBar />}
              {!isGoVirtualPage && <Footer />}
            </div>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
};

export default App;
