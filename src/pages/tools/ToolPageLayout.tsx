import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ToolPageLayoutProps {
  title: string;
  subtitle: string;
  calculator: React.ReactNode;
  howItWorks: React.ReactNode;
  extraSection: React.ReactNode;
  references: { title: string; description: string; link: string }[];
}

const ToolPageLayout: React.FC<ToolPageLayoutProps> = ({
  title,
  subtitle,
  calculator,
  howItWorks,
  extraSection,
  references,
}) => {
  return (
    <div className="w-full bg-surface text-text">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 to-sky-500 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{title}</h1>
          <p className="text-lg md:text-xl opacity-90">{subtitle}</p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Try the Calculator
        </h2>
        <div className="bg-white rounded-2xl shadow-lg p-6">{calculator}</div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            How It Works
          </h2>
          {howItWorks}
        </div>
      </section>

      {/* Extra Helpful Section */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        {extraSection}
      </section>

      {/* More References */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            More Helpful Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {references.map((ref, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Card className="rounded-2xl shadow-md border border-gray-200">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{ref.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {ref.description}
                    </p>
                    <a
                      href={ref.link}
                      className="text-sky-600 font-medium hover:underline"
                    >
                      Learn More →
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToolPageLayout;
