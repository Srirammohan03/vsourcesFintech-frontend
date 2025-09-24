import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calculator,
  TrendingUp,
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
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ---------------- Tool Categories ----------------
const toolCategories = [
  {
    title: "Loan Tools",
    description: "Calculate loans, EMI, and compare offers",
    tools: [
      { name: "Loan Calculator", path: "/tools/loan-calculator", icon: Calculator },
      { name: "Interest Calculator", path: "/tools/interest-calculator", icon: Calculator },
      { name: "Loan Repayment Calculator", path: "/tools/loan-repayment-calculator", icon: DollarSign },
      { name: "Education Loan EMI Calculator", path: "/tools/education-loan-emi-calculator", icon: Calculator },
      { name: "Bank Comparison Tool", path: "/tools/bank-comparison-tool", icon: Building },
    ],
  },
  {
    title: "Financial Planning Tools",
    description: "Plan your finances and estimate costs",
    tools: [
      { name: "Expense Calculator", path: "/tools/expense-calculator", icon: PiggyBank },
      { name: "Savings Calculator", path: "/tools/savings-calculator", icon: PiggyBank },
      { name: "Cost of Studying Abroad", path: "/tools/cost-of-studying-abroad", icon: Globe },
      { name: "Living Calculator", path: "/tools/living-calculator", icon: Globe },
      { name: "ROI Calculator", path: "/tools/roi-calculator", icon: TrendingUp },
      { name: "Estimate Future Earnings", path: "/tools/estimate-future-earnings", icon: DollarSign },
    ],
  },
  {
    title: "Utilities Tools",
    description: "Helpful utilities for international students",
    tools: [
      { name: "Time Zone Converter", path: "/tools/time-zone-converter", icon: Clock },
      { name: "Weather Abroad", path: "/tools/weather-abroad", icon: Thermometer },
      { name: "Currency Converter", path: "/tools/currency-converter", icon: CreditCard },
    ],
  },
  {
    title: "Academic Tools",
    description: "Tools to help with academic planning",
    tools: [
      { name: "GPA Calculator", path: "/tools/gpa-calculator", icon: Brain },
      { name: "SOP Generator", path: "/tools/sop-generator", icon: FileText },
    ],
  },
  {
    title: "Travel & Insurance Tools",
    description: "Prepare for your journey abroad",
    tools: [
      { name: "Student Packing List", path: "/tools/packing-list", icon: Backpack },
      { name: "Health Insurance Compare", path: "/tools/health-insurance-compare", icon: Shield },
    ],
  },
];

export default function Tools() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-surface to-muted/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-darkblue to-gray-900 text-white pt-40 pb-16 lg:py-28">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,white,transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              Educational Tools
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Free calculators and tools to help you plan your education abroad journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tools Categories */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">
          {toolCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: categoryIndex * 0.15 }}
            >
              {/* Section Heading */}
              <div className="text-center mb-14">
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  {category.title}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {category.description}
                </p>
                <div className="mt-6 w-24 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full" />
              </div>

              {/* Tool Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.tools.map((tool, toolIndex) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: toolIndex * 0.1 }}
                  >
                    <Card className="h-full relative bg-white/80 backdrop-blur-md border border-muted/40 shadow-lg hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300 group">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                            <tool.icon className="h-6 w-6 text-white" />
                          </div>
                          <CardTitle className="text-xl font-semibold">
                            {tool.name}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button
                          asChild
                          variant="outline"
                          className="w-full mt-4 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-500 group-hover:text-white border-muted-foreground/30"
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
      <section className="relative py-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-100 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-6">
              Need More Help?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our education loan experts are here to guide you through the entire process with personalized consultation.
            </p>
            <Button
              asChild
              size="lg"
              className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 rounded-xl shadow-lg"
            >
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
