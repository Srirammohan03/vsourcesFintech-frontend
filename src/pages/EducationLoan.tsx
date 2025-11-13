import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  House,
  Minus,
  Plus,
} from "lucide-react";
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
    note: "All documents must be valid and self-attested.",
  },
  {
    icon: <Home className="w-5 h-5 text-red-600" />,
    type: "Proof of Address",
    applicant: "Aadhaar Card, Utility Bill (latest), Rent Agreement",
    coApplicant: "Aadhaar Card, Utility Bill (latest)",
    note: "Address proof should not be older than 3 months.",
  },
  {
    icon: <ImageIcon className="w-5 h-5 text-red-600" />,
    type: "Photographs",
    applicant: "2 recent passport-size photos",
    coApplicant: "2 recent passport-size photos",
    note: "Photos must be in color with a clear background.",
  },
  {
    icon: <BookOpen className="w-5 h-5 text-red-600" />,
    type: "Academic Records",
    applicant: "Mark sheets, Certificates (10th, 12th, Graduation)",
    coApplicant: "Not applicable",
    note: "Transcripts from all previous academic institutions required.",
  },
  {
    icon: <FileText className="w-5 h-5 text-red-600" />,
    type: "Cost of Education",
    applicant: "Admission letter, Fee structure, Scholarship details (if any)",
    coApplicant: "Not applicable",
    note: "Provisional or confirmed admission letter is mandatory.",
  },
  {
    icon: <Wallet className="w-5 h-5 text-red-600" />,
    type: "Income Proof",
    applicant: "Not applicable (unless employed)",
    coApplicant:
      "Salary slips, Bank statements (past 6 months), IT returns (past 2 years)",
    note: "Income proof for co-applicant is crucial for loan approval.",
  },
  {
    icon: <FileSignature className="w-5 h-5 text-red-600" />,
    type: "Declaration",
    applicant: "Student declaration of income and assets",
    coApplicant: "Parent declaration of assets and liabilities",
    note: "Required to confirm financial information and liability.",
  },
  {
    icon: <Building className="w-5 h-5 text-red-600" />,
    type: "Property Documents",
    applicant: "Not applicable",
    coApplicant:
      "Property papers, Valuation report, Legal opinion (if collateral is required)",
    note: "This is only required for a secured education loan.",
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
  [
    "What is the time period of an education loan?",
    "7–15 years depending on loan type.",
  ],
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
  {
    feature: "Collateral Requirement",
    secured: "Yes",
    unsecured: "No",
    proSecured: "✓",
    proUnsecured: "✗",
  },
  {
    feature: "Loan Amount",
    secured: "Higher (up to ₹1.5 Cr)",
    unsecured: "Lower (up to ₹50L)",
    proSecured: "✓",
    proUnsecured: "✗",
  },
  {
    feature: "Processing Time",
    secured: "10-15 days",
    unsecured: "5-7 days",
    proSecured: "✗",
    proUnsecured: "✓",
  },
  {
    feature: "Interest Rates",
    secured: "Lower",
    unsecured: "Higher",
    proSecured: "✓",
    proUnsecured: "✗",
  },
  {
    feature: "Repayment Duration",
    secured: "10-15 years",
    unsecured: "7-10 years",
    proSecured: "✓",
    proUnsecured: "✗",
  },
  {
    feature: "Moratorium Period",
    secured: "Yes",
    unsecured: "Yes",
    proSecured: "✓",
    proUnsecured: "✓",
  },
  {
    feature: "Documentation Required",
    secured: "More (property papers, etc.)",
    unsecured: "Less",
    proSecured: "✗",
    proUnsecured: "✓",
  },
];
// Loan details data
const loanData = {
  secured: {
    title: "Secured Education Loan",
    description:
      "A robust loan option backed by collateral, offering stability and greater financial support for your educational dreams. This is ideal for high-value courses and international studies, providing peace of mind with favorable terms.",
    features: [
      "Higher Loan Amount (up to $1.5M)",
      "Significantly Lower Interest Rates",
      "Longer Repayment Tenures (up to 15 years)",
      "Requires Collateral (property, fixed deposits, etc.)",
      "Faster processing for pre-approved properties",
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 11V9a2 2 0 012-2h0a2 2 0 012 2v2"
        />
      </svg>
    ),
    bgColor: "bg-blue-600",
  },
  unsecured: {
    title: "Unsecured Education Loan",
    description:
      "A flexible loan that does not require collateral, providing a fast and easy path to funding your education. This option is perfect for students with a strong academic record and a need for quick, hassle-free financing.",
    features: [
      "No Collateral Required",
      "Faster Approval (within 48 hours)",
      "Minimal Documentation",
      "Higher Interest Rates",
      "Lower Loan Amount (up to $75K)",
    ],
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 11V7a4 4 0 118 0v4m-1.5 6h-7a2 2 0 01-2-2v-6a2 2 0 012-2h7a2 2 0 012 2v6a2 2 0 01-2 2z"
        />
      </svg>
    ),
    bgColor: "bg-purple-600",
  },
};
const benefitData: BenefitItem[] = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dch00stdh/image/upload/v1762857041/xtjytiamvgxbkgxd6a0u.jpg",
    heading: "Enhanced Productivity",
    paragraph:
      "Streamline your workflow and get more done in less time with our intuitive tools.",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762857042/zmrni2mldc7ec7f1tnvg.jpg",
    heading: "Improved Collaboration",
    paragraph:
      "Work together seamlessly with your team on shared projects, no matter where you are.",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762857041/mb3arbfq1n9xbmeoigpp.jpg",
    heading: "Cost Savings",
    paragraph:
      "Reduce overhead and lower operational costs by adopting our efficient platform.",
  },
  {
    id: 4,
    image:
      "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762857041/piucbmgbewi3wvbxlf0j.jpg",
    heading: "Data-Driven Decisions",
    paragraph:
      "Gain valuable insights from your data to make smarter, more informed business choices.",
  },
  {
    id: 5,
    image:
      "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762857041/arpvxtuiirygnopvwnf7.jpg",
    heading: "Scalable Solutions",
    paragraph:
      "Our solution grows with you, providing the flexibility to handle your expanding needs.",
  },
  {
    id: 6,
    image:
      "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762857042/uekr3umceflvwljf2un5.jpg",
    heading: "Increased Security",
    paragraph:
      "Protect your sensitive information with our robust, industry-leading security features.",
  },
  {
    id: 7,
    image:
      "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762857042/lufwibaep1li3zh858dl.jpg",
    heading: "Customer Satisfaction",
    paragraph:
      "Delight your customers with a seamless experience and exceptional support.",
  },
  {
    id: 8,
    image:
      "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762857042/coj3ceyjjr3gemrfua5i.jpg",
    heading: "Market Expansion",
    paragraph:
      "Enter new markets and reach a wider audience with our global-ready capabilities.",
  },
  {
    id: 9,
    image:
      "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762857041/bsdtendowvcesmy8f7ua.jpg",
    heading: "Swift Approvals",
    paragraph:
      "The streamlined approval process of an online education loan ensures prompt access to the necessary support",
  },
  {
    id: 10,
    image:
      "https://res.cloudinary.com/dch00stdh/image/upload/v1762857041/xtjytiamvgxbkgxd6a0u.jpg",
    heading: "Enhanced Productivity",
    paragraph:
      "Streamline your workflow and get more done in less time with our intuitive tools.",
  },
  {
    id: 11,
    image:
      "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762857042/zmrni2mldc7ec7f1tnvg.jpg",
    heading: "Improved Collaboration",
    paragraph:
      "Work together seamlessly with your team on shared projects, no matter where you are.",
  },
  {
    id: 12,
    image:
      "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762857041/mb3arbfq1n9xbmeoigpp.jpg",
    heading: "Cost Savings",
    paragraph:
      "Reduce overhead and lower operational costs by adopting our efficient platform.",
  },
  {
    id: 13,
    image:
      "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762857041/piucbmgbewi3wvbxlf0j.jpg",
    heading: "Data-Driven Decisions",
    paragraph:
      "Gain valuable insights from your data to make smarter, more informed business choices.",
  },
  {
    id: 14,
    image:
      "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762857041/arpvxtuiirygnopvwnf7.jpg",
    heading: "Scalable Solutions",
    paragraph:
      "Our solution grows with you, providing the flexibility to handle your expanding needs.",
  },
  {
    id: 15,
    image:
      "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762857042/uekr3umceflvwljf2un5.jpg",
    heading: "Increased Security",
    paragraph:
      "Protect your sensitive information with our robust, industry-leading security features.",
  },
  {
    id: 16,
    image:
      "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762857042/lufwibaep1li3zh858dl.jpg",
    heading: "Customer Satisfaction",
    paragraph:
      "Delight your customers with a seamless experience and exceptional support.",
  },
  {
    id: 17,
    image:
      "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762857042/coj3ceyjjr3gemrfua5i.jpg",
    heading: "Market Expansion",
    paragraph:
      "Enter new markets and reach a wider audience with our global-ready capabilities.",
  },
  {
    id: 18,
    image:
      "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762857041/bsdtendowvcesmy8f7ua.jpg",
    heading: "Swift Approvals",
    paragraph:
      "The streamlined approval process of an online education loan ensures prompt access to the necessary support",
  },
];
const EducationLoan: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeLoan, setActiveLoan] = useState("secured");
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
        // Increment the scroll position
        container.scrollLeft += 1;
        // If we reach the end, jump back to the start for an infinite loop effect
        if (
          container.scrollLeft >=
          container.scrollWidth - container.clientWidth
        ) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    // Start the scrolling animation
    animationFrameId = requestAnimationFrame(scroll);

    // Cleanup function to stop the animation when the component unmounts
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupClose = () => {
    setShowPopup(false);
  };
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative lg:text-white pt-20  lg:pt-28 overflow-hidden bg-[#0e1221]">
        <div className="w-full max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative">
          {/* LEFT SIDE CONTENT */}
          <div className="space-y-6">
            <p className="text-sm opacity-90 flex items-center gap-2">
              <Link
                to="/"
                className="flex items-center gap-1 hover:text-red-600"
              >
                <House className="h-5 w-5" />
                Home
              </Link>
              <span>/</span>
              <span>Education Loan</span>
            </p>

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
                onClick={() => setShowPopup(true)}
              >
                Apply Now
              </Button>

              {showPopup && <DelayedPopup onMinimize={handlePopupClose} />}
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="relative   flex items-center justify-center  ">
            <img
              src="/assets/images/education-loan.webp"
              alt="Education Loan"
              className="h-[350px] max-w-full object-contain rounded-lg rounded-b-none"
            />
            {/* <div className="absolute inset-0 bg-black/20 rounded-xl lg:rounded-2xl"></div> */}
          </div>
        </div>
      </section>

      <section>
        <div className="w-full max-w-[1400px] mx-auto px-6">
          <div className="py-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-3xl">
              Student Loan
            </h2>
            <p className="text-gray-600 mb-4 md:text-base text-justify">
              A student loan is a form of financial aid that helps students pay
              for higher education expenses, including tuition, fees, books, and
              living costs. Unlike grants or scholarships, a loan must be
              repaid, usually with interest. These loans can be a critical tool
              for those who cannot afford college outright, but it's essential
              to understand the terms and conditions.
            </p>
            <p className="text-gray-600 md:text-base text-justify">
              Choosing a student loan is a significant financial decision that
              can affect your finances for years after graduation. It's crucial
              to borrow only what you need and to explore all your options,
              including scholarships, grants, and federal work-study programs,
              before taking on debt. Once you have a loan, managing it wisely is
              key.
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
              // Hide scrollbar for Chrome, Safari, and Edge
              WebkitOverflowScrolling: "touch",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {benefitData.map((benefit) => (
              <div
                key={benefit.id}
                className="relative flex-shrink-0 w-72 h-96 rounded-xl shadow-lg overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 p-4  text-white">
                  <h3 className="text-xl font-bold mb-1">{benefit.heading}</h3>
                  <p className="text-sm font-medium">{benefit.paragraph}</p>
                </div>
                {/* Image fills the card */}
                <img
                  src={benefit.image}
                  alt={benefit.heading}
                  className="w-72 h-96 object-cover"
                />
                {/* Text positioned at the bottom of the card, on top of the image */}
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
              installments instantly. Adjust loan amount, interest rate, and
              tenure to plan repayments with confidence. This tool helps
              students and parents understand repayment obligations clearly and
              make informed financial decisions before borrowing.
            </p>
          </div>

          <div className="py-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-3xl">
              Education Loan Eligibility
            </h2>
            <p className="text-gray-600 mb-4 md:text-base text-justify">
              Check the eligibility criteria such as age, academic background,
              and co-applicant income requirements. Ensure you meet the lender’s
              conditions before applying for a loan. Typically, a confirmed
              admission letter, good academic track record, and co-borrower
              support are mandatory for approval.
            </p>
          </div>

          <div className="py-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-3xl">
              Education Loan Tax Deduction Under 80E
            </h2>
            <p className="text-gray-600 mb-4 md:text-base text-justify">
              Claim tax benefits on the interest paid towards education loans
              under Section 80E of the Income Tax Act. Deductions are available
              for up to 8 years from the start of repayment. This benefit
              significantly reduces the overall cost of borrowing, making higher
              education more affordable for students and their families.
            </p>
          </div>

          <div className="py-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-3xl">
              Education Loan Interest Rates and Charges
            </h2>
            <p className="text-gray-600 mb-4 md:text-base text-justify">
              Compare interest rates, processing fees, and other charges across
              leading banks and NBFCs. Transparent cost details help you choose
              the most affordable loan option. Interest rates may vary depending
              on creditworthiness, institution type, and repayment tenure, so
              careful evaluation is essential.
            </p>
          </div>

          <div className="py-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-3xl">
              Documents Required for an Education Loan
            </h2>
            <p className="text-gray-600 mb-4 md:text-base text-justify">
              Prepare essential documents including admission proof, ID,
              address, academic records, and co-applicant financials. Submitting
              complete paperwork speeds up loan approval. Missing or inaccurate
              documents may delay disbursal, so double-check requirements before
              applying to avoid rejections.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="w-full max-w-[1400px] mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">
            Explore Our Education Loans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative rounded-2xl shadow-md overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('/assets/images/Domestic-Education.png')",
                }}
              />
              <div className="absolute inset-0 bg-black/70" />

              <div className="relative p-8 text-left space-y-4 text-white">
                <h3 className="text-xl font-semibold">
                  Domestic Education Loans
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Quick approval process</li>
                  <li>Competitive interest rates</li>
                  <li>No collateral for smaller amounts</li>
                </ul>
                <Button
                  className="mt-4 text-white bg-red-600 font-semibold"
                  onClick={() => setShowPopup(true)}
                >
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
                style={{
                  backgroundImage: "url('/assets/images/Abroad-Education.jpg')",
                }}
              />
              <div className="absolute inset-0 bg-black/70" />

              <div className="relative p-8 text-left space-y-4 text-white">
                <h3 className="text-xl font-semibold">
                  Abroad Education Loans
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Covers tuition + living expenses</li>
                  <li>Longer repayment tenure</li>
                  <li>Moratorium period till course completion</li>
                </ul>
                <Button
                  className="mt-4 text-white bg-red-600 font-semibold"
                  onClick={() => setShowPopup(true)}
                >
                  Speak to an Advisor
                </Button>
              </div>
            </motion.div>
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
      <section className="py-10 bg-gray-50">
        <div className="bg-gray-50 flex flex-col items-center">
          <div className="w-full max-w-[1400px] mx-auto px-6 bg-white">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
              Documents Required for an Education Loan
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              To ensure a smooth loan application process, please prepare the
              following documents. The list is categorized for both the student
              and the co-applicant.
            </p>
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left rounded-xl overflow-hidden shadow-lg border-separate border-spacing-0 border border-gray-300">
              <thead className="bg-red-600 text-white text-md">
                <tr className="[&>th]:p-4 [&>th]:border-r [&>th]:border-white/20 [&>th:last-child]:border-r-0">
                  <th className="rounded-tl-xl border-b border-white/20">
                    Document Type
                  </th>
                  <th className="border-b border-white/20">
                    Applicant (Student)
                  </th>
                  <th className="rounded-tr-xl border-b border-white/20">
                    Co-Applicant
                  </th>
                </tr>
              </thead>
              <tbody>
                {documentData.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-t border-gray-200 transition-colors duration-200
                      ${
                        i % 2 === 0 ? "bg-white" : "bg-red-50"
                      } hover:bg-red-100`}
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
                className={`border border-red-200 rounded-xl p-5 shadow-md transition-shadow duration-300 hover:shadow-lg ${
                  i % 2 === 0 ? "bg-red-50" : "bg-red-100"
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  {row.icon}
                  <h3 className="font-bold text-lg text-red-700">{row.type}</h3>
                </div>
                <div className="space-y-4 text-sm text-gray-700">
                  <div className="p-3 bg-white rounded-lg shadow-inner">
                    <p className="font-semibold text-gray-900 mb-1">
                      Applicant (Student)
                    </p>
                    <p className="text-gray-700">{row.applicant}</p>
                    <p className="text-xs text-gray-500 mt-1">{row.note}</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg shadow-inner">
                    <p className="font-semibold text-gray-900 mb-1">
                      Co-Applicant
                    </p>
                    <p className="text-gray-700">{row.coApplicant}</p>
                    <p className="text-xs text-gray-500 mt-1">{row.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
              Get personalized loan options and scholarship opportunities in
              minutes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 h-14 px-8"
              >
                <Link to="/contact">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 h-14 px-8"
              >
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
