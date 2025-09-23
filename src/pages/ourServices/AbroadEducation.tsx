import { Button } from "@/components/ui/button";
import { House, SquareCheckBig } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import {
  Activity, // Multiple Lenders
  Layers, // Tailored Loan Options
  Download, // Expert Guidance
  HelpCircle, // Simplified Process
  CreditCard, // Competitive Rates
  LifeBuoy, // Post-Loan Support
} from "lucide-react";
import AbroadForm from "./AbroadForm";
import Banksloans from "../Banksloans";
import DelayedPopup from "@/components/DelayedPopup";
const features = [
  {
    title: "Multiple Lenders",
    description:
      "Gain access to a wide network of trusted lenders, allowing you to compare and choose the best loan terms for your specific needs. Our platform partners with a diverse group of financial institutions, giving you more options and a better chance of finding a loan that fits your financial situation. You'll no longer be limited to a single bank's offering, which can save you money and give you peace of mind.",
    icon: <Activity className="h-8 w-8 text-red-600" />,
    image: "/assets/images/Multiple-Lenders.jpg",
  },
  {
    title: "Tailored Loan Options",
    description:
      "We help you find loan options specifically designed for students studying abroad, with flexible terms and competitive interest rates. Your study abroad journey is unique, and your loan should be, too. We match you with lenders who understand the specific needs of international students, offering features like grace periods after graduation, flexible repayment plans, and competitive rates that are hard to find on your own.",
    icon: <Layers className="h-8 w-8 text-red-600" />,
    image: "/assets/images/TailoredLoan-Options.jpg",
  },
  {
    title: "Expert Guidance",
    description:
      "Our loan experts provide personalized advice, walking you through the entire application process to ensure a smooth experience. The world of student loans can be complex and overwhelming. Our team of experts will be with you every step of the way, from understanding the different types of loans available to gathering your documents and submitting your application. We're here to answer all your questions and make sure you feel confident about your financial decisions.",
    icon: <Download className="h-8 w-8 text-red-600" />,
    image: "/assets/images/Expert-Guidance.jpg",
  },
  {
    title: "Simplified Process",
    description:
      "We've streamlined the application process to save you time and reduce complexity, so you can focus on preparing for your studies. Applying for a loan shouldn't add to your pre-departure stress. Our user-friendly platform digitizes and simplifies the entire process. You can fill out your application online, upload documents securely, and track your loan status without the hassle of endless paperwork and in-person visits.",
    icon: <HelpCircle className="h-8 w-8 text-red-600" />,
    image: "/assets/images/Simplified-Process.jpg",
  },
  {
    title: "Competitive Rates",
    description:
      "Our platform helps you compare competitive interest rates from different lenders, ensuring you get the most affordable loan possible. A lower interest rate means you'll pay less over the life of your loan. We provide transparent comparisons of rates and fees from multiple lenders, giving you the power to choose a loan that won't burden you with excessive long-term costs.",
    icon: <CreditCard className="h-8 w-8 text-red-600" />,
    image: "/assets/images/CompetitiveRates.jpg",
  },
  {
    title: "Post-Loan Support",
    description:
      "Our support doesn't end when the loan is disbursed. We're here to help you with any questions or issues that arise throughout your studies. Your relationship with us continues long after you've received your funds. Whether you have questions about your repayment schedule, need to understand your loan terms better, or face an unexpected financial issue, our support team is just a call or message away, ready to assist you throughout your academic journey.",
    icon: <LifeBuoy className="h-8 w-8 text-red-600" />,
    image: "/assets/images/Post-Loan-Support.jpg",
  },
];
const AbroadEducation: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupClose = () => {
    setShowPopup(false);
  };
  return (
    <div className="w-full font-sans">
      {/* Hero Section */}
      <section className="relative bg-[#2563eb] text-white pt-32 pb-10 lg:pt-40 lg:pb-36">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-right "
          style={{
            backgroundImage: "url('/assets/images/ourservices-img.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/70 md:bg-black/50" />{" "}
          {/* overlay */}
        </div>

        {/* Content */}
        <div className="relative w-full max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Side */}
          <div className="space-y-6">
            {/* Breadcrumb with Home icon */}
            <p className="text-sm opacity-90 flex items-center gap-2">
              <Link
                to="/"
                className="flex items-center gap-1 hover:text-yellow-300"
              >
                <House className="h-5 w-5" />
                Home
              </Link>
              <span>
                <ChevronRight className="h-5 w-5" />
              </span>
              <span>Abroad Education Loan</span>
            </p>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Abroad Education Loan
            </h1>

            {/* Highlights */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Fund Up to 100% of Your Education",
                "Don't Let Finances Stop You",
                "Competitive Interest Rates",
                "Flexible Repayment Options",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-white">
                  <SquareCheckBig className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="flex gap-4 flex-wrap">
              <a
                href="/tools/gpa-calculator"
                className="px-3 py-2 text-white bg-red-600 font-semibold rounded-lg"
              >
                Check Eligibility
              </a>

              <Button
                variant="secondary"
                className="bg-white text-red-600 hover:bg-red-600 hover:text-white font-semibold"
                onClick={() => setShowPopup(true)}
              >
                Apply Now
              </Button>
              {showPopup && <DelayedPopup onMinimize={handlePopupClose} />}
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-10 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-6 ">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
            How it <span className="text-red-600">Works?</span>
          </h2>
          <p className=" text-gray-600 text-lg mb-3 leading-relaxed text-justify">
            We believe the path to your education should be simple and
            stress-free. Our process is designed to be as seamless as possible,
            guiding you from your initial inquiry to the final loan
            disbursement. We handle the complexities so you can focus on what
            matters most—your studies. Follow our easy steps below to get
            started on your journey today.
          </p>
          <div className="">
            <img
              src="/assets/images/abroad-ed-loan-steps.jpg"
              alt="How it Works Desktop"
              className="hidden md:block mx-auto w-full max-w-[1200px]"
            />
            {/* Mobile Image */}
            <img
              src="/assets/images/abroad-mobil-steps.jpg"
              alt="How it Works Mobile"
              className="block md:hidden mx-auto w-full max-w-[400px]"
            />
          </div>
        </div>
      </section>

      {/* Why Need a Loan */}
      <section className="py-10 bg-gray-50">
        <div className="w-full max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Why Do You Need an Education Loan for{" "}
              <span className="text-red-600">Abroad Studies?</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              The cost of educational institutions abroad is rising day by day,
              and securing a loan is a smart move to manage your finances and
              focus on your studies.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full text-red-600 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
                Manage Rising Costs
              </h3>
              <p className="text-gray-600 text-center">
                The costs of tuition, accommodation, and living expenses abroad
                can be overwhelming. An education loan provides a comprehensive
                financial safety net.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full text-red-600 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="10"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
                Comprehensive Funding
              </h3>
              <p className="text-gray-600 text-center">
                Loans often cover more than just tuition, including books,
                travel, and living expenses, ensuring you're fully prepared for
                your journey.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-purple-100 p-3 rounded-full text-red-600 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-2">
                Ease Your Family's Burden
              </h3>
              <p className="text-gray-600 text-center">
                Taking a loan can alleviate the financial strain on your
                parents, allowing you to take full ownership of your educational
                journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-10 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-6 ">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Advantages of Study Loan for{" "}
              <span className="text-red-600">Abroad Studies</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              An education loan is more than just a financial tool; it's an
              investment in your future that offers numerous benefits beyond
              just covering costs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Advantage Card 1 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start p-6 rounded-lg bg-gray-50 border border-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <div className="flex-shrink-0">
                {/* Icon for Financial Independence */}
                <img
                  src="/assets/images/Financial-Independence.gif"
                  alt="Financial Independence"
                />
              </div>
              <div className="ml-0 sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
                <h3 className="text-xl font-bold text-gray-800">
                  Financial Independence
                </h3>
                <p className="mt-2 text-gray-600">
                  Support your education without burdening your parents'
                  financial situation, giving you a sense of ownership and
                  responsibility.
                </p>
              </div>
            </div>

            {/* Advantage Card 2 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start p-6 rounded-lg bg-gray-50 border border-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <div className="flex-shrink-0">
                {/* Icon for Comprehensive Coverage */}
                <img
                  src="/assets/images/CoverAllYourNeeds.gif"
                  alt="CoverAllYourNeeds"
                />
              </div>
              <div className="ml-0 sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
                <h3 className="text-xl font-bold text-gray-800">
                  Cover All Your Needs
                </h3>
                <p className="mt-2 text-gray-600">
                  A student loan helps cover not just tuition fees but also
                  living expenses, books, and travel, so you can focus on your
                  studies.
                </p>
              </div>
            </div>

            {/* Advantage Card 3 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start p-6 rounded-lg bg-gray-50 border border-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <div className="flex-shrink-0">
                {/* Icon for Flexible Repayment */}
                <img
                  src="/assets/images/Flexible-Repayment.gif"
                  alt="Flexible-Repayment"
                />
              </div>
              <div className="ml-0 sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
                <h3 className="text-xl font-bold text-gray-800">
                  Flexible Repayment Options
                </h3>
                <p className="mt-2 text-gray-600">
                  Benefit from flexible repayment plans that often begin after
                  you have graduated and found employment, giving you peace of
                  mind.
                </p>
              </div>
            </div>

            {/* Advantage Card 4 */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start p-6 rounded-lg bg-gray-50 border border-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <div className="flex-shrink-0">
                {/* Icon for Credit History */}
                <img
                  src="/assets/images/Financial-Discipline.gif"
                  alt="Build-Financial-Discipline"
                />
              </div>
              <div className="ml-0 sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
                <h3 className="text-xl font-bold text-gray-800">
                  Build Financial Discipline
                </h3>
                <p className="mt-2 text-gray-600">
                  Taking on and managing a loan responsibly helps you build a
                  strong credit history and develop financial discipline for the
                  future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose VSource */}
      <section className="py-10 bg-gray-50">
        <div className="w-full max-w-[1400px] mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              Why Choose <span className="text-red-600">VSource</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a tailored approach to secure your education loan,
              ensuring you have the support and resources you need for your
              academic journey.
            </p>
          </div>

          {/* Features Section */}
          <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Left Side: Navigation Panel */}
            <div className="w-full md:w-1/3 p-6 bg-blue-600 flex flex-col space-y-3">
              <h2 className="text-2xl font-bold text-white mb-4">
                Our Features
              </h2>
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`group flex items-center p-1 rounded-lg transition-all duration-300
                                    ${
                                      index === activeIndex
                                        ? " text-yellow-400"
                                        : "text-white  "
                                    }`}
                >
                  <div
                    className={`p-2.5 rounded-full transition-all duration-300 animate-pulse-scale bg-white
                                            }`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className="ml-3 font-medium text-base sm:text-lg">
                    {feature.title}
                  </h3>
                </button>
              ))}
            </div>

            {/* Right Side: Feature Content */}
            <div className="w-full md:w-2/3 relative flex items-end justify-end min-h-[320px] sm:min-h-[400px]">
              {/* Background Image */}
              <img
                src={features[activeIndex].image}
                alt={features[activeIndex].title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70"></div>

              {/* Content */}
              <div
                key={activeIndex}
                className="relative z-10 px-6 sm:px-10 py-8 text-center md:text-left text-white transition-opacity duration-500"
              >
                <h3 className="text-2xl sm:text-4xl font-extrabold mb-3 leading-tight">
                  {features[activeIndex].title}
                </h3>
                <p className="text-base sm:text-lg font-light leading-relaxed max-w-2xl text-justify">
                  {features[activeIndex].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Eligibility */}
      <section className="py-10">
        <div className="w-full max-w-[1400px] mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Eligibility for an Education Loan
          </h2>
          <p className="mb-10 text-gray-700 text-center">
            Applicants must meet the following criteria to qualify:
          </p>

          <div className="w-full">
            {/* Desktop Table */}
            <div className="hidden md:block">
              <table className="w-full border border-gray-300 border-collapse text-left text-sm rounded-xl overflow-hidden shadow-md">
                <thead className="bg-red-600 text-white text-base">
                  <tr>
                    <th className="p-4 border-r border-gray-300 w-1/3">
                      Criteria
                    </th>
                    <th className="p-4">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Income Proof",
                      "Parent/co-borrower must show repayment ability (salary slips, bank statements, or ITR).",
                    ],
                    [
                      "Nationality",
                      "Must be an Indian citizen. NRIs/foreign students applying in India need RBI approvals.",
                    ],
                    [
                      "Age",
                      "Typically 18–35 years at application. Some banks may extend based on program.",
                    ],
                    [
                      "Admission Status",
                      "Confirmed admission to a recognized university/institution is mandatory.",
                    ],
                    [
                      "Co-borrower Requirement",
                      "Most lenders require a parent, guardian, or spouse as co-borrower/guarantor.",
                    ],
                    [
                      "Academic Performance",
                      "Good academic track record required. Minimum score cut-off applies for unsecured loans.",
                    ],
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className={`hover:bg-gray-50 transition-colors ${
                        i % 2 === 0 ? "bg-white" : "bg-red-50"
                      }`}
                    >
                      <td className="p-4 font-medium text-gray-800 border-r border-gray-300">
                        {row[0]}
                      </td>
                      <td className="p-4 text-gray-700">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {[
                [
                  "Income Proof",
                  "Parent/co-borrower must show repayment ability with salary slips, bank statements, or ITR.",
                ],
                [
                  "Nationality",
                  "Indian citizen. NRIs/foreign students need RBI approval when applying in India.",
                ],
                [
                  "Age",
                  "Must be between 18–35 years (flexible for some programs).",
                ],
                [
                  "Admission Status",
                  "Admission to a recognized university is mandatory (provisional may be accepted).",
                ],
                [
                  "Co-borrower Requirement",
                  "Parent, guardian, or spouse usually required as co-borrower.",
                ],
                [
                  "Academic Performance",
                  "Strong academic record needed. Cut-off scores apply for unsecured loans.",
                ],
              ].map((row, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
                >
                  <p className="font-semibold text-red-600 mb-2">{row[0]}</p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {row[1]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Loan Partners Section */}
      <Banksloans />
      {/* Loan Schemes */}
      <section className="py-10 bg-gray-50">
        <div className="w-full max-w-[1400px] mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Loan Schemes and Lenders
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200 text-sm">
              <thead>
                <tr className="bg-purple-600 text-white">
                  <th className="border border-gray-200 px-4 py-3 text-left">
                    Bank
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left">
                    Loan Scheme
                  </th>
                  <th className="border border-gray-200 px-4 py-3 text-left">
                    Repayment Tenure
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    bank: "State Bank of India",
                    scheme: "SBI Global Ed-Vantage Scheme",
                    tenure: "Up to 15 years",
                  },
                  {
                    bank: "Punjab National Bank",
                    scheme: "PNB Udaan",
                    tenure: "Up to 15 years",
                  },
                  {
                    bank: "Bank of Baroda",
                    scheme: "Baroda Scholar",
                    tenure: "Up to 10 years",
                  },
                  {
                    bank: "HDFC Bank",
                    scheme: "HDFC Credila Education Loan",
                    tenure: "Up to 12 years",
                  },
                  {
                    bank: "Axis Bank",
                    scheme: "Axis Bank Education Loan",
                    tenure: "Up to 15 years",
                  },
                  {
                    bank: "Indian Bank",
                    scheme: "Indian Bank Overseas Education Loan",
                    tenure: "Up to 15 years",
                  },
                  {
                    bank: "Indian Overseas Bank",
                    scheme: "Vidya Jyoti",
                    tenure: "Repayment period + 1 year",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className="odd:bg-white even:bg-gray-100 hover:bg-purple-50"
                  >
                    <td className="border border-gray-200 px-4 py-3">
                      {row.bank}
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      {row.scheme}
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      {row.tenure}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <AbroadForm />
      <style>
        {`
  @keyframes pulse-scale {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }

  .animate-pulse-scale {
    animation: pulse-scale 2s ease-in-out infinite;
  }
  
  .scroll-smooth {
    scroll-behavior: smooth;
  }
`}
      </style>
    </div>
  );
};

export default AbroadEducation;
