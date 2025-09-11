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

// Country Options
const countries = ["USA", "UK", "Canada", "France", "Ireland"];

const creditTypes = [
  {
    title: "Secured Credit Card",
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    points: [
      "Refundable security deposit required.",
      "Build your credit score with minimal risk.",
      "Lower credit limit, easy approval process.",
    ],
  },
  {
    title: "Student Credit Card",
    icon: <GraduationCap className="w-6 h-6 text-green-600" />,
    points: [
      "Designed for international students.",
      "Attractive interest rates for students.",
      "Great for early financial discipline.",
    ],
  },
  {
    title: "No Annual Fee Card",
    icon: <DollarSign className="w-6 h-6 text-yellow-600" />,
    points: [
      "Zero annual maintenance fees.",
      "Ideal for students with tight budgets.",
      "Simple cashback or rewards included.",
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

  return (
    <div className="">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-b from-[#002855] to-[#1a1a1a]">
        <div className="w-full max-w-[1400px] mx-auto px-6 py-16 flex flex-col items-center justify-center">
          <Sparkles className="w-10 h-10 text-white mb-4" />
          <h1 className="text-4xl font-bold text-white mb-3 text-center">
            Credit Cards for International Students
          </h1>
          <p className="text-white mb-6 text-center max-w-xl">
            Empower your financial journey. Manage money smartly and build credit while studying abroad, with exclusive student benefits and intuitive application steps.
          </p>
          <div className="flex justify-center md:flex-row flex-col gap-3 mt-2 w-full items-center">
            {tips.map((tip, i) => (
              <span key={i} className="bg-white/20 px-4 py-2 rounded-xl text-sm font-medium text-white shadow w-fit">
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

      {/* Credit Card Types */}
      <section className="w-full max-w-[1400px] mx-auto px-6 py-10">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 flex items-center gap-2 justify-center">
          <Sparkles className="w-6 h-6 text-purple-500" />
          Cards for International Students in {selectedCountry}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {creditTypes.map((type, idx) => (
            <div key={idx} className="rounded-2xl bg-gradient-to-tr from-white to-indigo-50 shadow-lg p-6 flex flex-col items-start transition hover:-translate-y-2 hover:shadow-2xl group">
              <div className="mb-3 flex items-center gap-2">
                <span className="p-2 rounded-full bg-indigo-200">{type.icon}</span>
                <h3 className="text-lg font-bold text-gray-800">{type.title}</h3>
              </div>
              <ul className="mt-2 space-y-3 text-gray-600">
                {type.points.map((point, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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
        <button className="px-8 py-4 rounded-2xl bg-red-600  text-white font-bold text-lg shadow hover:shadow-xl transition">
          Start Your Application
        </button>
        <span className="mt-2 text-sm text-gray-500">Support available for every step!</span>
      </div>
    </div>
  );
};

export default CreditCardComponent;
