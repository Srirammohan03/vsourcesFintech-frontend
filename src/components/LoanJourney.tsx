import React, { memo, useState } from "react";
import { motion } from "framer-motion";
import DelayedPopup from "./DelayedPopup";

interface Step {
  id: string;
  title: string;
  gradient: string;
  icon: string;
}

interface LoanJourneyProps {
  setShowPopup: (value: boolean) => void;
  handlePopupClose: () => void;
  showPopup: boolean;
}

const steps: Step[] = [
  {
    id: "01",
    title: "Sign up on VSource in minutes — it’s fast, free, and secure.",
    gradient: "/assets/images/loan-process-bg.png",
    icon: "/assets/images/sign-up.gif",
  },
  {
    id: "02",
    title:
      "Compare real-time loan offers from 15+ top lenders with lowest rates.",
    gradient: "/assets/images/loan-process-bg.png",
    icon: "/assets/images/bank.gif",
  },
  {
    id: "03",
    title:
      "Shortlist the best lenders with expert guidance from our Fund Advisor.",
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
    title:
      "Get approved and receive your loan amount in as little as 48 hours.",
    gradient: "/assets/images/loan-process-bg.png",
    icon: "/assets/images/loan-app.gif",
  },
];

const LoanJourney: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupClose = () => {
    setShowPopup(false);
  };
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-12">
          Your Loan <span className="text-red-600">Journey</span>
        </h2>

        {/* Desktop layout */}
        <div className="hidden md:flex justify-between items-start relative">
          <div className="absolute top-[180px] left-0 w-full h-[5px] bg-gray-200 z-0"></div>

          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              className="relative z-10 flex flex-col items-center text-center w-1/5 px-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
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

              <div className="mt-6 w-10 h-10 rounded-full border-2 border-red-600 flex items-center justify-center text-sm font-bold text-red-600 bg-white z-10">
                {step.id}
              </div>

              <p className="mt-4 text-sm text-gray-800">{step.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile layout */}
        <div className="md:hidden relative flex flex-col items-start">
          <div className="absolute left-[135px] top-[0px] bottom-0 w-[5px] bg-gray-200"></div>

          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              className="relative flex items-center mb-5 w-full"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
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

              <div className="w-8 h-8 rounded-full border-2 border-red-600 flex items-center justify-center text-xs font-bold text-red-600 bg-white z-10 mr-4">
                {step.id}
              </div>

              <p className="text-gray-800 text-sm flex-1">{step.title}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-10">
          <button
            className="px-8 py-3 rounded-full bg-red-600 text-white font-semibold hover:opacity-90 transition"
            onClick={() => setShowPopup(true)}
          >
            Apply Now
          </button>
        </div>

        {/* Popup */}
        {showPopup && <DelayedPopup onMinimize={handlePopupClose} />}
      </div>
    </section>
  );
};

export default memo(LoanJourney);
