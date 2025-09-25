import React, { useState } from "react";
import {
  ShieldCheck,
  CreditCard,
  PhoneCall,
  BarChart2,
  Tag,
  Globe,
  ArrowDownCircle,
  BriefcaseMedical,
  Wallet,
  RefreshCw,
  Bell,
  Mail,
  UserCog,
  Layers,
  Headphones,
  Nfc,
  Headset,
  CheckCheck,
  FileText,
  CheckCircle,
} from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";
import DelayedPopup from "@/components/DelayedPopup";
import qs from "qs";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import CreditCardSkeleton from "@/Loaders/our-services/CreditCardSkeleton";
import type { ForexCard } from "@/lib/types/OurService";
import { HighlightedText } from "@/utils/HighlightedText";
import { FaRegQuestionCircle } from "react-icons/fa";
import { HighlightedPara } from "@/utils/HighlightedPara";
import { HighlightedTextYellow } from "@/utils/HighlightedTextYellow";

const query = qs.stringify({
  populate: {
    our_services: {
      on: {
        "fintech.forex-card": {
          populate: {
            background_image: { fields: ["url", "name", "documentId"] },
            partner_image: { fields: ["url", "name", "documentId"] },
            works: true,
            benfits: {
              populate: {
                list: true,
              },
            },
            management: {
              populate: {
                list: true,
              },
            },
            features: true,
          },
        },
      },
    },
  },
});

const fetchForexCard = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_CMS_GLOBALURL}/api/our-service?${query}`
  );
  return data?.data?.our_services[0] || {};
};

const BENEFITS = [
  {
    icon: <ShieldCheck size={32} className="text-red-600" />,
    title: "Protection from Exchange Rate Fluctuations",
    desc: "Lock the rate at loading, so currency value remains stable during your study abroad.",
    category: "Security",
  },
  {
    icon: <CreditCard size={32} className="text-red-600" />,
    title: "Easy Access to Cash",
    desc: "Withdraw local currency at ATMs worldwide at low cost—track and reload any time.",
    category: "Convenience",
  },
  {
    icon: <PhoneCall size={32} className="text-red-600" />,
    title: "24/7 Assistance",
    desc: "Global support helplines and emergency card replacement for stress-free travel.",
    category: "Support",
  },
  {
    icon: <BarChart2 size={32} className="text-red-600" />,
    title: "Real-Time Expense Tracking",
    desc: "Instant app alerts and statements help manage money and avoid overspending.",
    category: "Convenience",
  },
  {
    icon: <Tag size={32} className="text-red-600" />,
    title: "Exclusive Discounts",
    desc: "Enjoy student offers on dining, travel and shopping across select partners.",
    category: "Perks",
  },
  {
    icon: <Globe size={32} className="text-red-600" />,
    title: "Accepted Worldwide",
    desc: "Pay at millions of outlets: shops, restaurants, education fees, and online.",
    category: "Convenience",
  },
  {
    icon: <ArrowDownCircle size={32} className="text-red-600" />,
    title: "Minimal Transaction Fees",
    desc: "No hidden markups; typically lower charges than regular debit cards for currency conversion.",
    category: "Security",
  },
  {
    icon: <BriefcaseMedical size={32} className="text-red-600" />,
    title: "Insurance Coverage",
    desc: "Many cards offer travel and accidental insurance for added student safety.",
    category: "Security",
  },
];
const workflowSteps = [
  {
    icon: <FileText size={24} className="text-blue-600" />,
    title: "Consultation & Assessment",
    description:
      "Our experts work with you to understand your specific financial and travel needs, ensuring a tailored approach.",
  },
  {
    icon: <CheckCheck size={24} className="text-green-600" />,
    title: "Secure Document Verification",
    description:
      "EbixCash's secure platform handles all document and identity verification, streamlining the process securely and efficiently.",
  },
  {
    icon: <CreditCard size={24} className="text-purple-600" />,
    title: "Seamless Transactions",
    description:
      "Easily manage global financial transactions, from tuition fees to travel expenses, directly through the integrated platform.",
  },
  {
    icon: <Headset size={24} className="text-yellow-600" />,
    title: "Dedicated Support",
    description:
      "Benefit from 24/7 customer support to assist with any queries, ensuring a smooth and worry-free experience.",
  },
];

const workflowIcons = [
  { icon: <FileText size={24} className="text-blue-600" /> },
  { icon: <CheckCircle size={24} className="text-green-600" /> },
  { icon: <CreditCard size={24} className="text-purple-600" /> },
  { icon: <Headset size={24} className="text-yellow-600" /> },
];
const benefitsIcons = [
  { icon: <Layers className="w-10 h-10 text-orange-600" /> },
  { icon: <RefreshCw className="w-10 h-10 text-orange-600" /> },
  { icon: <Nfc className="w-10 h-10 text-orange-600" /> },
  { icon: <CreditCard className="w-10 h-10 text-orange-600" /> },
  { icon: <Headphones className="w-10 h-10 text-orange-600" /> },
];
const cardManageIcons = [
  { icon: <UserCog className="w-10 h-10 text-blue-600 mb-4" /> },
  { icon: <Bell className="w-10 h-10 text-blue-600 mb-4" /> },
  { icon: <Mail className="w-10 h-10 text-blue-600 mb-4" /> },
];
const featuresIcons = [
  { icon: <Layers className="w-10 h-10 text-orange-600" /> },
  { icon: <RefreshCw className="w-10 h-10 text-orange-600" /> },
  { icon: <Nfc className="w-10 h-10 text-orange-600" /> },
  { icon: <CreditCard className="w-10 h-10 text-orange-600" /> },
  { icon: <Headphones className="w-10 h-10 text-orange-600" /> },
];

const categories = ["All", "Security", "Convenience", "Support", "Perks"];

export default function ForexCard() {
  const [showPopup, setShowPopup] = useState(false);

  const { data, isLoading, isError, error } = useQuery<ForexCard>({
    queryKey: ["forexCard"],
    queryFn: fetchForexCard,
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
      <section className="relative text-white pt-32 pb-10 lg:pt-40 lg:pb-36">
        {/* Background Image with Overlay */}
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

        {/* Content */}
        <div className="relative w-full max-w-[1400px] mx-auto px-6 flex flex-col items-center md:items-start justify-center text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">
            {data?.heading || "Best Forex Card for Students Abroad"}
          </h1>
          <p className="text-lg mb-6 max-w-3xl">
            {data?.description ||
              "Your smart, safe, and low-cost prepaid card for all overseas student payments — manage money, avoid extra fees, and access exclusive benefits globally."}
          </p>
        </div>
      </section>

      {/* Intro Sections */}
      <section className=" ">
        <div className="w-full max-w-[1400px] mx-auto px-6 py-10">
          <h2 className="md:text-3xl text-xl font-bold mb-3 text-black">
            What is a <span className="text-red-600">Forex Card</span> ?
          </h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            A <strong>Forex card</strong> is a prepaid travel card allowing
            international payments in supported foreign currencies. It offers
            locked-in exchange rates and secure worldwide use similar to a debit
            card, ideal for students managing expenses abroad.
          </p>

          <h2 className="md:text-3xl text-xl font-bold mb-3 text-black">
            Why is a <span className="text-red-600">Student Forex Card</span> ?
          </h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            Specifically designed for overseas students, these cards provide
            lower fees, multi-currency options, travel insurance coverage, and
            discounts for education-related expenses — helping you spend smart
            and worry-free abroad.
          </p>

          <h2 className="md:text-3xl text-xl font-bold mb-5 text-center text-black">
            How Forex Cards Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-black mb-2">
                Loading the Card
              </h3>
              <p className="text-gray-700 text-sm">
                Convert Indian Rupees to foreign currencies and load the card
                pre-travel. Reloading can be done anytime through an app or
                online portal.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-black mb-2">
                Using the Card Abroad
              </h3>
              <p className="text-gray-700 text-sm">
                Use it like a debit card for payments or ATM withdrawals
                globally. Supports contactless and chip payments.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-black mb-2">
                Reloading the Card
              </h3>
              <p className="text-gray-700 text-sm">
                Convenient online reload options ensure uninterrupted spending
                power, whether by students or their guardians.
              </p>
            </div>

            <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-200">
              <h3 className="font-semibold text-black mb-2">
                Multi-Currency Support
              </h3>
              <p className="text-gray-700 text-sm">
                Manage balances across multiple currencies in one card, avoiding
                conversion fees during foreign transactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-blue-600 py-12 px-6  shadow-md">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Content */}
          <div className="text-center md:text-left">
            {data?.partner_heading ? (
              <HighlightedTextYellow
                color={"yellow"}
                mobileSize={"30px"}
                text={data?.partner_heading}
              />
            ) : (
              <h2 className="text-3xl font-extrabold text-white mb-3">
                Our <span className="text-yellow-300">Partner</span>
              </h2>
            )}
            {data?.partner_description ? (
              <HighlightedPara
                color={"yellow"}
                mobileSize={"20px"}
                text={data?.partner_description}
              />
            ) : (
              <p className="text-lg text-white max-w-md mx-auto md:mx-0">
                Proudly collaborating with
                <span className="text-yellow-300 font-semibold">
                  EbixCash
                </span>{" "}
                to deliver seamless, secure, and innovative global travel &
                financial solutions for students.
              </p>
            )}
          </div>

          {/* Right Logo */}
          <div className="flex-shrink-0">
            <img
              src={data?.partner_image?.url || "/assets/images/exbicash.png"}
              alt={data?.partner_image?.name || "EbixCash"}
              className="h-20 md:h-24 object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* New "How It Works" Card Layout Section */}
      <section className="bg-white py-16 w-full max-w-[1400px] mx-auto px-6  ">
        <div className="text-center mb-12">
          {data?.works_heading ? (
            <HighlightedText
              color={"red"}
              mobileSize={"25px"}
              text={data?.works_heading}
            />
          ) : (
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black mb-4">
              How <span className="text-red-600">EbixCash</span> Works
            </h2>
          )}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {data?.work_description ||
              "Our streamlined collaboration with EbixCash simplifies your financial and travel journey with a straightforward, secure process designed for students."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data &&
            data?.works &&
            data?.works?.map((step, index) => {
              const { icon } = workflowIcons[index] ?? workflowIcons[0]; // fallback to first icon

              return (
                <div
                  key={step?.id || index}
                  className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="bg-blue-100 p-4 rounded-full shadow-md mb-4 flex-shrink-0">
                    {icon}
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              );
            })}
        </div>
      </section>
      {/* Benefits Cards grid */}
      <section>
        <div className="w-full max-w-[1400px] mx-auto px-6 py-10">
          <h2 className="text-2xl font-bold text-center mb-8">
            Benefits for Students
          </h2>

          <Tabs.Root defaultValue="All" className="flex flex-col">
            {/* Tab List */}
            <Tabs.List className="flex justify-center flex-wrap gap-3 mb-8">
              {categories.map((cat) => (
                <Tabs.Trigger
                  key={cat}
                  value={cat}
                  className="px-4 py-2 rounded-full text-sm font-medium border border-red-600 
                text-red-600 hover:bg-red-300 hover:text-white data-[state=active]:bg-red-600 
                data-[state=active]:text-white transition"
                >
                  {cat}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            {/* Tab Content */}
            {categories.map((cat) => {
              const filtered =
                cat === "All"
                  ? BENEFITS
                  : BENEFITS.filter((b) => b.category === cat);
              return (
                <Tabs.Content key={cat} value={cat}>
                  <div
                    className="grid gap-5 text-center justify-center 
               grid-cols-[repeat(auto-fit,minmax(270px,max-content))]"
                  >
                    {filtered.map((b) => (
                      <div
                        key={b.title}
                        className="bg-white shadow rounded-xl border border-gray-200 p-5 flex flex-col items-center text-center hover:shadow-lg transition w-[250px]"
                      >
                        <div className="mb-2">{b.icon}</div>
                        <h3 className="font-semibold text-black mb-1">
                          {b.title}
                        </h3>
                        <p className="text-gray-600 text-sm">{b.desc}</p>
                      </div>
                    ))}
                  </div>
                </Tabs.Content>
              );
            })}
          </Tabs.Root>
        </div>
      </section>

      {/* Top Forex Cards Table */}
      <section className="bg-gray-50 py-10">
        <div className="max-w-[1400px] mx-auto px-6 space-y-10">
          <div>
            {data?.benefits_heading ? (
              <div className="text-center mb-10">
                <HighlightedText
                  color={"red"}
                  mobileSize={"30px"}
                  text={data?.benefits_heading}
                />
              </div>
            ) : (
              <h2 className="text-center text-3xl font-bold text-gray-900 mb-10">
                <span className="text-red-600">EbixCash</span> Globetrotter
                Travel – Benefits to Customers
              </h2>
            )}

            <div className="grid gap-8 md:grid-cols-3">
              {data &&
                data?.benfits &&
                data?.benfits?.map((ben, i) => {
                  const { icon } = benefitsIcons[i] ?? {
                    icon: (
                      <FaRegQuestionCircle className="w-10 h-10 text-gray-400 mb-4" />
                    ),
                  };
                  return (
                    <article
                      key={ben?.id || i}
                      className="bg-white rounded-3xl shadow-md p-8 flex flex-col justify-start transition hover:shadow-lg hover:border-red-600 border border-transparent"
                    >
                      {icon}
                      <h3 className="text-xl font-semibold mb-4 text-gray-900">
                        {ben?.title}
                      </h3>
                      <ul className="text-gray-700 text-sm list-disc list-inside space-y-2">
                        {ben?.list.map((item, idx) => (
                          <li key={item?.id || idx}>{item?.list}</li>
                        ))}
                      </ul>
                    </article>
                  );
                })}
            </div>
          </div>

          {/* 2. Easy Card Management */}
          <div>
            {data?.card_management_heading ? (
              <div className="text-center mb-10">
                <HighlightedText
                  color={"red"}
                  mobileSize={"30px"}
                  text={data?.card_management_heading}
                />
              </div>
            ) : (
              <h2 className="text-center text-3xl font-bold text-gray-900 mb-10">
                <span className="text-red-600">EbixCash</span> Globetrotter
                Travel – Easy Card Management
              </h2>
            )}

            <div className="grid gap-8 md:grid-cols-3">
              {data &&
                data?.management &&
                data?.management?.map((manage, i) => {
                  const { icon } = cardManageIcons[i] ?? {
                    icon: (
                      <FaRegQuestionCircle className="w-10 h-10 text-gray-400 mb-4" />
                    ),
                  };
                  return (
                    <article
                      key={manage?.id || i}
                      className="bg-white rounded-3xl shadow-md p-8 flex flex-col justify-start transition hover:shadow-lg hover:border-red-600 border border-transparent"
                    >
                      {icon}
                      <h3 className="text-xl font-semibold mb-4 text-gray-900">
                        {manage?.title}
                      </h3>
                      <ul className="text-gray-700 text-sm list-disc list-inside space-y-2">
                        {manage &&
                          manage?.list.map((item, i) => (
                            <li key={item?.id || i}>{item?.list}</li>
                          ))}
                      </ul>
                    </article>
                  );
                })}
            </div>
          </div>

          {/* 3. Additional Features */}
          <div>
            {data?.Features_heading ? (
              <div className="text-center mb-10">
                <HighlightedText
                  color={"red"}
                  mobileSize={"30px"}
                  text={data?.Features_heading}
                />
              </div>
            ) : (
              <h2 className="text-center text-3xl font-bold text-gray-900 mb-10">
                <span className="text-red-600">EbixCash</span> Globetrotter
                Travel – Additional Features
              </h2>
            )}

            <div className="grid gap-8 md:grid-cols-2">
              {data &&
                data?.features &&
                data?.features.map((fet, idx) => {
                  const { icon } = featuresIcons[idx] ?? {
                    icon: (
                      <FaRegQuestionCircle className="w-10 h-10 text-gray-400 mb-4" />
                    ),
                  };
                  return (
                    <div
                      key={fet?.id || idx}
                      className={`bg-white rounded-3xl shadow-md p-8 flex flex-col justify-start transition hover:shadow-lg hover:border-orange-600 border border-transparent ${
                        data.features.length - 1 === idx ? "md:col-span-2" : ""
                      }
                  }`}
                    >
                      <div className="flex flex-row gap-3">
                        {icon}
                        <h3 className="text-xl font-semibold text-center mb-4 text-gray-900">
                          {fet?.heading}
                        </h3>
                      </div>
                      <div>
                        <p className="text-gray-700 text-sm">
                          {fet?.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      {/* Apply Button */}
      <div id="apply" className="w-full max-w-sm mx-auto mt-4 mb-4">
        <button
          className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-lg shadow-lg transition"
          onClick={() => setShowPopup(true)}
        >
          Apply for Forex Card
        </button>
        {showPopup && <DelayedPopup onMinimize={handlePopupClose} />}
      </div>
    </div>
  );
}
