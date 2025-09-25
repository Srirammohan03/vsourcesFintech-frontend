import React, { useState, useRef, useEffect } from "react";
import {
  Globe,
  UserCheck,
  FileText,
  Star,
  Clock,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import qs from "qs";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import CreditCardSkeleton from "@/Loaders/our-services/CreditCardSkeleton";
import type { BlockedAccount, FAQ } from "@/lib/types/OurService";
import { DefaultContext } from "react-icons/lib";
// import BlockedAccount  from "@/lib/types/OurService";

const faqs = [
  {
    title: "What is a Blocked Account & Who Needs It?",
    icon: <UserCheck className="w-8 h-8 md:w-6 md:h-6 text-red-600" />,
    content: (
      <>
        <p className="mb-3 text-gray-700 leading-relaxed">
          A Blocked Account, also called “Sperrkonto,” is proof to German
          authorities that you have sufficient funds to support your stay while
          studying or staying in Germany.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>
            Mandatory for most international students applying for a visa.
          </li>
          <li>
            Required for researchers, au pairs, and job seekers from non-EU
            countries.
          </li>
          <li>Shows you have 12 months’ living expenses secured.</li>
        </ul>
        <p className="mt-2 mb-2 italic text-gray-600 text-sm">
          Note: If you have a recognized scholarship or sponsor, you might not
          need a blocked account.
        </p>
      </>
    ),
  },
  {
    title: "Documents Required For Opening a Blocked Account",
    icon: <FileText className="w-8 h-8 md:w-6 md:h-6 text-red-600" />,
    content: (
      <ul className="list-disc pl-5 mb-2 space-y-1 text-gray-700">
        <li>Valid Passport or national ID</li>
        <li>University admission letter</li>
        <li>Visa application proof (if required)</li>
        <li>Proof of address (bill, bank statement, etc.)</li>
        <li>Additional forms or photographs depending on the provider</li>
      </ul>
    ),
  },
  {
    title: "Required Amount For A Blocked Account",
    icon: <Star className="w-7 h-7 md:w-6 md:h-6 text-red-600" />,
    content: (
      <>
        <p className="mb-2 text-gray-700 leading-relaxed">
          The current minimum amount you need to deposit (2025) is approximately
          €11,904, which covers about €992 monthly for a year.
        </p>
        <ul className="list-disc pl-5 space-y-1 mb-2 text-gray-700">
          <li>
            This covers accommodation, food, insurance, and basic living costs.
          </li>
          <li>Fees vary by provider; check for setup or monthly charges.</li>
          <li>
            The required amount can be updated yearly by German authorities.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "How Much Time Does It Take To Open A Blocked Account?",
    icon: <Clock className="w-8 h-8 md:w-6 md:h-6 text-red-600" />,
    content: (
      <>
        <p className="mb-2 text-gray-700 leading-relaxed">
          Once your documents and initial deposit are submitted, expect
          processing times of 3-7 business days.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Instant activation options may be available for an extra fee.</li>
          <li>
            Delays could occur if your paperwork is incomplete or verification
            is needed.
          </li>
        </ul>
        <p className="italic text-sm text-gray-600 mt-2 mb-2">
          Pro Tip: Prepare your documents in advance to avoid delays.
        </p>
      </>
    ),
  },
];

const providers = [
  {
    name: "Fintiba",
    logo: "/assets/images/fintiba-logo.svg",
    description: "Popular with quick processing and excellent support.",
    fees: {
      processingFee: "€89 (one-time)",
      monthlyFee: "€4.90",
      processingTime: "2-3 business days",
      bankingModel: "Online-only, fully digital",
    },
  },
  {
    name: "Expatrio",
    logo: "/assets/images/expatrio-logo.svg",
    description: "Offers bundled services including health insurance.",
    fees: {
      processingFee: "€49 (one-time)",
      monthlyFee: "€5.90",
      processingTime: "3-5 business days",
      bankingModel: "Online platform with partner banks",
    },
  },
  {
    name: "Deutsche Bank",
    logo: "/assets/images/Deutsche-Bank.svg",
    description: "Traditional bank providing blocked accounts.",
    fees: {
      processingFee: "Varies, starts around €100",
      monthlyFee: "€10-15",
      processingTime: "5-7 business days",
      bankingModel: "Brick-and-mortar with online services",
    },
  },
  {
    name: "Coracle",
    logo: "/assets/images/Coracle-logo.svg",
    description: "Specialized gateway for international students.",
    fees: {
      processingFee: "€79 (one-time)",
      monthlyFee: "€0 (no monthly fees)",
      processingTime: "1-4 business days",
      bankingModel: "Fully online with partner banks",
    },
  },
];

const applySteps = [
  "Choose your preferred blocked account provider.",
  "Fill out the online application form.",
  "Submit required documents (passport, admission letter, visa proof).",
  "Transfer the required minimum deposit into the blocked account.",
  "Receive confirmation letter for visa application.",
  "Activate account upon arrival in Germany via online or bank visit.",
];

const AccordionItem = ({
  faq,
  isExpanded,
  onClick,
  index,
}: {
  faq: FAQ;
  isExpanded: boolean;
  onClick: () => void;
  index: number;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string | number>("0px");

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isExpanded ? contentRef.current.scrollHeight + "px" : "0px");
    }
  }, [isExpanded]);
  const icon = faqs[index]?.icon ?? faqs[0]?.icon;
  return (
    <div className="border border-red-300 rounded-xl bg-[#f3f6fd] shadow-sm overflow-hidden transition-all">
      <button
        type="button"
        onClick={onClick}
        className={`flex items-start justify-between w-full px-6 py-4 text-left text-black font-bold text-lg tracking-tight hover:bg-[#f9fafc] focus:outline-none focus:ring-2 focus:ring-red-300 rounded-xl transition-colors ${
          isExpanded ? "border-b-2 border-red-300" : ""
        }`}
        aria-expanded={isExpanded}
      >
        <div className="flex items-start gap-4">
          {icon}
          <span>{faq.title}</span>
        </div>
        <span className="text-red-600 font-bold text-2xl select-none">
          {isExpanded ? "–" : "+"}
        </span>
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: isExpanded
            ? `${contentRef.current?.scrollHeight}px`
            : "0px",

          transition: " 0.35s ease, padding 0.35s ease",
          paddingTop: isExpanded ? "1.5rem" : "0",
          paddingBottom: isExpanded ? "1.5rem" : "0",
        }}
        className="text-black text-base px-6"
      >
        {faq &&
          faq?.content &&
          faq?.content?.map((f, i) => (
            <div key={f?.id || i}>
              <p className="mb-3 text-gray-700 leading-relaxed">
                {f?.description}
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {f &&
                  f?.list?.map((l, i) => <li key={l?.id || i}>{l?.list}</li>)}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

const query = qs.stringify({
  populate: {
    our_services: {
      on: {
        "fintech.blocked-accounts": {
          populate: {
            background_image: { fields: ["url", "name", "documentId"] },
            faq: {
              populate: {
                content: {
                  populate: {
                    list: true,
                  },
                },
              },
            },
            blocked_account_providers: {
              populate: {
                image: { fields: ["url", "name", "documentId"] },
                list: true,
              },
            },
          },
        },
      },
    },
  },
});

const fetchBlockedAccount = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_CMS_GLOBALURL}/api/our-service?${query}`
  );
  return data?.data?.our_services[0] || {};
};

const BlockedAccount: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number>(0); // First open by default

  const { data, isLoading, isError, error } = useQuery<BlockedAccount>({
    queryKey: ["blockAccount"],
    queryFn: fetchBlockedAccount,
  });
  if (isError) {
    toast.error("failed to load");
    console.log("failed to load", error);
    return null;
  }

  if (isLoading || !data) {
    return <CreditCardSkeleton />;
  }

  const toggleIndex = (index: number) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative text-white pt-32 pb-10 lg:pt-40 lg:pb-36">
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
        <div className="relative w-full max-w-[1400px] mx-auto px-6 flex flex-col items-center md:items-start justify-center text-left">
          <Globe className="w-14 h-14 mb-4 animate-pulse" />
          <h1 className="text-4xl font-extrabold mb-4 leading-tight max-w-3xl">
            {data?.heading ||
              "Everything About Blocked Accounts for International Students"}
          </h1>
          <p className="max-w-2xl">
            {data?.description ||
              "Secure your stay in Germany with a Blocked Account. Learn who needs it, how to open it, and essentials to manage your blocked funds easily."}
          </p>
        </div>
      </section>

      <section className="space-y-6 w-full max-w-[1400px] mx-auto px-6 py-10">
        {data &&
          data?.faq &&
          data?.faq?.map((faq, i) => (
            <AccordionItem
              key={faq?.id || i}
              faq={faq}
              isExpanded={expandedIndex === i}
              onClick={() => toggleIndex(i)}
              index={i}
            />
          ))}
      </section>

      {/* How To Open A Blocked Account Steps*/}
      <section className="w-full max-w-[1400px] mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-12 text-black text-center">
          How To Open A Blocked Account With Vsource
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {applySteps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-white rounded-3xl shadow-lg p-5  hover:shadow-2xl transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-extrabold text-2xl shadow-md mb-3 select-none">
                {i + 1}
              </div>
              <p className="text-black text-center text-lg font-semibold max-w-md">
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Providers Section */}
      <section className="space-y-10 w-full max-w-[1400px] mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-black text-center mb-10">
          {data?.provider_heading || "List of German Blocked Account Providers"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
          {data &&
            data?.blocked_account_providers &&
            data?.blocked_account_providers?.map((provider, i) => (
              <div
                key={provider?.id || i}
                className="bg-white rounded-2xl p-8 shadow-lg border border-red-200 hover:shadow-2xl transition-shadow cursor-pointer"
              >
                <div className="flex items-center flex-row-reverse justify-between gap-4 mb-4">
                  <img
                    src={provider?.image?.url}
                    alt={`${provider?.image?.name} logo`}
                    className="md:w-44 md:h-20 w-28 h-12 object-contain"
                  />
                  <h3 className="text-indigo-800 font-bold text-2xl">
                    {provider?.title}
                  </h3>
                </div>
                <p className="text-gray-700 mb-6">{provider?.description}</p>
                <div className="grid grid-cols-2 gap-y-2 text-gray-800 font-semibold">
                  {/* <span>Processing Fee:</span>
                <span>{fees.processingFee}</span>
                <span>Monthly Fee:</span>
                <span>{fees.monthlyFee}</span>
                <span>Processing Time:</span>
                <span>{fees.processingTime}</span>
                <span>Banking Model:</span>
                <span>{fees.bankingModel}</span> */}
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Activation & Essential Tips*/}
      <section className="max-w-[1400px] mx-auto px-6 py-10 space-y-20">
        <div className="bg-indigo-50 p-5 md:p-10 rounded-xl shadow-md max-w-4xl mx-auto text-justify">
          <h2 className="text-2xl font-bold mb-6 text-black flex items-start gap-3">
            <CheckCircle className="w-12 h-12 md:w-8 md:h-8 text-red-600" />
            How Do I Activate My Blocked Account In Germany?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-lg">
            After you arrive in Germany, activating your blocked account is a
            crucial step. This may be done online via your provider's secure
            portal by uploading your identity documents for verification.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4 text-lg">
            If online activation is not available, visiting a partner bank or
            authorized office in person with your passport, visa, and
            registration certificate will be necessary.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            Following activation, your monthly fund withdrawals will be enabled
            and managed through your linked German current account.
          </p>
        </div>

        {/* Essential Tips Section */}
        <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-black">
              Essential Tips for Managing Your Blocked Account
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4 text-lg text-justify">
              Managing your blocked account wisely helps ensure you stay
              financially secure during your stay. Always keep your login
              details confidential and monitor monthly withdrawals closely.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg text-justify">
              Stay informed about any regulatory changes regarding minimum
              balance maintenance or withdrawal rules to avoid penalties or
              account freeze.
            </p>
          </div>
          <ul className="flex flex-col gap-6 text-black font-semibold text-lg ">
            {[
              "Keep your credentials secure and never share your passwords.",
              "Plan withdrawals to align with your monthly budget and expenses.",
              "Notify your provider immediately about any change in visa or residence status.",
              "Regularly check your account balance and transaction statements.",
              "Communicate only through official provider channels to avoid scams.",
            ].map((tip, idx) => (
              <li key={idx} className="flex items-start gap-4">
                <CheckCircle className="flex-shrink-0 w-7 h-7 mt-1 text-red-600" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Post-Study Guidance */}
      <section className="w-full max-w-[1400px] mx-auto py-10 text-center px-6 ">
        <h2 className="text-3xl font-bold mb-6 text-black">
          How To Choose A Blocked Account After Finishing My Studies?
        </h2>
        <p className="mb-4 text-gray-800">
          After completing studies, your financial needs change. Switching to
          regular student or salary accounts with lower fees and more
          flexibility is typical.
        </p>
        <p className="font-semibold text-indigo-700">
          Vsource provides expert consulting to help transition your banking
          post studies.
        </p>
      </section>

      <div className="py-6 bottom-6 left-0 right-0 mx-auto max-w-md px-6">
        <button className="w-full bg-red-600 text-white font-bold py-4 px-2 rounded-xl shadow-lg hover:brightness-110 transition-all">
          Start Your Blocked Account Application
        </button>
      </div>
    </div>
  );
};

export default BlockedAccount;
