import React from "react";
interface TrustedByItem {
  icon: React.ElementType;
  label: string;
  labelCount?: number;
}
export interface EligibilityItem {
  criteria: string;
  details: string;
}
interface BankLayoutProps {
  heroBg: string;
  heroTitle: string;
  heroSubtitle?: string;
  interstRate?: string;
  serviceCharge?: string;
  marginRate?: string;
  bankImg: string;
  description: string;
  trustedBy: TrustedByItem[];
  documents: string[];
  eligibility: EligibilityItem[];
}
import { useEffect, useState } from "react";
import DelayedPopup from "../DelayedPopup";
import { Link } from "react-router-dom";

// Counter Hook
function useCounter(to: number, duration: number = 200) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = to;
    const incrementTime = Math.max(Math.floor(duration / end), 10);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [to, duration]);

  return count;
}

const TrustedByCard = ({
  icon: Icon,
  label,
  labelCount = 0,
}: TrustedByItem) => {
  const count = useCounter(labelCount);
  return (
    <div className="flex items-center justify-between gap-6 px-6 py-4 bg-[#0a9cf9] font-semibold text-white shadow-xl rounded-lg w-full max-w-[400px] min-h-[80px] md:min-h-[80px] sm:min-h-[80px]">
      <Icon className="w-10 h-11" />
      <span className="text-3xl">{count}+</span>
      <span className="text-sm sm:text-base">{label}</span>
    </div>
  );
};

const BankLayout: React.FC<BankLayoutProps> = ({
  heroBg,
  heroTitle,
  heroSubtitle,
  interstRate,
  serviceCharge,
  marginRate,
  bankImg,
  description,
  trustedBy,
  documents,
  eligibility,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupClose = () => {
    setShowPopup(false);
  };
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative pt-32 pb-16 lg:pt-40 lg:pb-40 text-white bg-cover bg-[left_center] lg:bg-[top_center]"
        style={{
          backgroundImage: heroBg ? `url(${heroBg})` : "none",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold">{heroTitle}</h1>
          {heroSubtitle && (
            <p className="mt-4 text-lg md:text-xl">{heroSubtitle}</p>
          )}
        </div>
      </section>

      {/* Logo + Content */}
      <section className="bg-surface pt-10 pb-10">
        <div className="w-full max-w-[1400px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {heroTitle} Education Loan
            </h1>
            <p className="mt-3 text-lg text-gray-700">
              Unlock hassle-free education loan assistance with Vsources!
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-6">
              <div className="flex items-center gap-2">
                <span className="text-pink-500 text-xl">%</span>
                <div>
                  <p className="font-semibold">Interest Rates</p>
                  <p className="text-sm text-gray-600">{interstRate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500 text-xl">₹</span>
                <div>
                  <p className="font-semibold">Service Charge</p>
                  <p className="text-sm text-gray-600">{serviceCharge}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-purple-500 text-xl">⚖</span>
                <div>
                  <p className="font-semibold">Margin Money</p>
                  <p className="text-sm text-gray-600">{marginRate}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <Link
                to="/tools/loan-calculator"
                className="px-6 py-3 border-2 border-red-600 text-red-600 font-medium rounded-lg hover:bg-pink-50 transition"
              >
                Check Eligibility
              </Link>
            </div>
          </div>
          <div className="">
            <div className=" rounded-2xl">
              <img
                src={bankImg}
                alt={heroTitle}
                className="rounded-2xl shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-12 bg-gray-50">
        <div className="w-full max-w-[1400px] mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">
            Our Education Loans are Trusted By{" "}
            <span className="text-red-600">{heroTitle}</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {trustedBy.map((item, idx) => (
              <TrustedByCard key={idx} {...item} />
            ))}
          </div>
        </div>
      </section>
      {/* Required Documents */}
      <section className="py-12 bg-gray-50">
        <div className="w-full max-w-[1400px] mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Required Documents for <br />
              {heroTitle} Education Loan
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To ensure a smooth loan approval process, applicants must submit a
              set of standard documents. These documents help verify academic
              eligibility, financial stability, and identification details
              required by the bank or financial institution.
            </p>
            {/* CTA Buttons */}
            <div className="mt-8 flex gap-4">
              <a
                href="#"
                className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:opacity-90 transition"
                onClick={() => setShowPopup(true)}
              >
                Apply Now
              </a>

              {showPopup && <DelayedPopup onMinimize={handlePopupClose} />}
            </div>
          </div>

          {/* Right Checklist */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">
              Application Checklist
            </h3>
            <ul className="space-y-4">
              {documents.map((doc, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  {/* Check Icon */}
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-red-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="red"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">{doc}</span>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-xs text-gray-500">
              * Requirements may vary depending on the bank and course. Our
              experts will guide you with exact documentation and timelines.
            </p>
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-12 bg-gray-50">
        <div className="w-full max-w-[1400px] mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Education Loan Eligibility {heroTitle}
          </h2>

          {/* Responsive Table */}
          <div className="overflow-x-auto hidden md:block">
            <table className="w-full max-w-[900px] mx-auto rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <thead>
                <tr className="bg-red-600 text-white text-left">
                  <th className="p-4 w-1/3 text-sm font-semibold uppercase tracking-wide">
                    Criteria
                  </th>
                  <th className="p-4 text-sm font-semibold uppercase tracking-wide">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {eligibility.map((item, idx) => (
                  <tr
                    key={idx}
                    className={`${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-red-50 transition`}
                  >
                    <td className="p-4 font-medium text-sm text-gray-800 border-r border-gray-200">
                      {item.criteria}
                    </td>
                    <td className="p-4 text-gray-700">{item.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="space-y-4 md:hidden">
            {eligibility.map((item, idx) => (
              <div
                key={idx}
                className="border rounded-lg bg-white shadow-sm p-4"
              >
                <p className="font-semibold text-gray-800">{item.criteria}</p>
                <p className="text-gray-700 mt-1">{item.details}</p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm text-gray-500 max-w-[700px] mx-auto text-center">
            * Terms and conditions apply. This is an indicative list and may
            vary depending on the lender’s policies. Please confirm with your
            loan provider before applying.
          </p>
        </div>
      </section>
    </div>
  );
};

export default BankLayout;
