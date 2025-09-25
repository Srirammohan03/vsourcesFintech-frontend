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
import qs from "qs";
import axios from "axios";
import { toast } from "sonner";
import type { EducationLoan } from "@/lib/types/OurService";
import { useQuery } from "@tanstack/react-query";
import CreditCardSkeleton from "@/Loaders/our-services/CreditCardSkeleton";
import RichText from "@/utils/RichText";
const query = qs.stringify({
  populate: {
    our_services: {
      on: {
        "fintech.education-loan": {
          populate: {
            background_image: { fields: ["url", "name", "documentId"] },
            lists: true,
            sub_topic: true,
            faq_detail: true,
          },
        },
      },
    },
  },
});
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
interface BenefitItem {
  id: number;
  image: string;
  heading: string;
  paragraph: string;
}

const benefitData: BenefitItem[] = [
  {
    id: 1,
    image: "/assets/images/benfit-1.png",
    heading: "Enhanced Productivity",
    paragraph:
      "Streamline your workflow and get more done in less time with our intuitive tools.",
  },
  {
    id: 2,
    image: "/assets/images/benfit-2.png",
    heading: "Improved Collaboration",
    paragraph:
      "Work together seamlessly with your team on shared projects, no matter where you are.",
  },
  {
    id: 3,
    image: "/assets/images/benfit-3.png",
    heading: "Cost Savings",
    paragraph:
      "Reduce overhead and lower operational costs by adopting our efficient platform.",
  },
  {
    id: 4,
    image: "/assets/images/benfit-4.png",
    heading: "Data-Driven Decisions",
    paragraph:
      "Gain valuable insights from your data to make smarter, more informed business choices.",
  },
  {
    id: 5,
    image: "/assets/images/benfit-5.png",
    heading: "Scalable Solutions",
    paragraph:
      "Our solution grows with you, providing the flexibility to handle your expanding needs.",
  },
  {
    id: 6,
    image: "/assets/images/benfit-6.png",
    heading: "Increased Security",
    paragraph:
      "Protect your sensitive information with our robust, industry-leading security features.",
  },
  {
    id: 7,
    image: "/assets/images/benfit-7.png",
    heading: "Customer Satisfaction",
    paragraph:
      "Delight your customers with a seamless experience and exceptional support.",
  },
  {
    id: 8,
    image: "/assets/images/benfit-8.png",
    heading: "Market Expansion",
    paragraph:
      "Enter new markets and reach a wider audience with our global-ready capabilities.",
  },
  {
    id: 9,
    image: "/assets/images/benfit-9.png",
    heading: "Swift Approvals",
    paragraph:
      "The streamlined approval process of an online education loan ensures prompt access to the necessary support",
  },
];
const fetchEducationLoan = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_CMS_GLOBALURL}/api/our-service?${query}`
  );
  return data?.data?.our_services[0] || {};
};

const EducationLoan: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeLoan, setActiveLoan] = useState("secured");
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const { data, isLoading, isError, error } = useQuery<EducationLoan>({
    queryKey: ["educationloan"],
    queryFn: fetchEducationLoan,
  });

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
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative lg:text-white pt-28 pb-5 lg:pb-20 lg:pt-36 overflow-hidden">
        <div className="w-full max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
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
            <div className="block lg:hidden my-6">
              <img
                src="/assets/images/education-loans.jpg"
                alt="Education Loan"
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              {data?.heading || "Student Education Loans"}
            </h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data &&
                data?.lists &&
                data?.lists.map((item, i) => (
                  <li
                    key={item?.id || i}
                    className="flex items-center gap-2 lg:text-white"
                  >
                    <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                    {item?.list}
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
        </div>
        <div className="hidden lg:block absolute inset-0">
          <img
            src={
              data?.background_image?.url || "/assets/images/education-loan.png"
            }
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
              {data?.sub_heading}
            </h2>

            {data?.description ? (
              <p className="text-gray-600 md:text-base text-justify">
                <RichText content={data?.description} />
              </p>
            ) : (
              <>
                {" "}
                <p className="text-gray-600 mb-4 md:text-base text-justify">
                  A student loan is a form of financial aid that helps students
                  pay for higher education expenses, including tuition, fees,
                  books, and living costs. Unlike grants or scholarships, a loan
                  must be repaid, usually with interest. These loans can be a
                  critical tool for those who cannot afford college outright,
                  but it's essential to understand the terms and conditions.
                </p>
                <p className="text-gray-600 md:text-base text-justify">
                  Choosing a student loan is a significant financial decision
                  that can affect your finances for years after graduation. It's
                  crucial to borrow only what you need and to explore all your
                  options, including scholarships, grants, and federal
                  work-study programs, before taking on debt. Once you have a
                  loan, managing it wisely is key.
                </p>
              </>
            )}
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
          {data &&
            data?.sub_topic &&
            data?.sub_topic.map((sub, i) => (
              <div className="py-2" key={sub.id || i}>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-3xl">
                  {sub?.heading || "Education Loan EMI Calculator"}
                </h2>
                <p className="text-gray-600 mb-4 md:text-base text-justify">
                  {sub?.description ||
                    "Use our Education Loan EMI Calculator to estimate your monthly installments instantly. Adjust loan amount, interest rate, and tenure to plan repayments with confidence. This tool helps students and parents understand repayment obligations clearly and make informed financial decisions before borrowing."}
                </p>
              </div>
            ))}
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="w-full max-w-[1000px] mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {data?.faq_heading || " Frequently Asked Questions"}
          </h2>
          <div className="space-y-4">
            {data &&
              data?.faq_detail &&
              data?.faq_detail.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-md border border-gray-200"
                >
                  {/* Question Row */}
                  <button
                    onClick={() => toggleFAQ(i)}
                    className="w-full flex justify-between items-center p-5 text-left"
                  >
                    <span className="font-semibold">{faq.heading}</span>
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
                        <p className="text-gray-700">{faq.description}</p>
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
