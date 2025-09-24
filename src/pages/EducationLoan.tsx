import React, {useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle, ChevronRight, House, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    IdCard,
    Home,
    Image as ImageIcon,
    BookOpen,
    FileText,
    Wallet,
    FileSignature,
    Building,
} from "lucide-react";
import DelayedPopup from "@/components/DelayedPopup";
interface BenefitItem {
  id: number;
  image: string;
  heading: string;
  paragraph: string;
}
const documentData = [
    {
        icon: <IdCard className="w-5 h-5 text-red-600" />,
        type: "Proof of Identity",
        applicant: "Aadhaar Card, Passport, Voter ID",
        coApplicant: "Aadhaar Card, PAN Card",
        note: "All documents must be valid and self-attested."
    },
    {
        icon: <Home className="w-5 h-5 text-red-600" />,
        type: "Proof of Address",
        applicant: "Aadhaar Card, Utility Bill (latest), Rent Agreement",
        coApplicant: "Aadhaar Card, Utility Bill (latest)",
        note: "Address proof should not be older than 3 months."
    },
    {
        icon: <ImageIcon className="w-5 h-5 text-red-600" />,
        type: "Photographs",
        applicant: "2 recent passport-size photos",
        coApplicant: "2 recent passport-size photos",
        note: "Photos must be in color with a clear background."
    },
    {
        icon: <BookOpen className="w-5 h-5 text-red-600" />,
        type: "Academic Records",
        applicant: "Mark sheets, Certificates (10th, 12th, Graduation)",
        coApplicant: "Not applicable",
        note: "Transcripts from all previous academic institutions required."
    },
    {
        icon: <FileText className="w-5 h-5 text-red-600" />,
        type: "Cost of Education",
        applicant: "Admission letter, Fee structure, Scholarship details (if any)",
        coApplicant: "Not applicable",
        note: "Provisional or confirmed admission letter is mandatory."
    },
    {
        icon: <Wallet className="w-5 h-5 text-red-600" />,
        type: "Income Proof",
        applicant: "Not applicable (unless employed)",
        coApplicant: "Salary slips, Bank statements (past 6 months), IT returns (past 2 years)",
        note: "Income proof for co-applicant is crucial for loan approval."
    },
    {
        icon: <FileSignature className="w-5 h-5 text-red-600" />,
        type: "Declaration",
        applicant: "Student declaration of income and assets",
        coApplicant: "Parent declaration of assets and liabilities",
        note: "Required to confirm financial information and liability."
    },
    {
        icon: <Building className="w-5 h-5 text-red-600" />,
        type: "Property Documents",
        applicant: "Not applicable",
        coApplicant: "Property papers, Valuation report, Legal opinion (if collateral is required)",
        note: "This is only required for a secured education loan."
    },
];
const faqs = [
    [
        "How much loan can a student get in India?",
        "Up to ₹1.5 Cr for abroad, ₹50L for domestic.",
    ],
    [
        "How to repay an education loan?",
        "Through EMIs after moratorium, via bank transfer/auto-debit.",
    ],
    ["What is the time period of an education loan?", "7–15 years depending on loan type."],
    [
        "Who is eligible for student education loan?",
        "Indian students with confirmed admission, meeting income/age criteria.",
    ],
    [
        "Can I get a 20 lakhs education loan?",
        "Yes, based on collateral or co-applicant strength.",
    ],
    [
        "How much interest on student loans?",
        "Typically 8–12% depending on secured/unsecured.",
    ],
    [
        "Which loan type is better?",
        "Secured for higher amounts, unsecured for quick smaller loans.",
    ],
    [
        "Is it OK to take loan for education?",
        "Yes, as it’s an investment in career and offers tax benefits.",
    ],
];
const loanFeatures = [
    { feature: "Collateral Requirement", secured: "Yes", unsecured: "No", proSecured: "✓", proUnsecured: "✗" },
    { feature: "Loan Amount", secured: "Higher (up to ₹1.5 Cr)", unsecured: "Lower (up to ₹50L)", proSecured: "✓", proUnsecured: "✗" },
    { feature: "Processing Time", secured: "10-15 days", unsecured: "5-7 days", proSecured: "✗", proUnsecured: "✓" },
    { feature: "Interest Rates", secured: "Lower", unsecured: "Higher", proSecured: "✓", proUnsecured: "✗" },
    { feature: "Repayment Duration", secured: "10-15 years", unsecured: "7-10 years", proSecured: "✓", proUnsecured: "✗" },
    { feature: "Moratorium Period", secured: "Yes", unsecured: "Yes", proSecured: "✓", proUnsecured: "✓" },
    { feature: "Documentation Required", secured: "More (property papers, etc.)", unsecured: "Less", proSecured: "✗", proUnsecured: "✓" },
];
// Loan details data
const loanData = {
    secured: {
        title: 'Secured Education Loan',
        description: 'A robust loan option backed by collateral, offering stability and greater financial support for your educational dreams. This is ideal for high-value courses and international studies, providing peace of mind with favorable terms.',
        features: [
            'Higher Loan Amount (up to $1.5M)',
            'Significantly Lower Interest Rates',
            'Longer Repayment Tenures (up to 15 years)',
            'Requires Collateral (property, fixed deposits, etc.)',
            'Faster processing for pre-approved properties',
        ],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 11V9a2 2 0 012-2h0a2 2 0 012 2v2" />
            </svg>
        ),
        bgColor: 'bg-blue-600',
    },
    unsecured: {
        title: 'Unsecured Education Loan',
        description: 'A flexible loan that does not require collateral, providing a fast and easy path to funding your education. This option is perfect for students with a strong academic record and a need for quick, hassle-free financing.',
        features: [
            'No Collateral Required',
            'Faster Approval (within 48 hours)',
            'Minimal Documentation',
            'Higher Interest Rates',
            'Lower Loan Amount (up to $75K)',
        ],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0v4m-1.5 6h-7a2 2 0 01-2-2v-6a2 2 0 012-2h7a2 2 0 012 2v6a2 2 0 01-2 2z" />
            </svg>
        ),
        bgColor: 'bg-purple-600',
    },
};
interface BenefitItem {
  id: number;
  image: string;
  heading: string;
  paragraph: string;
}

const benefitData: BenefitItem[] = [
  { id: 1, image: "/assets/images/benfit-1.png", heading: "Enhanced Productivity", paragraph: "Streamline your workflow and get more done in less time with our intuitive tools." },
  { id: 2, image: "/assets/images/benfit-2.png", heading: "Improved Collaboration", paragraph: "Work together seamlessly with your team on shared projects, no matter where you are." },
  { id: 3, image: "/assets/images/benfit-3.png", heading: "Cost Savings", paragraph: "Reduce overhead and lower operational costs by adopting our efficient platform." },
  { id: 4, image: "/assets/images/benfit-4.png", heading: "Data-Driven Decisions", paragraph: "Gain valuable insights from your data to make smarter, more informed business choices." },
  { id: 5, image: "/assets/images/benfit-5.png", heading: "Scalable Solutions", paragraph: "Our solution grows with you, providing the flexibility to handle your expanding needs." },
  { id: 6, image: "/assets/images/benfit-6.png", heading: "Increased Security", paragraph: "Protect your sensitive information with our robust, industry-leading security features." },
  { id: 7, image: "/assets/images/benfit-7.png", heading: "Customer Satisfaction", paragraph: "Delight your customers with a seamless experience and exceptional support." },
  { id: 8, image: "/assets/images/benfit-8.png", heading: "Market Expansion", paragraph: "Enter new markets and reach a wider audience with our global-ready capabilities." },
  { id: 9, image: "/assets/images/benfit-9.png", heading: "Swift Approvals", paragraph: "The streamlined approval process of an online education loan ensures prompt access to the necessary support" }
];
const EducationLoan: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [activeLoan, setActiveLoan] = useState('secured');
    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;

    const scroll = () => {
      if (!isPaused) {
        container.scrollLeft += 1;

        // when we reach halfway (first dataset fully scrolled), reset smoothly
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);
  
      const [activeIndex, setActiveIndex] = useState(0);
   const [showPopup, setShowPopup] = useState(false);
        
          const handlePopupClose = () => {
            setShowPopup(false);
          };
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative lg:text-white pt-28 pb-5 lg:pb-20 lg:pt-36 overflow-hidden">
                <div className="w-full max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
                    <div className="space-y-6">
                        <p className="text-sm opacity-90 flex items-center gap-2">
                            <Link to="/" className="flex items-center gap-1 hover:text-red-600">
                                <House className="h-5 w-5" />
                                Home
                            </Link>
                            <span>/</span>
                            <span>Education Loan</span>
                        </p>
                        <div className="block lg:hidden my-6">
                            <img
                                src="/assets/images/education-loans.jpg"
                                alt="Education Loan"
                                className="w-full h-auto object-cover rounded-xl"
                            />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                            Student Education Loans
                        </h1>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                                "No Credit History Required",
                                "Build Your U.S. Credit Score from Day One",
                                "Easy Online Application",
                                "Exclusive Student Rewards",
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 lg:text-white">
                                    <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
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
                            onClick={() => setShowPopup(true)}>
                                Apply Now
                            </Button>
                             {showPopup && <DelayedPopup onMinimize={handlePopupClose} />}
                        </div>
                    </div>
                </div>
                <div className="hidden lg:block absolute inset-0">
                    <img
                        src="/assets/images/education-loan.png"
                        alt="Education Loan"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>
            </section>




            <section>
                <div className="w-full max-w-[1400px] mx-auto px-6">
                    <div className="py-10">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-3xl">
                            Student Loan
                        </h2>
                        <p className="text-gray-600 mb-4 md:text-base text-justify">
                            A student loan is a form of financial aid that helps students pay for higher education expenses, including tuition, fees, books, and living costs. Unlike grants or scholarships, a loan must be repaid, usually with interest. These loans can be a critical tool for those who cannot afford college outright, but it's essential to understand the terms and conditions.
                        </p>
                        <p className="text-gray-600 md:text-base text-justify">
                            Choosing a student loan is a significant financial decision that can affect your finances for years after graduation. It's crucial to borrow only what you need and to explore all your options, including scholarships, grants, and federal work-study programs, before taking on debt. Once you have a loan, managing it wisely is key.
                        </p>
                    </div>
                </div>
                <div className="bg-white py-12 px-4 md:px-8 overflow-hidden">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-3xl text-center">
        Top Benefits
      </h2>
      <div
        ref={containerRef}
        className="flex space-x-8 pb-4 overflow-x-scroll scrollbar-hide"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          WebkitOverflowScrolling: "touch",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {[...benefitData, ...benefitData].map((benefit, idx) => (
          <div
            key={idx} // use index here since data is duplicated
            className="relative flex-shrink-0 w-72 h-96 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 p-4 text-white bg-gradient-to-b from-black/60 to-transparent">
              <h3 className="text-xl font-bold mb-1">{benefit.heading}</h3>
              <p className="text-sm font-medium">{benefit.paragraph}</p>
            </div>
            <img
              src={benefit.image}
              alt={benefit.heading}
              className="w-72 h-96 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
            </section>
            <section>
                <div className="w-full max-w-[1400px] mx-auto px-6">
                    <div className="py-2">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-3xl">
                            Education Loan EMI Calculator
                        </h2>
                        <p className="text-gray-600 mb-4 md:text-base text-justify">
                            Use our Education Loan EMI Calculator to estimate your monthly
                            installments instantly. Adjust loan amount, interest rate, and tenure
                            to plan repayments with confidence. This tool helps students and
                            parents understand repayment obligations clearly and make informed
                            financial decisions before borrowing.
                        </p>
                    </div>

                    <div className="py-2">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-3xl">
                            Education Loan Eligibility
                        </h2>
                        <p className="text-gray-600 mb-4 md:text-base text-justify">
                            Check the eligibility criteria such as age, academic background, and
                            co-applicant income requirements. Ensure you meet the lender’s
                            conditions before applying for a loan. Typically, a confirmed admission
                            letter, good academic track record, and co-borrower support are
                            mandatory for approval.
                        </p>
                    </div>

                    <div className="py-2">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-3xl">
                            Education Loan Tax Deduction Under 80E
                        </h2>
                        <p className="text-gray-600 mb-4 md:text-base text-justify">
                            Claim tax benefits on the interest paid towards education loans under
                            Section 80E of the Income Tax Act. Deductions are available for up to
                            8 years from the start of repayment. This benefit significantly reduces
                            the overall cost of borrowing, making higher education more affordable
                            for students and their families.
                        </p>
                    </div>

                    <div className="py-2">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-3xl">
                            Education Loan Interest Rates and Charges
                        </h2>
                        <p className="text-gray-600 mb-4 md:text-base text-justify">
                            Compare interest rates, processing fees, and other charges across
                            leading banks and NBFCs. Transparent cost details help you choose the
                            most affordable loan option. Interest rates may vary depending on
                            creditworthiness, institution type, and repayment tenure, so careful
                            evaluation is essential.
                        </p>
                    </div>

                    <div className="py-2">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-3xl">
                            Documents Required for an Education Loan
                        </h2>
                        <p className="text-gray-600 mb-4 md:text-base text-justify">
                            Prepare essential documents including admission proof, ID, address,
                            academic records, and co-applicant financials. Submitting complete
                            paperwork speeds up loan approval. Missing or inaccurate documents may
                            delay disbursal, so double-check requirements before applying to avoid
                            rejections.
                        </p>
                    </div>
                </div>


            </section>
{/* 
            <section className="py-16 bg-gray-50">
                <div className="w-full max-w-[1400px] mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-12">Explore Our Education Loans</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className="relative rounded-2xl shadow-md overflow-hidden"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: "url('/assets/images/Domestic-Education.png')" }}
                            />
                            <div className="absolute inset-0 bg-black/70" /> 

                            <div className="relative p-8 text-left space-y-4 text-white">
                                <h3 className="text-xl font-semibold">Domestic Education Loans</h3>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Quick approval process</li>
                                    <li>Competitive interest rates</li>
                                    <li>No collateral for smaller amounts</li>
                                </ul>
                                <Button className="mt-4 text-white bg-red-600 font-semibold">
                                    Speak to an Advisor
                                </Button>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            className="relative rounded-2xl shadow-md overflow-hidden"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: "url('/assets/images/Abroad-Education.jpg')" }}
                            />
                            <div className="absolute inset-0 bg-black/70" /> 

                            <div className="relative p-8 text-left space-y-4 text-white">
                                <h3 className="text-xl font-semibold">Abroad Education Loans</h3>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Covers tuition + living expenses</li>
                                    <li>Longer repayment tenure</li>
                                    <li>Moratorium period till course completion</li>
                                </ul>
                                <Button className="mt-4 text-white bg-red-600 font-semibold ">
                                    Speak to an Advisor
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>
            <section className="py-10 bg-white">
                <div className="w-full max-w-[1400px] mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-6 text-center">
                        Benefits of Education Loans
                    </h2>
                    <p className="text-center mb-12 text-gray-700 max-w-2xl mx-auto">
                        Education loans make higher studies affordable while offering financial
                        flexibility. Here are the key benefits:
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
                        {[
                            "All Expenses Coverage",
                            "Benefits in Taxes",
                            "Longer Repayment Tenure",
                            "Helps Build Credit",
                            "Affordable Interest Rates",
                            "Easy Application Process",
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className="relative flex flex-col items-center justify-center px-6 py-10 transition-all"
                                style={{
                                    clipPath:
                                        "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                                    background: "#c3c3c3",
                                    width: "180px",
                                    height: "200px",
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                                }}
                            >
                                <div className="w-12 h-12 mb-4 bg-red-600 text-white flex items-center justify-center rounded-full text-base font-bold shadow-md">
                                    {String(i + 1).padStart(2, "0")}
                                </div>
                                <p className="font-semibold text-center text-gray-800 text-sm leading-snug">
                                    {step}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-10 bg-gray-50">
                <div className="w-full max-w-[1400px] mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Types of Student Loan
                    </h2>

                    <div className="flex flex-col md:flex-row max-w-6xl mx-auto my-3 p-4 gap-8">
                        <div className="flex flex-col w-full md:w-1/3 space-y-4">
                            {Object.keys(loanData).map((key) => {
                                const isActive = activeLoan === key;
                                const data = loanData[key];
                                return (
                                    <button
                                        key={key}
                                        onClick={() => setActiveLoan(key)}
                                        className={`flex items-center text-left p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300
            ${isActive ? 'bg-white transform scale-105 ring-2 ring-offset-2 ring-gray-200' : 'bg-gray-100 hover:bg-gray-200'}
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200`}
                                    >
                                        <div className={`p-3 rounded-full mr-4 text-white ${data.bgColor}`}>
                                            {data.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg md:text-xl font-bold text-gray-800">
                                                {data.title}
                                            </h3>
                                            <p className="text-xs md:text-sm text-gray-500 mt-1">
                                                {key === 'secured' ? 'Lower rates, more security' : 'No collateral, faster process'}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                        <div className="w-full md:w-2/3">
                            {Object.keys(loanData).map((key) => {
                                const isActive = activeLoan === key;
                                const data = loanData[key];
                                return (
                                    <div
                                        key={key}
                                        className={`rounded-2xl bg-white shadow-xl p-6 md:p-8 transition-all duration-500
            ${isActive ? 'block opacity-100' : 'hidden opacity-0'}`}
                                    >
                                        <h2 className={`text-2xl md:text-4xl font-extrabold mb-4 ${isActive ? data.bgColor.replace('bg', 'text') : ''}`}>
                                            {data.title}
                                        </h2>
                                        <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
                                            {data.description}
                                        </p>
                                        <ul className="text-gray-700 list-disc list-inside space-y-2 text-sm md:text-base">
                                            {data.features.map((feature, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className={`h-2 w-2 rounded-full mt-2 mr-2 ${data.bgColor}`}></span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-6 md:mt-8">
                                            <button
                                                className={`w-full md:w-auto py-3 px-6 md:py-4 md:px-8 rounded-full font-bold text-white transition-transform duration-300 transform hover:-translate-y-1 ${data.bgColor} shadow-lg`}
                                            >
                                                Apply Now
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 flex items-center justify-center p-2 min-h-screen">
                    <div className="w-full max-w-[1400px] mx-auto px-6 my-3">
                        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2 pt-3">
                            Find Your Perfect Loan
                        </h1>
                        <p className="text-center text-gray-600 mb-8">
                            A clear comparison to help you choose between Secured and Unsecured Loans.
                        </p>

                        <div className="hidden md:block">
                            <table className="w-full text-left rounded-xl overflow-hidden shadow-lg border border-gray-300 border-collapse">
                                <thead className="bg-red-600 text-white text-lg">
                                    <tr>
                                        <th className="p-4 border-r border-gray-300 rounded-tl-xl">Feature</th>
                                        <th className="p-4 border-r border-gray-300">Secured Loan</th>
                                        <th className="p-4 rounded-tr-xl">Unsecured Loan</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loanFeatures.map((row, i) => (
                                        <tr
                                            key={i}
                                            className={`transition-colors duration-200 ${i % 2 === 0 ? 'bg-white' : 'bg-red-50'
                                                } hover:bg-gray-100`}
                                        >
                                            <td className="p-4 font-semibold text-gray-800 border-r border-gray-300">
                                                {row.feature}
                                            </td>
                                            <td className="p-4 border-r border-gray-300">
                                                <span className="flex items-center space-x-2">
                                                    <span
                                                        className={`text-xl ${row.proSecured === '✓' ? 'text-green-500' : 'text-red-500'}`}
                                                    >
                                                        {row.proSecured}
                                                    </span>
                                                    <span>{row.secured}</span>
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className="flex items-center space-x-2">
                                                    <span
                                                        className={`text-xl ${row.proUnsecured === '✓' ? 'text-green-500' : 'text-red-500'}`}
                                                    >
                                                        {row.proUnsecured}
                                                    </span>
                                                    <span>{row.unsecured}</span>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="md:hidden space-y-4">
                            {loanFeatures.map((row, i) => (
                                <div
                                    key={i}
                                    className={`border border-red-200 rounded-xl p-6 shadow-md transition-shadow duration-300 hover:shadow-lg ${i % 2 === 0 ? 'bg-red-50' : 'bg-red-100'
                                        }`}
                                >
                                    <h3 className="font-bold text-lg text-red-700 mb-3">{row.feature}</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-gray-700">
                                            <span className="flex items-center font-semibold">
                                                Secured Loan:

                                            </span>
                                            <span className="text-right">
                                                <span
                                                    className={`me-2 text-lg ${row.proSecured === '✓' ? 'text-green-500' : 'text-red-500'
                                                        }`}
                                                >
                                                    {row.proSecured}
                                                </span>
                                                {row.secured}</span>
                                        </div>

                                        <div className="flex justify-between items-center text-gray-700">
                                            <span className="flex items-center font-semibold">
                                                Unsecured Loan:

                                            </span>
                                            <span className="text-right">
                                                <span
                                                    className={`me-2 text-lg ${row.proUnsecured === '✓' ? 'text-green-500' : 'text-red-500'
                                                        }`}
                                                >
                                                    {row.proUnsecured}
                                                </span>
                                                {row.unsecured}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

            </section>
            <section className="py-10">
                <div className="w-full max-w-[1400px] mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                        Eligibility for an Education Loan
                    </h2>
                    <p className="mb-10 text-gray-700 text-center">
                        Applicants must meet the following criteria to qualify:
                    </p>

                    <div className="w-full">
                        <div className="hidden md:block">
                            <table className="w-full border border-gray-300 border-collapse text-left text-sm rounded-xl overflow-hidden shadow-md">
                                <thead className="bg-red-600 text-white text-base">
                                    <tr>
                                        <th className="p-4 border-r border-gray-300 w-1/3">Criteria</th>
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
                                            className={`hover:bg-gray-50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-red-50"
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
                                    <p className="text-sm text-gray-700 leading-relaxed">{row[1]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-10 bg-gray-50">
                <div className="bg-gray-50 flex flex-col items-center">
                    <div className="w-full max-w-[1400px] mx-auto px-6 bg-white">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                            Documents Required for an Education Loan
                        </h2>
                        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                            To ensure a smooth loan application process, please prepare the following documents. The list is categorized for both the student and the co-applicant.
                        </p>
                    </div>

                  
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left rounded-xl overflow-hidden shadow-lg border-separate border-spacing-0 border border-gray-300">
                            <thead className="bg-red-600 text-white text-md">
                                <tr className="[&>th]:p-4 [&>th]:border-r [&>th]:border-white/20 [&>th:last-child]:border-r-0">
                                    <th className="rounded-tl-xl border-b border-white/20">Document Type</th>
                                    <th className="border-b border-white/20">Applicant (Student)</th>
                                    <th className="rounded-tr-xl border-b border-white/20">Co-Applicant</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documentData.map((row, i) => (
                                    <tr
                                        key={i}
                                        className={`border-t border-gray-200 transition-colors duration-200
                      ${i % 2 === 0 ? "bg-white" : "bg-red-50"} hover:bg-red-100`}
                                    >
                                        <td className="p-4 font-semibold text-gray-800 flex items-center gap-2 border-r border-gray-200">
                                            {row.icon}
                                            <span>{row.type}</span>
                                        </td>
                                        <td className="p-4 border-r border-gray-200">
                                            <p className="text-gray-700">{row.applicant}</p>
                                            <p className="text-xs text-gray-500 mt-1">{row.note}</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-gray-700">{row.coApplicant}</p>
                                            <p className="text-xs text-gray-500 mt-1">{row.note}</p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                    <div className="md:hidden space-y-5 p-4">
                        {documentData.map((row, i) => (
                            <div
                                key={i}
                                className={`border border-red-200 rounded-xl p-5 shadow-md transition-shadow duration-300 hover:shadow-lg ${i % 2 === 0 ? "bg-red-50" : "bg-red-100"
                                    }`}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    {row.icon}
                                    <h3 className="font-bold text-lg text-red-700">{row.type}</h3>
                                </div>
                                <div className="space-y-4 text-sm text-gray-700">
                                    <div className="p-3 bg-white rounded-lg shadow-inner">
                                        <p className="font-semibold text-gray-900 mb-1">Applicant (Student)</p>
                                        <p className="text-gray-700">{row.applicant}</p>
                                        <p className="text-xs text-gray-500 mt-1">{row.note}</p>
                                    </div>
                                    <div className="p-3 bg-white rounded-lg shadow-inner">
                                        <p className="font-semibold text-gray-900 mb-1">Co-Applicant</p>
                                        <p className="text-gray-700">{row.coApplicant}</p>
                                        <p className="text-xs text-gray-500 mt-1">{row.note}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-10 bg-gray-50">
                <div className="w-full max-w-[1400px] mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-16 text-center">
                        Repayment Process for Education Loan
                    </h2>

                    <div className="flex flex-col md:flex-row md:justify-between gap-8">
                        {[{
                            icon: "/assets/images/Search.gif",
                            title: "Understanding the Moratorium Period",
                            short: "Repayment begins 6–12 months after course completion.",
                            more: "During this period, you don’t need to pay EMIs. Interest may accrue depending on lender terms."
                        },
                        {
                            icon: "/assets/images/Repayment-Start.gif",
                            title: "Loan Repayment Start",
                            short: "EMI begins after moratorium.",
                            more: "Your repayment schedule is fixed by the bank. The EMI amount depends on tenure and interest rate."
                        },
                        {
                            icon: "/assets/images/Payment-Methods.gif",
                            title: "Payment Methods",
                            short: "ECS, net banking, auto-debit.",
                            more: "ECS mandates and online auto-debit facilities ensure you never miss a payment."
                        },
                        {
                            icon: "/assets/images/Prepayment-Options.gif",
                            title: "Prepayment Options",
                            short: "Allowed with minimal charges.",
                            more: "Prepayment can reduce your overall interest outgo, making your loan cheaper."
                        }
                        ].map((step, i) => (
                            <div
                                key={i}
                                className="relative group flex-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 p-6 rounded-2xl shadow-lg transition-all duration-300 hover:from-red-500 hover:to-red-600 hover:text-white"
                            >
                                {i !== 3 && (
                                    <div className="hidden md:block absolute top-1/2 right-[-25px] -translate-y-1/2 
                            w-0 h-0 border-t-[25px] border-b-[25px] border-l-[25px] border-transparent 
                            border-l-gray-200 group-hover:border-l-red-600 transition-all duration-300"></div>
                                )}

                                <div className="flex justify-center m-2  md:mt-[-30%] mt-0">
                                    <img
                                        src={step.icon}
                                        alt={step.title}
                                        className="w-28 h-28 object-cover transform transition duration-1000 ease-in-out group-hover:rotate-[720deg] border-2 md:bg-white md:border-white rounded-full"
                                    />
                                </div>
                                <h3 className="font-semibold text-lg text-center mb-2">{step.title}</h3>

                                <p className="text-sm text-center">{step.short}</p>
                                <div className="mt-4 text-sm text-center md:absolute md:left-0 md:top-full md:mt-2 
                          md:w-full md:bg-white md:text-gray-800 md:shadow-lg md:rounded-lg 
                          md:p-4 md:opacity-0 md:group-hover:opacity-100 
                          md:transition-opacity md:duration-300 md:z-10">
                                    <p>{step.more}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}


            {/* FAQ Section */}


            <section className="py-20 bg-gray-50">
                <div className="w-full max-w-[1000px] mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-xl shadow-md border border-gray-200"
                            >
                                {/* Question Row */}
                                <button
                                    onClick={() => toggleFAQ(i)}
                                    className="w-full flex justify-between items-center p-5 text-left"
                                >
                                    <span className="font-semibold">{faq[0]}</span>
                                    {openIndex === i ? (
                                        <Minus className="w-5 h-5 text-red-600" />
                                    ) : (
                                        <Plus className="w-5 h-5 text-red-600" />
                                    )}
                                </button>

                                {/* Answer with animation */}
                                <AnimatePresence initial={false}>
                                    {openIndex === i && (
                                        <motion.div
                                            key="content"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden px-5 pb-4"
                                        >
                                            <p className="text-gray-700">{faq[1]}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* CTA Section */}
            <section className="py-10 lg:py-16 bg-gradient-primary text-white">
                <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                            Ready to Start Your Journey?
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Get personalized loan options and scholarship opportunities in minutes
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-8">
                                <Link to="/contact">
                                    Get Started Now
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-8">
                                <Link to="/tools">Explore Tools</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default EducationLoan;
