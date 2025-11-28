import React, { memo } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, TrendingUp, CheckCircle } from "lucide-react";

interface ToolItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  image: string;
}

const tools: ToolItem[] = [
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

const ToolsSection: React.FC = () => {
  return (
    <section className="py-10 lg:py-16 bg-surface">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
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
            Use our free calculators and tools to make informed decisions about
            your education financing
          </p>
        </motion.div>

        {/* Tool Cards */}
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

                {/* Black Overlay */}
                <div className="absolute inset-0 bg-black/70 transition-all duration-300" />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <tool.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white">
                      {tool.title}
                    </CardTitle>
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
  );
};

export default memo(ToolsSection);
