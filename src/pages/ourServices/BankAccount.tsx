import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaIdCard,
  FaRegFileAlt,
  FaRegMoneyBillAlt,
  FaUserGraduate,
} from "react-icons/fa";

import {
  FaUniversity,
  FaCreditCard,
  FaRegHandshake,
  FaMoneyCheckAlt,
  FaGlobeAmericas,
  FaCheckCircle,
  FaFileUpload,
  FaRegPaperPlane,
  FaWallet,
  FaHandshake,
} from "react-icons/fa";
import {
  FaBuilding,
  FaLandmark,
  FaMoneyBillWave,
  FaCoins,
} from "react-icons/fa";
import DelayedPopup from "@/components/DelayedPopup";
import qs from "qs";
import axios from "axios";
import { toast } from "sonner";
import CreditCardSkeleton from "@/Loaders/our-services/CreditCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import type { BankAccount } from "@/lib/types/OurService";

const countries = [
  "UK",
  "USA",
  "Canada",
  "Ireland",
  "France",
  "Australia",
  "Germany",
];

const typesOfAccounts = [
  {
    type: "Basic Bank Account",
    idealFor:
      "Students who want a simple, no-frills account mainly for local payments and basic banking.",
    features: [
      "No monthly fees",
      "Simple debit card for purchases and cash withdrawals",
      "Basic online & mobile banking",
    ],
    icon: <FaWallet className="text-red-600 w-7 h-7 md:w-10 md:h-10" />,
  },
  {
    type: "International Student Account",
    idealFor:
      "Students new to the country needing features like easier account setup, international transfers, and multi-currency support.",
    features: [
      "Online account opening",
      "Multi-currency support",
      "Lower foreign transaction fees",
      "International remittance options",
    ],
    icon: (
      <FaGlobeAmericas className="text-red-600 w-10 h-10 md:w-10 md:h-10" />
    ),
  },
  {
    type: "Student Bank Account",
    idealFor: "Full-time students enrolled in a local educational institution.",
    features: [
      "Interest-free overdraft facility",
      "Discounts & cashback offers",
      "Mobile banking and budgeting tools",
      "Student discounts on partner brands",
    ],
    icon: <FaUniversity className="text-red-600 w-10 h-10 md:w-10 md:h-10" />,
  },
];

const topBanksData = [
  {
    country: "UK",
    bgImage: "/assets/images/uk-bank.jpg",
    banks: [
      { name: "HSBC Student Account", iconKey: "HSBC" },
      { name: "Barclays Student Account", iconKey: "Barclays" },
      { name: "NatWest Student Account", iconKey: "NatWest" },
    ],
  },
  {
    country: "USA",
    bgImage: "/assets/images/usa-bank.jpg",
    banks: [
      { name: "Bank of America Student Account", iconKey: "Bank of America" },
      { name: "Chase College Checking", iconKey: "Chase" },
      { name: "Wells Fargo Student Account", iconKey: "Wells Fargo" },
    ],
  },
  {
    country: "Canada",
    bgImage: "/assets/images/canada-bank.jpg",
    banks: [
      { name: "RBC Advantage Banking", iconKey: "RBC" },
      { name: "TD Student Chequing", iconKey: "TD" },
      { name: "CIBC Smart Account", iconKey: "CIBC" },
    ],
  },
  {
    country: "Ireland",
    bgImage: "/assets/images/ireland-bank.jpg",
    banks: [
      {
        name: "Allied Irish Bank Student Account",
        iconKey: "Allied Irish Bank",
      },
      { name: "Bank of Ireland Student Account", iconKey: "Bank of Ireland" },
      { name: "Permanent TSB Student Account", iconKey: "Permanent TSB" },
    ],
  },
  {
    country: "France",
    bgImage: "/assets/images/france-bank.jpg",
    banks: [
      { name: "BNP Paribas Student Account", iconKey: "BNP Paribas" },
      { name: "Société Générale Student Account", iconKey: "Société Générale" },
      { name: "HSBC France Student Account", iconKey: "HSBC France" },
    ],
  },
  {
    country: "Australia",
    bgImage: "/assets/images/Australia-bank.jpg",
    banks: [
      {
        name: "Commonwealth Bank Student Account",
        iconKey: "Commonwealth Bank",
      },
      { name: "ANZ Student Access Advantage", iconKey: "ANZ" },
      { name: "Westpac Student Account", iconKey: "Westpac" },
    ],
  },
  {
    country: "Germany",
    bgImage: "/assets/images/Germany-bank.jpg",
    banks: [
      { name: "N26 Student Account", iconKey: "N26" },
      { name: "Commerzbank StartKonto", iconKey: "Commerzbank" },
      { name: "Deutsche Bank Student Account", iconKey: "Deutsche Bank" },
    ],
  },
];

const iconsByIndex = [
  { icon: <FaUniversity />, color: "#2563EB" }, // index 0
  { icon: <FaBuilding />, color: "#DC2626" }, // index 1
  { icon: <FaLandmark />, color: "#059669" }, // index 2
  { icon: <FaRegMoneyBillAlt />, color: "#D97706" }, // index 3
];

const bankIconMap: Record<string, { icon: JSX.Element; color: string }> = {
  HSBC: { icon: <FaMoneyBillWave />, color: "#DB0011" },
  Barclays: { icon: <FaBuilding />, color: "#0A6ED1" },
  NatWest: { icon: <FaLandmark />, color: "#7A0D91" },

  "Bank of America": { icon: <FaCreditCard />, color: "#E31837" },
  Chase: { icon: <FaBuilding />, color: "#1176BC" },
  "Wells Fargo": { icon: <FaLandmark />, color: "#C9051A" },

  RBC: { icon: <FaUniversity />, color: "#004AAD" },
  TD: { icon: <FaBuilding />, color: "#008947" },
  CIBC: { icon: <FaCoins />, color: "#D7182A" },

  "Allied Irish Bank": { icon: <FaUniversity />, color: "#B71C1C" },
  "Bank of Ireland": { icon: <FaBuilding />, color: "#007A33" },
  "Permanent TSB": { icon: <FaMoneyBillWave />, color: "#FFC72C" },

  "BNP Paribas": { icon: <FaCoins />, color: "#008C40" },
  "Société Générale": { icon: <FaLandmark />, color: "#D2232A" },
  "HSBC France": { icon: <FaMoneyBillWave />, color: "#DB0011" },

  "Commonwealth Bank": { icon: <FaUniversity />, color: "#00704A" },
  ANZ: { icon: <FaBuilding />, color: "#1C4F8E" },
  Westpac: { icon: <FaLandmark />, color: "#C8102E" },

  N26: { icon: <FaCoins />, color: "#000000" },
  Commerzbank: { icon: <FaMoneyBillWave />, color: "#FF6B00" },
  "Deutsche Bank": { icon: <FaBuilding />, color: "#00427A" },
};
const eligibilityCriteriaCommon = [
  {
    icon: <FaUniversity className="text-blue-600 w-6 h-6" />,
    text: "Be enrolled as a full-time student in an accredited educational institution",
  },
  {
    icon: <FaIdCard className="text-blue-600 w-6 h-6" />,
    text: "Provide valid identification (passport, visa, or residency permit)",
  },
  {
    icon: <FaRegFileAlt className="text-blue-600 w-6 h-6" />,
    text: "Provide proof of student status or acceptance letter",
  },
  {
    icon: <FaUserGraduate className="text-blue-600 w-6 h-6" />,
    text: "Must usually be 18 years or older (varies by country)",
  },
];

const stepsToOpenAccount = [
  { step: "Connect with Our Team", icon: <FaHandshake /> },
  { step: "Share Your Documents Digitally", icon: <FaFileUpload /> },
  { step: "Application Submission", icon: <FaRegPaperPlane /> },
  { step: "Ready-to-Use Bank Account Setup", icon: <FaWallet /> },
  { step: "Receive Your Debit Card", icon: <FaCreditCard /> },
];

const query = qs.stringify({
  populate: {
    our_services: {
      on: {
        "fintech.bank-account": {
          populate: {
            background_image: { fields: ["url", "name", "documentId"] },
            top_banks: {
              populate: {
                background_image: { fields: ["url", "name", "documentId"] },
                list: true,
              },
            },
          },
        },
      },
    },
  },
});

const fetchBankAccount = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_CMS_GLOBALURL}/api/our-service?${query}`
  );
  return data?.data?.our_services[0] || {};
};

const BankAccount: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const { data, isLoading, isError, error } = useQuery<BankAccount>({
    queryKey: ["bankAccount"],
    queryFn: fetchBankAccount,
  });
  if (isError) {
    toast.error("failed to load");
    console.log("failed to load", error);
    return null;
  }

  if (isLoading || !data) {
    return <CreditCardSkeleton />;
  }

  const handlePopupClose = () => {
    setShowPopup(false);
  };
  return (
    <div className="">
      {/* Hero Section */}
      <motion.section className="relative text-white pt-32 pb-10 lg:pt-40 lg:pb-36">
        <div
          className="absolute inset-0 bg-cover bg-right bg-no-repeat"
          style={{
            backgroundImage: `url(${
              data?.background_image?.url ||
              "/assets/images/ourservices-img.jpg"
            })`,
          }}
        >
          <div className="absolute inset-0 bg-black/70 md:bg-black/50" />
        </div>
        <div className="w-full max-w-[1400px] mx-auto px-6 flex flex-col items-start justify-start">
          <div className="flex flex-col items-center md:items-start justify-center text-left text-white px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg  max-w-3xl">
              {data?.heading ||
                "Simplify Your Study Abroad Journey with a Local Bank Account"}
            </h1>
            <p className="mt-4  text-lg md:text-xl drop-shadow-md  max-w-2xl">
              {data?.description ||
                "Whether you’re studying in the UK, USA, Canada, Ireland, France, Australia, or Germany, getting a student bank account makes managing money easier and smarter."}
            </p>
          </div>
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className=" w-full max-w-[1400px] mx-auto px-6 py-10"
      >
        {/* Centered heading and paragraph */}
        <div className="max-w-xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-extrabold text-black mb-4">
            Why Indian Students Need a Local Bank Account Abroad
          </h2>
          <p className="text-black text-lg leading-relaxed">
            Having a local bank account in your study destination simplifies
            your financial life, saves money, and opens doors to many benefits
            designed especially for international students.
          </p>
        </div>

        {/* Cards grid 3x2 responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <FaMoneyCheckAlt className="text-red-600 w-12 h-12" />,
              title: "Easy Loan Disbursal",
              desc: "Secure education and living loans quickly as banks prioritize customers with local accounts.",
            },
            {
              icon: <FaGlobeAmericas className="text-red-600 w-12 h-12" />,
              title: "Save on Forex Charges",
              desc: "Avoid excessive currency exchange fees when transacting locally with an in-country account.",
            },
            {
              icon: <FaRegHandshake className="text-red-600 w-12 h-12" />,
              title: "Receive Payments Smoothly",
              desc: "Get scholarships, part-time job payments, and family support hassle-free via local transfers.",
            },
            {
              icon: <FaCreditCard className="text-red-600 w-12 h-12" />,
              title: "Simplified Local Payments",
              desc: "Pay rent, bills, and daily expenses more conveniently with domestic banking facilities.",
            },
            {
              icon: <FaUniversity className="text-red-600 w-12 h-12" />,
              title: "Student Benefits & Discounts",
              desc: "Access deals, cashback, and exclusive student offers made available only to account holders.",
            },
            {
              icon: <FaCheckCircle className="text-red-600 w-12 h-12" />,
              title: "Build Local Credit History",
              desc: "Establish creditworthiness in the country which is essential for future loans and financial products.",
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-md"
            >
              <div className="mb-4">{icon}</div>
              <h3 className="text-xl font-semibold text-black mb-2">{title}</h3>
              <p className="text-gray-700 text-base leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-7 text-center italic text-gray-500 font-medium max-w-3xl mx-auto">
          Opening a local bank account is one of the smartest steps to
          confidently manage your finances and stay financially empowered while
          you study abroad.
        </p>
      </motion.section>
      {/* Types of Student Bank Accounts */}
      <motion.section
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className=" w-full max-w-[1400px] mx-auto px-6 py-10"
      >
        <h2 className="text-3xl font-bold text-black mb-10 text-center">
          Different Types of Student Bank Accounts in These Countries
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {typesOfAccounts.map(({ type, idealFor, features, icon }) => (
            <motion.div
              key={type}
              className="bg-white rounded-xl p-8 shadow-xl border border-blue-100 hover:shadow-2xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-start space-x-3 mb-4">
                {icon}
                <h3 className="text-2xl font-semibold text-black">{type}</h3>
              </div>
              <p className="mb-5 italic text-gray-700">{idealFor}</p>
              <h4 className="font-semibold text-black mb-3">Main Features</h4>
              <ul className="list-disc pl-5    space-y-1 text-gray-700">
                {features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.section>
      {/* Top Banks Section */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-blue-50 py-14"
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 py-10 bg-white rounded-lg shadow-lg border border-blue-100">
          <h2 className="text-3xl font-bold text-black mb-10 text-center">
            {data?.top_bank_heading ||
              "Top Banks in These Countries for International Students"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {data &&
              data?.top_banks &&
              data?.top_banks?.map((bank, i) => (
                <div
                  key={bank?.id || i}
                  className="relative p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                  style={{
                    backgroundImage: `url(${bank?.background_image?.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/70"></div>

                  {/* Content */}
                  <div className="relative z-10 text-white">
                    <h3 className="text-xl font-semibold mb-6">
                      {bank?.country}
                    </h3>
                    <ul className="space-y-3">
                      {bank &&
                        bank?.list?.map((li, i) => {
                          const { icon, color } =
                            iconsByIndex[i] ?? iconsByIndex[0];
                          return (
                            <li
                              key={li?.id || i}
                              className="flex items-center space-x-3 text-white text-base md:text-lg"
                            >
                              <span
                                style={{ color }}
                                className="text-2xl md:text-3xl"
                              >
                                {icon}
                              </span>
                              <span>{li?.list}</span>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </motion.section>
      ;{/* Eligibility Criteria */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full max-w-[700px] mx-auto px-6 py-10"
      >
        <h2 className="text-3xl font-bold text-black mb-10 text-center">
          Eligibility Criteria
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 text-gray-800 text-lg">
          {eligibilityCriteriaCommon.map(({ icon, text }, idx) => (
            <li key={idx} className="flex items-start space-x-3">
              <span className="mt-1">{icon}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </motion.section>
      {/* Steps to Open a Bank Account */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full max-w-[1000px] mx-auto px-6 py-12"
      >
        <h2 className="text-3xl font-bold text-black mb-12 text-center">
          Steps to Open a Bank Account
        </h2>

        {/* Horizontal scroll on mobile with snap */}
        <ol className="flex space-x-6 overflow-x-auto no-scrollbar snap-x snap-mandatory sm:overflow-visible sm:space-x-12">
          {stepsToOpenAccount.map(({ step, icon }, idx) => (
            <li
              key={step}
              className="snap-center flex-shrink-0 w-[160px] flex flex-col items-center text-center"
            >
              <span className="text-blue-600 text-6xl drop-shadow-md mb-4 flex justify-center items-center">
                {icon}
              </span>
              <span className="text-gray-900 font-semibold text-base leading-snug">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </motion.section>
      {/* Call To Action */}
      <div className="flex flex-col items-center pb-7">
        <button
          className="px-8 py-4 rounded-2xl bg-red-600  text-white font-bold text-lg shadow hover:shadow-xl transition"
          onClick={() => setShowPopup(true)}
        >
          Start Your Application
        </button>
        {showPopup && <DelayedPopup onMinimize={handlePopupClose} />}
        <span className="mt-2 text-sm text-gray-500">
          Support available for every step!
        </span>
      </div>
    </div>
  );
};

export default BankAccount;
