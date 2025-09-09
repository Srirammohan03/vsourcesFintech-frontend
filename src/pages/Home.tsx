import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calculator,
  GraduationCap,
  Shield,
  TrendingUp,
  Users,
  CheckCircle,
  Star,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchHero } from '@/components/ui/search-hero';
import AboutSection from './AboutSection';
import Accreditation from './AccreditationSection';
import { Partner, partners } from '@/lib/partners';
import VideoSection from '@/components/VideoSection';
import VideoCarousel from '@/components/home/VideoCarousel';
import Banksloans from './Banksloans';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ScholarshipsSection from '@/components/home/ScholarshipsSection';
import TrustSection from '@/components/home/TrustSection';
import ServicesSection from '@/components/home/ServicesSection';
const tools = [
  {
    title: "Loan Calculator",
    description: "Calculate your education loan EMI and total interest",
    icon: Calculator,
    path: "/tools/loan-calculator",
    image: "/assets/images/loan-calculator.jpg",
  },
  {
    title: "Cost Calculator",
    description: "Estimate the cost of studying abroad",
    icon: TrendingUp,
    path: "/tools/cost-calculator",
    image: "/assets/images/Cost-Calculator.jpg",
  },
  {
    title: "Eligibility Checker",
    description: "Check your loan eligibility instantly",
    icon: CheckCircle,
    path: "/tools/eligibility-checker",
    image: "/assets/images/Eligibility-Checker.jpg",
  },
];
const steps = [
  {
    id: "01",
    title: "Sign up on VSource in minutes — it’s fast, free, and secure.",
    gradient: "/assets/images/loan-process-bg.png",
    icon: "/assets/images/sign-up.gif",
  },
  {
    id: "02",
    title: "Compare real-time loan offers from 15+ top lenders with lowest rates.",
    gradient: "/assets/images/loan-process-bg.png",
    icon: "/assets/images/bank.gif",
  },
  {
    id: "03",
    title: "Shortlist the best lenders with expert guidance from our Fund Advisor.",
    gradient: "/assets/images/loan-process-bg.png",
    icon: "/assets/images/shortlist.gif",
  },
  {
    id: "04",
    title: "Upload your documents securely and complete your profile quickly.",
    gradient: "/assets/images/loan-process-bg.png",
    icon: "/assets/images/doc-up.gif",
  },
  {
    id: "05",
    title: "Get approved and receive your loan amount in as little as 48 hours.",
    gradient: "/assets/images/loan-process-bg.png",
    icon: "/assets/images/loan-app.gif",
  },
];

const benefits = [
  'Quick loan approval process',
  'Competitive interest rates',
  'No collateral required for many loans',
  'Expert guidance throughout',
  'Multiple loan partner options',
  'Hassle-free documentation'
];


const testimonials = [
  {
    name: 'Sarah Johnson',
    text: 'EduLoan helped me secure funding for my Masters in the UK. The process was smooth and the team was incredibly supportive.',
    rating: 5,
    course: 'Masters in Computer Science, UK'
  },
  {
    name: 'Raj Patel',
    text: 'I got my education loan approved in just 2 weeks! The interest rates were competitive and the documentation was minimal.',
    rating: 5,
    course: 'MBA in Canada'
  },
  {
    name: 'Emily Chen',
    text: 'Excellent service and guidance. They helped me find the perfect loan option for my PhD studies in the US.',
    rating: 5,
    course: 'PhD in Engineering, USA'
  }
];

export default function Home() {
  const [visibleCount, setVisibleCount] = useState(8); // show first 8 (4x2)

  const visiblePartners: Partner[] = partners.slice(0, visibleCount);

  const handleToggle = () => {
    if (visibleCount >= partners.length) {
      setVisibleCount(8); // reset to first 8
    } else {
      setVisibleCount((prev) => prev + 8); // load next 8
    }
  };
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full text-white overflow-hidden">
        {/* === Background image === */}
        <div
          className="hidden sm:block absolute inset-0 bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/images/bg-01.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* === Mobile Layout === */}
        <div className="relative z-10 sm:hidden min-h-screen px-4 pt-28 pb-10">
          {/* Mobile background image */}
          <div
            className="absolute inset-0 h-full w-full bg-no-repeat bg-cover bg-[position:center_35%]"
            style={{
              backgroundImage: "url('/assets/images/bg-01-mobile.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-between min-h-full">
            {/* Top: H1 + Button */}
            <div className="flex">
              <div className="w-[50%] bg-white/10 backdrop-blur-sm rounded-2xl p-2 flex flex-col justify-center space-y-4 mb-5">
                <h1 className="text-2xl font-bold leading-snug">
                  Fund Your Dreams of
                  <span className="block text-red-600 text-xl">
                    Studying Abroad
                  </span>
                </h1>
                <p className="text-white text-sm">
                  Get instant access to education loans.
                </p>
                <Button className="bg-white text-red-600 text-sm px-4 py-2 rounded-md">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Apply for Loan
                </Button>
              </div>
            </div>

            {/* Bottom: SearchHero */}
            <div className="w-full mt-4">
              <SearchHero />
            </div>
          </div>
        </div>



        {/* === Desktop Layout === */}
        <div className="hidden sm:block relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 sm:space-y-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Fund Your Dreams of
              <span className="block text-red-600">Studying Abroad</span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto">
              Get instant access to education loans, scholarships, and expert guidance
              to make your international education dreams a reality.
            </p>

            {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-red-600 text-white hover:bg-highlight/90 h-14 px-8"
            >
              <GraduationCap className="mr-2 h-6 w-6 sm:h-8 sm:w-8" />
              Apply for Loan
            </Button>
          </div> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10"
          >
            <SearchHero />
          </motion.div>
        </div>
      </section>
      <AboutSection />
      <Accreditation />
      <ScholarshipsSection />
      <TrustSection />
      <ServicesSection />
      <section className="w-full py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 text-center">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-semibold mb-12">
            Your Loan <span className="text-red-600">Journey</span>
          </h2>

          {/* Desktop layout */}
          <div className="hidden md:flex justify-between items-start relative">
            {/* horizontal line THROUGH number circles */}
            <div className="absolute top-[180px] left-0 w-full h-[5px] bg-gray-200 z-0"></div>

            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                className="relative z-10 flex flex-col items-center text-center w-1/5 px-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                {/* Gradient + Icon stacked */}
                <div className="relative w-28 h-28 mb-6">
                  <img
                    src={step.gradient}
                    alt="gradient"
                    className="w-full h-full object-contain"
                  />
                  <img
                    src={step.icon}
                    alt={step.title}
                    className="absolute inset-0 w-20 h-20 m-auto"
                  />
                </div>

                {/* Number Circle */}
                <div className="mt-6 w-10 h-10 rounded-full border-2 border-red-600 flex items-center justify-center text-sm font-bold text-red-600 bg-white z-10">
                  {step.id}
                </div>

                {/* Text */}
                <p className="mt-4 text-sm text-gray-800">{step.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Mobile layout */}
          <div className="md:hidden relative flex flex-col items-start">
            {/* vertical line THROUGH number circles */}
            <div className="absolute left-[135px] top-[0px] bottom-0 w-[5px] bg-gray-200"></div>

            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                className="relative flex items-center mb-5 w-full"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                {/* Left: gradient + icon stacked */}
                <div className="relative w-24 h-24 mr-6 z-10">
                  <img
                    src={step.gradient}
                    alt="gradient"
                    className="w-full h-full object-contain"
                  />
                  <img
                    src={step.icon}
                    alt={step.title}
                    className="absolute inset-0 w-16 h-16 m-auto"
                  />
                </div>

                {/* Middle: Number Circle */}
                <div className="w-8 h-8 rounded-full border-2 border-red-600 flex items-center justify-center text-xs font-bold text-red-600 bg-white z-10 mr-4">
                  {step.id}
                </div>

                {/* Right: text */}
                <p className="text-gray-800 text-sm flex-1">{step.title}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-10">
            <button className="px-8 py-3 rounded-full bg-red-600 text-white font-semibold hover:opacity-90 transition">
              Apply Now
            </button>
          </div>
        </div>
      </section>
      {/* Tools Overview Section */}
      <section className="py-10 lg:py-16 bg-surface">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Powerful Tools to Plan Your Education
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Use our free calculators and tools to make informed decisions about your education financing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full relative group cursor-pointer overflow-hidden rounded-2xl">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${tool.image})` }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/70 transition-all duration-300" />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <CardHeader className="text-center">
                      <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <tool.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-xl text-white">{tool.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-200 mb-4">{tool.description}</p>
                      <Button
                        asChild
                        variant="outline"
                        className="group-hover:bg-primary group-hover:text-primary-foreground bg-white/90 backdrop-blur-sm"
                      >
                        <Link to={tool.path}>
                          Try Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-10 lg:py-16">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Why Choose EduLoan?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We've helped thousands of students achieve their dreams of studying abroad
                with our comprehensive loan and scholarship services.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/assets/images/Choose-EduLoan.jpg')" }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60" />

              {/* Content */}
              <div className="relative z-10 p-8 text-white">
                <div className="flex items-center mb-6">
                  <Users className="h-8 w-8 mr-3 text-red-600" />
                  <div>
                    <h3 className="text-2xl font-bold">50,000 <span className='text-red-600'>+</span></h3>
                    <p className="text-white/90">Students Helped</p>
                  </div>
                </div>
                <div className="flex items-center mb-6">
                  <Shield className="h-8 w-8 mr-3 text-red-600" />
                  <div>
                    <h3 className="text-2xl font-bold">₹1000 Cr <span className='text-red-600'>+</span></h3>
                    <p className="text-white/90">Loans Disbursed</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="h-8 w-8 mr-3 text-red-600" />
                  <div>
                    <h3 className="text-2xl font-bold">50 <span className='text-red-600'>+</span></h3>
                    <p className="text-white/90">Countries Covered</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
      {/* Loan Partners Section */}

      <Banksloans />
      <VideoSection />
      <VideoCarousel />

      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-10 lg:py-16 bg-gradient-primary text-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get personalized loan options and scholarship opportunities in minutes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-8">
                <Link to="/contact">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-8">
                <Link to="/tools">Explore Tools</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}