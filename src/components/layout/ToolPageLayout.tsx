// layout/ToolPageTemplate.tsx
import React from "react";
import { motion } from "framer-motion";

type ToolPageTemplateProps = {
  title: string;
  description: string;
  heroIcon: React.ReactNode;
  heroBg?: string;
  calculatorForm: React.ReactNode;
  calculatorResults: React.ReactNode;
  howItWorks: { icon: React.ReactNode; title: string; description: string }[];
  extraSectionTitle: string;
  extraSectionContent: React.ReactNode;
  references: { title: string; description: string; link: string }[];
};
const heroBg = true;
export default function ToolPageTemplate({
  title,
  description,
  heroIcon,
  heroBg,
  calculatorForm,
  calculatorResults,
  howItWorks,
  extraSectionTitle,
  extraSectionContent,
  references,
}: ToolPageTemplateProps) {
  heroBg = "/assets/images/tools-bg.webp";
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative pt-32 pb-16 lg:pt-32 lg:pb-24 text-white bg-cover bg-[left_center] lg:bg-[top_center]"
        style={{
          backgroundImage: heroBg ? `url(${heroBg})` : "none",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex justify-center">{heroIcon}</div>
            <h1 className="text-4xl lg:text-4xl font-bold">{title}</h1>
            <p className="text-lg max-w-3xl mx-auto">{description}</p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-8 lg:py-16 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-10">
          {/* Left Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {calculatorForm}
          </motion.div>

          {/* Right Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {calculatorResults}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-8 lg:py-16 bg-gray-50">
        <div className="w-full max-w-[1400px] mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          {howItWorks.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-xl bg-white shadow"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Extra Section */}
      <section className="py-8 lg:py-16 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-6">{extraSectionTitle}</h2>
          {extraSectionContent}
        </div>
      </section>

      {/* More References */}
      <section className="py-8 lg:py-16 bg-gray-50">
        <div className="w-full max-w-[1400px] mx-auto px-6 ">
          <h2 className="text-2xl font-bold mb-10 text-center">
            Explore More Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {references.map((ref, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-xl shadow hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg mb-2">{ref.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{ref.description}</p>
                <a
                  href={ref.link}
                  className="text-red-600 font-medium hover:underline"
                >
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
