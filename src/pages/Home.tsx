import React from 'react';
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

const tools = [
  {
    title: 'Loan Calculator',
    description: 'Calculate your education loan EMI and total interest',
    icon: Calculator,
    path: '/tools/loan-calculator'
  },
  {
    title: 'Cost Calculator',
    description: 'Estimate the cost of studying abroad',
    icon: TrendingUp,
    path: '/tools/cost-calculator'
  },
  {
    title: 'Eligibility Checker',
    description: 'Check your loan eligibility instantly',
    icon: CheckCircle,
    path: '/tools/eligibility-checker'
  }
];

const benefits = [
  'Quick loan approval process',
  'Competitive interest rates',
  'No collateral required for many loans',
  'Expert guidance throughout',
  'Multiple loan partner options',
  'Hassle-free documentation'
];

const partners = [
  'HDFC Bank',
  'ICICI Bank',
  'Avanse',
  'Incred',
  'Auxilo',
  'Prodigy Finance'
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
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-10 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-8"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              Fund Your Dreams of
              <span className="block text-highlight">Studying Abroad</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
              Get instant access to education loans, scholarships, and expert guidance 
              to make your international education dreams a reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-highlight text-highlight-foreground hover:bg-highlight/90 h-14 px-8">
                <GraduationCap className="mr-2 h-10 w-10" />
                Apply for Loan
              </Button>
              <Button size="lg" variant="outline" className="border-white text-red-600 hover:bg-white hover:text-primary h-14 px-8">
                Find Scholarships
              </Button>
            </div>
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
      {/* Tools Overview Section */}
      <section className="py-16 lg:py-24 bg-surface">
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
                <Card className="h-full hover:shadow-elegant transition-all duration-300 group cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <tool.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{tool.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">{tool.description}</p>
                    <Button asChild variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground">
                      <Link to={tool.path}>
                        Try Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
            
      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24">
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
              className="relative"
            >
              <div className="bg-gradient-secondary rounded-2xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <Users className="h-8 w-8 mr-3" />
                  <div>
                    <h3 className="text-2xl font-bold">50,000+</h3>
                    <p className="text-white/90">Students Helped</p>
                  </div>
                </div>
                <div className="flex items-center mb-6">
                  <Shield className="h-8 w-8 mr-3" />
                  <div>
                    <h3 className="text-2xl font-bold">₹1000 Cr+</h3>
                    <p className="text-white/90">Loans Disbursed</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <GraduationCap className="h-8 w-8 mr-3" />
                  <div>
                    <h3 className="text-2xl font-bold">50+</h3>
                    <p className="text-white/90">Countries Covered</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Loan Partners Section */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Trusted Lending Partners
            </h2>
            <p className="text-lg text-muted-foreground">
              We partner with leading financial institutions to offer you the best loan options
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-card rounded-lg p-6 shadow-card hover:shadow-elegant transition-all duration-300 flex items-center justify-center"
              >
                <span className="font-semibold text-foreground text-center">{partner}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What Our Students Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Read success stories from students who achieved their dreams with our help
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-highlight fill-current" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.course}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-primary text-white">
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
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary h-14 px-8">
                <Link to="/tools">Explore Tools</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}