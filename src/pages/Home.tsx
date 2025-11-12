import { lazy, Suspense } from "react";
const Hero = lazy(() => import("@/components/Hero"));
const AboutSection = lazy(() => import("./AboutSection"));
const Accreditation = lazy(() => import("./AccreditationSection"));
const ScholarshipsSection = lazy(
  () => import("@/components/home/ScholarshipsSection")
);
const LoanJourney = lazy(() => import("@/components/LoanJourney"));
const ToolsSection = lazy(() => import("@/components/ToolsSection"));
const WhyChooseLoan = lazy(() => import("@/components/WhyChooseLoan"));
const StartJourneyCTA = lazy(() => import("@/components/StartJourneyCTA"));

const VideoSection = lazy(() => import("@/components/VideoSection"));
const VideoCarousel = lazy(() => import("@/components/home/VideoCarousel"));
const Banksloans = lazy(() => import("./Banksloans"));
const TestimonialsSection = lazy(
  () => import("@/components/home/TestimonialsSection")
);
const TrustSection = lazy(() => import("@/components/home/TrustSection"));
const ServicesSection = lazy(() => import("@/components/home/ServicesSection"));
const HeroSkeleton = lazy(() => import("@/components/HeroSkeleton"));

export default function Home() {
  return (
    <Suspense fallback={<HeroSkeleton />}>
      <div className="min-h-screen">
        <Hero />
        <AboutSection />

        <Accreditation />
        <ScholarshipsSection />
        <TrustSection />
        <ServicesSection />
        <LoanJourney />
        <ToolsSection />
        <WhyChooseLoan />

        <Banksloans />
        <VideoSection />
        <VideoCarousel />

        <TestimonialsSection />
        <StartJourneyCTA />
      </div>
    </Suspense>
  );
}
