import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  TrendingUp, 
  CheckCircle, 
  DollarSign,
  Clock,
  Building,
  PiggyBank,
  Globe,
  Thermometer,
  CreditCard,
  Brain,
  FileText,
  Backpack,
  Shield,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const toolCategories = [
  {
    title: 'Loan Tools',
    description: 'Calculate loans, EMI, and compare offers',
    tools: [
      { name: 'Compare Loan Offers', path: '/tools/compare-loans', icon: TrendingUp },
      { name: 'Interest Calculator', path: '/tools/interest-calculator', icon: Calculator },
      { name: 'Loan Repayment Calculator', path: '/tools/repayment-calculator', icon: DollarSign },
      { name: 'Education Loan Eligibility Checker', path: '/tools/eligibility-checker', icon: CheckCircle },
      { name: 'Education Loan EMI Calculator', path: '/tools/emi-calculator', icon: Calculator },
      { name: 'Bank Comparison Tool', path: '/tools/bank-comparison', icon: Building },
    ]
  },
  {
    title: 'Financial Planning Tools',
    description: 'Plan your finances and estimate costs',
    tools: [
      { name: 'Cost of Studying Abroad', path: '/tools/cost-calculator', icon: PiggyBank },
      { name: 'Living Calculator', path: '/tools/living-calculator', icon: Globe },
      { name: 'ROI Calculator', path: '/tools/roi-calculator', icon: TrendingUp },
      { name: 'Estimate Future Earnings', path: '/tools/earnings-calculator', icon: DollarSign },
    ]
  },
  {
    title: 'Utilities Tools',
    description: 'Helpful utilities for international students',
    tools: [
      { name: 'Time Zone Converter', path: '/tools/timezone-converter', icon: Clock },
      { name: 'Weather Abroad', path: '/tools/weather', icon: Thermometer },
      { name: 'Budget Calculator', path: '/tools/budget-calculator', icon: PiggyBank },
      { name: 'Currency Converter', path: '/tools/currency-converter', icon: CreditCard },
    ]
  },
  {
    title: 'Academic Tools',
    description: 'Tools to help with academic planning',
    tools: [
      { name: 'GPA Calculator', path: '/tools/gpa-calculator', icon: Brain },
      { name: 'SOP Generator', path: '/tools/sop-generator', icon: FileText },
    ]
  },
  {
    title: 'Travel & Insurance Tools',
    description: 'Prepare for your journey abroad',
    tools: [
      { name: 'Student Packing List', path: '/tools/packing-list', icon: Backpack },
      { name: 'Health Insurance Compare', path: '/tools/insurance-compare', icon: Shield },
    ]
  },
];

export default function Tools() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-secondary text-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              Educational Tools
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto">
              Free calculators and tools to help you plan your education abroad journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tools Categories */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {toolCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="mb-16"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  {category.title}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.tools.map((tool, toolIndex) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: toolIndex * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-elegant transition-all duration-300 group">
                      <CardHeader className="pb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <tool.icon className="h-5 w-5 text-white" />
                          </div>
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button 
                          asChild 
                          variant="outline" 
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
                        >
                          <Link to={tool.path}>
                            Use Tool
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Need More Help?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our education loan experts are here to guide you through the entire process
            </p>
            <Button asChild size="lg" className="bg-gradient-primary hover:opacity-90 h-14 px-8">
              <Link to="/contact">
                Get Expert Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}