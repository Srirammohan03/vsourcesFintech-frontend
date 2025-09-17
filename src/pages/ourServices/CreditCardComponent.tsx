import React, { useState } from "react";
import {
  Globe,
  CreditCard,
  ShieldCheck,
  GraduationCap,
  DollarSign,
  FileText,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { ChevronRight, Check } from "lucide-react";
import DelayedPopup from "@/components/DelayedPopup";

// Country Options
const countries = ["USA", "UK", "Canada", "France", "Ireland"];

const creditTypes = [
  {
    title: "Secured Checking Accounts",
    icon: <ShieldCheck className="w-10 h-10 text-blue-600 mb-2" />,
    shortHead: "Safe & Accessible",
    shortContent:
      "Open a U.S. checking account fully online using your Passport, SSN, or ITIN. Perfect for international students.",
    imageSrc: "/assets/images/lock.gif",
    bgColor: "bg-blue-50",
    points: [
      "No minimum balance requirement.",
      "Free ATM withdrawals at 60,000+ locations nationwide.",
      "FDIC insured up to $250,000 for your peace of mind.",
      "24/7 customer support for any account needs.",
    ],
  },
  {
    title: "Credit Card",
    icon: <GraduationCap className="w-10 h-10 text-green-600 mb-2" />,
    shortHead: "Build Credit & Rewards",
    shortContent:
      "Ideal credit products tailored for students with no prior US credit history required.",
    imageSrc: "/assets/images/tap-to-pay.gif",
    bgColor: "bg-green-50",
    points: [
      "No security deposit required for approval.",
      "Earn up to 1.5% cashback on everyday purchases.",
      "Flexible repayment options and low introductory rates.",
      "Helps establish and build your US credit score from day one.",
    ],
  },
  {
    title: "Money Transfers",
    icon: <DollarSign className="w-10 h-10 text-yellow-600 mb-2" />,
    shortHead: "Fast, Affordable Transfers",
    shortContent:
      "Send money internationally with competitive exchange rates, low fees, and instant tracking for every transfer.",
    imageSrc: "/assets/images/online-payment.gif",
    bgColor: "bg-yellow-50",
    points: [
      "Transfers to 100+ countries with trusted partners.",
      "Lower fees than banks and quick delivery times.",
      "100% secure and encrypted transactions.",
      "Real-time status tracking through your mobile app.",
      "Multi-currency support to save on conversions.",
    ],
  },
  {
    title: "Insurance",
    icon: <DollarSign className="w-10 h-10 text-purple-600 mb-2" />,
    shortHead: "Comprehensive & Affordable",
    shortContent:
      "Protect what matters most with insurance plans designed for students abroad.",
    imageSrc: "/assets/images/privacy-policy.gif",
    bgColor: "bg-purple-50",
    points: [
      "Rental and liability insurance for off-campus housing.",
      "Health insurance covering emergency care and preventive services.",
      "Pet insurance for your furry family members.",
      "Affordable auto and personal property coverage options.",
      "Simple claims process and 24/7 support.",
    ],
  },
  {
    title: "Loans",
    icon: <DollarSign className="w-10 h-10 text-pink-600 mb-2" />,
    shortHead: "Flexible & Personalized",
    shortContent:
      "Easily accessible student loans and personal loans tailored for international students.",
    imageSrc: "/assets/images/discount-bag.gif",
    bgColor: "bg-pink-50",
    points: [
      "Competitive interest rates customized for students.",
      "Loan options for tuition, books, and living expenses.",
      "Auto refinance and personal loans with flexible terms.",
      "Dedicated advisors to help you select the right product.",
      "Fast approval process with minimal paperwork.",
    ],
  },
];



// Application Steps
const applySteps = [
  { step: "Contact Us or Vsources", icon: <Globe className="w-5 h-5" /> },
  { step: "Upload Documents", icon: <FileText className="w-5 h-5" /> },
  { step: "Pick Your Card", icon: <CreditCard className="w-5 h-5" /> },
  { step: "Show Income Proof", icon: <DollarSign className="w-5 h-5" /> },
  { step: "Review & Confirm", icon: <CheckCircle className="w-5 h-5" /> },
];

const tips = [
  "Compare rates & offers before applying.",
  "Keep supporting documents ready.",
  "Use your card responsibly for a higher credit limit.",
];

const CreditCardComponent = () => {
  const [selectedCountry, setSelectedCountry] = useState("USA");
  const [flipped, setFlipped] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  
    const handlePopupClose = () => {
      setShowPopup(false);
    };
  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative text-white pt-32 pb-10 lg:pt-40 lg:pb-32">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-right bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/images/ourservices-img.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/70 md:bg-black/50" />
        </div>

        {/* Content */}
         <div className="relative w-full max-w-[1400px] mx-auto px-6 flex flex-col items-center md:items-start justify-center text-left">
                 <Sparkles className="w-10 h-10 text-white mb-4 animate-pulse" />
          <h1 className="text-4xl font-bold mb-3 text-center max-w-3xl">
            Credit Cards for International Students
          </h1>
          <p className="mb-6 max-w-2xl">
            Empower your financial journey. Manage money smartly and build credit
            while studying abroad, with exclusive student benefits and intuitive
            application steps.
          </p>

          {/* Tips */}
          <div className="flex justify-start max-w-2xl flex-col gap-3 mt-2 w-full items-start">
            {tips.map((tip, i) => (
              <span
                key={i}
                className="bg-white/20 px-4 py-2 rounded-xl text-sm font-medium text-white shadow w-fit"
              >
                {tip}
              </span>
            ))}
          </div>
        </div>
      </section>



      {/* Country Selector */}
      <section className="w-full max-w-[1400px] mx-auto px-6 py-5 flex flex-col items-center">
        <label className="block text-lg font-semibold mb-2 text-gray-700">
          Select Your Country
        </label>
        <select
          id="country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full md:w-1/2 p-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 bg-white"
        >
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </section>
   <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 hover:shadow-2xl transition duration-500 relative z-10">
      
      {/* Left Content */}
      <div className="flex-1 text-center md:text-left space-y-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Our Trusted Partner
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
          We’re proud to partner with 
          <span className="text-red-600 font-semibold"> Zolve </span> 
          to provide innovative credit card and financial solutions 
          that empower students and professionals to build a seamless 
          global financial journey.
        </p>
      </div>

      {/* Right Content (Logo) */}
      <div className="flex-shrink-0">
        <div className="p-6 bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 hover:scale-105 transition-transform duration-500">
          <img 
            src="https://www.zolveimages.zolve.com/website/images/zolve_logo.svg" 
            alt="Zolve Logo" 
            className="h-16 md:h-20 object-contain"
          />
        </div>
      </div>
    </div>
  </div>

  {/* Background Accent Shapes */}
  <div className="absolute top-10 left-10 w-72 h-72 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
  <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
</section>


      {/* Credit Card Types */}
      <section className="w-full max-w-[900px] mx-auto px-4 sm:px-6 py-10 space-y-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 flex items-center gap-2 justify-center">
          Financial Products for International Students in {selectedCountry}
        </h2>

        {creditTypes.map((type, idx) => {
          const isFlipped = flipped === idx;

          return (
            <div
              key={idx}
              className="w-full max-w-4xl perspective mx-auto"
              style={{ perspective: "1200px" }}
            >
              <div
                onClick={() => setFlipped(isFlipped ? null : idx)}
                className={`relative w-full min-h-[300px] cursor-pointer select-none transition-transform duration-700 ${isFlipped ? "rotate-y-180" : ""}`}
                style={{ transformStyle: "preserve-3d", touchAction: "manipulation" }}
              >
                {/* Front Side */}
                <div
                  className={`absolute inset-0 backface-hidden rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between p-5 sm:p-8 gap-6  ${type.bgColor}`}
                >
                  {/* Left: text + icon */}
                  <div className="flex flex-col flex-1 justify-center text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-3 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2">
                      {type.icon} <span>{type.title}</span>
                    </h3>

                    <h4 className="text-base md:text-lg font-semibold text-black mb-2">{type.shortHead}</h4>

                    <p className="text-gray-700 text-sm md:text-base mb-4 max-w-md mx-auto sm:mx-0">
                      {type.shortContent}
                    </p>

                    <div className="inline-block px-4 py-2 border border-red-600 bg-white text-red-600 rounded-2xl cursor-pointer mt-auto max-w-max mx-auto sm:mx-0">
                      Tap to know more
                    </div>
                  </div>

                  {/* Right: image */}
                  <div className="flex-shrink-0 w-full sm:w-[140px] md:flex items-center justify-center mt-6 sm:mt-0 mx-auto sm:mx-0 hidden">
                    <img
                      src={type.imageSrc}
                      alt={type.title}
                      className="w-full h-auto object-contain max-w-[140px]"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-white shadow-md border border-indigo-300 p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                  {/* Left: points */}
                  <div className="flex-1 max-w-md mx-auto sm:mx-0 text-center sm:text-left">
                    <h3 className="text-indigo-700 text-lg md:text-xl font-semibold mb-4">Key Features</h3>
                    <ul className="space-y-2 md:space-y-3 text-gray-700 text-sm md:text-base">
                      {type.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 md:gap-3">
                          <Check className="w-4 h-4 md:w-5 md:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: image */}
                  <div className="flex-shrink-0 w-full sm:w-[140px] md:flex items-center justify-center mt-6 sm:mt-0 mx-auto sm:mx-0  hidden">
                    <img
                      src={type.imageSrc}
                      alt={`${type.title} details`}
                      className="w-full h-auto object-contain max-w-[140px]"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <style>{`
    .rotate-y-180 {
      transform: rotateY(180deg);
    }
    .backface-hidden {
      backface-visibility: hidden;
    }
    .perspective > div {
      will-change: transform;
    }
  `}</style>
      </section>


      {/* Eligibility Note */}
      <div className="mb-10 text-center py-4 px-6 rounded-xl bg-indigo-100 text-gray-500 font-semibold shadow">
        Eligibility: Valid passport, student visa, and university admission required for international student card applications.
      </div>
      {/* How To Apply Section */}
      <section className="w-full max-w-[1400px] mx-auto px-4 py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          How To Apply in {selectedCountry}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Example step data structure update with descriptions */}
          {applySteps.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-xl bg-gradient-to-tr from-white via-indigo-50 to-purple-50 p-7 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
            >
              <div className="mb-5">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br 
          from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
              </div>
              <span className="text-lg font-semibold text-indigo-700 mb-2">Step {i + 1}</span>
              <h3 className="text-md font-bold text-gray-900 mb-2">{item.step}</h3>
              {/* Add additional step details or tips here */}
              <p className="text-sm text-gray-600 mb-2">
                {
                  i === 0 ? "Contact our support team or Vsources to begin your application process quickly and get immediate assistance." :
                    i === 1 ? "Prepare and upload necessary documents, such as passport, proof of admission, and visa for smooth processing." :
                      i === 2 ? "Compare different credit card options, understanding benefits, fees, and required eligibility for students." :
                        i === 3 ? "Show recent income or scholarship documents to help us recommend the best card and limit for you." :
                          i === 4 ? "Review all card terms carefully so you are aware of charges, repayments, and rewards before confirming."
                            : ""
                }
              </p>
              <div className="mt-auto pt-2">
                {/* Optional: Tag or more info for each step */}
                <span className="inline-block px-3 py-1 bg-indigo-100 text-[11px] rounded-xl text-indigo-700 font-medium">
                  {i === 0 ? "Assistance Available" :
                    i === 1 ? "Required Documents" :
                      i === 2 ? "Compare Options" :
                        i === 3 ? "Proof Needed" :
                          i === 4 ? "Read Carefully" : ""
                  }
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* Call To Action */}
      <div className="flex flex-col items-center pb-16">
        <button className="px-8 py-4 rounded-2xl bg-red-600  text-white font-bold text-lg shadow hover:shadow-xl transition"  onClick={() => setShowPopup(true)} >
          Start Your Application
        </button>
        {showPopup && <DelayedPopup onMinimize={handlePopupClose} />}
        <span className="mt-2 text-sm text-gray-500">Support available for every step!</span>
      </div>
    </div>
  );
};

export default CreditCardComponent;
