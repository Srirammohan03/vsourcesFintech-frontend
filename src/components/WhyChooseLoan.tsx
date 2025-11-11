import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Users, Shield, GraduationCap } from "lucide-react";

interface WhyChooseLoanProps {}

const benefits: string[] = [
  "Quick loan approval process",
  "Competitive interest rates",
  "No collateral required for many loans",
  "Expert guidance throughout",
  "Multiple loan partner options",
  "Hassle-free documentation",
];

const WhyChooseLoan: React.FC<WhyChooseLoanProps> = () => {
  return (
    <section className="py-10 lg:py-16">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Why Choose Education Loan ?
            </h2>

            <p className="text-lg text-muted-foreground mb-8">
              We've helped thousands of students achieve their dreams of
              studying abroad with our comprehensive loan and scholarship
              services.
            </p>

            {/* Benefits List */}
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

          {/* RIGHT SIDE IMAGE + STATS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762862819/rxlwzvmjasdmccrd7wag.jpg')",
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Content */}
            <div className="relative z-10 p-8 text-white">
              <div className="flex items-center mb-6">
                <Users className="h-8 w-8 mr-3 text-red-600" />
                <div>
                  <h3 className="text-2xl font-bold">
                    50,000 <span className="text-red-600">+</span>
                  </h3>
                  <p className="text-white/90">Students Helped</p>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <Shield className="h-8 w-8 mr-3 text-red-600" />
                <div>
                  <h3 className="text-2xl font-bold">
                    ₹1000 Cr <span className="text-red-600">+</span>
                  </h3>
                  <p className="text-white/90">Loans Disbursed</p>
                </div>
              </div>

              <div className="flex items-center">
                <GraduationCap className="h-8 w-8 mr-3 text-red-600" />
                <div>
                  <h3 className="text-2xl font-bold">
                    50 <span className="text-red-600">+</span>
                  </h3>
                  <p className="text-white/90">Countries Covered</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseLoan;
