import React from "react";
import { Currency, ShieldCheck, UserCheck } from "lucide-react";
import qs from "qs";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import CreditCardSkeleton from "@/Loaders/our-services/CreditCardSkeleton";
import type { GIC } from "@/lib/types/OurService";
import RichText from "@/utils/RichText";
import ReactMarkdown from "react-markdown";
const query = qs.stringify({
  populate: {
    our_services: {
      on: {
        "fintech.gic": {
          populate: {
            background_image: { fields: ["url", "name", "documentId"] },
          },
        },
      },
    },
  },
});
const fetchGic = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_CMS_GLOBALURL}/api/our-service?${query}`
  );
  return data?.data?.our_services[0] || {};
};
const GIC: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery<GIC>({
    queryKey: ["gic"],
    queryFn: fetchGic,
  });
  if (isError) {
    toast.error("failed to load");
    console.log("failed to load", error);
    return null;
  }

  if (isLoading || !data) {
    return <CreditCardSkeleton />;
  }
  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative text-white pt-32 pb-10 lg:pt-40 lg:pb-36">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
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
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 flex flex-col items-start justify-center text-left">
          <Currency className="mb-4 w-14 h-14 animate-pulse" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 leading-tight max-w-3xl">
            {data?.heading ||
              "Guaranteed Investment Certificate (GIC) for Students Abroad"}
          </h1>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl">
            {data?.description ||
              `Understand the GIC — a secure financial investment required by some
            countries (especially Canada) to prove living expense funds while
            studying abroad.`}
          </p>
        </div>
      </section>

      {/* What is GIC */}
      <div className="w-full max-w-[1400px] mx-auto px-6 py-10">
        <h2 className="text-xl md:text-3xl font-bold mb-8 text-center text-black">
          {data?.title || "What is a Guaranteed Investment Certificate (GIC)?"}
        </h2>
        <p className="text-lg md:text-xl text-justify mb-12 md:text-center text-gray-800 leading-relaxed">
          {data?.description2 ||
            `A GIC is a fixed-term investment offered by Canadian banks (and some
          other countries' financial institutions) aimed at international
          students. It provides proof of funds required for study permit
          applications and guarantees a fixed return on the deposited amount.
          This gives governments confidence you can cover living costs during
          your stay.`}
        </p>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              icon: (
                <ShieldCheck className="w-12 h-12 text-red-600 mx-auto mb-4" />
              ),
              title: "Secure Investment",
              desc: "Your funds are safely held by a recognized bank/institution with guaranteed returns.",
            },
            {
              icon: (
                <UserCheck className="w-12 h-12 text-red-600 mx-auto mb-4" />
              ),
              title: "Visa Requirement",
              desc: "Mandatory for student visa applications in countries like Canada to prove financial capability.",
            },
            {
              icon: (
                <Currency className="w-12 h-12 text-red-600 mx-auto mb-4" />
              ),
              title: "Supports Living Expenses",
              desc: "The invested amount covers essential living costs such as accommodation, food, and transport.",
            },
          ].map(({ icon, title, desc }, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6">
              {icon}
              <h3 className="text-xl font-semibold mb-2 text-black">{title}</h3>
              <p className="text-gray-700">{desc}</p>
            </div>
          ))}
        </div>

        {/* Country Specific Notes */}
        <div className="w-full max-w-[1400px] mx-auto px-6 py-10">
          <h3 className="text-2xl font-bold mb-6 text-black text-center">
            {data?.Requirement_heading || "GIC Requirements by Country"}
          </h3>
          <div className="text-gray-800 text-lg leading-relaxed">
            <ReactMarkdown
              components={{
                ul: ({ node, ...props }) => (
                  <ul className="list-disc list-inside space-y-4" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="text-gray-800 leading-relaxed" {...props} />
                ),
                p: ({ node, ...props }) => <span {...props} />, // prevent <p> inside <li>
                strong: ({ node, ...props }) => (
                  <strong className="font-semibold text-black" {...props} />
                ),
              }}
            >
              {data?.requirement_lists || ""}
            </ReactMarkdown>
          </div>
          {/* <ul className="list-disc list-inside text-gray-800 space-y-4 text-lg">
            <li>
              <strong>Canada:</strong> Minimum CAD $22,895 required for study
              permit proof. Obtainable from banks like RBC, Scotiabank, and
              ICICI Canada.
            </li>
            <li>
              <strong>UK, USA, Australia, Ireland, France, Germany:</strong> GIC
              is typically not mandatory but proof of funds through savings or
              scholarships is required.
            </li>
            <li>
              Check respective country immigration websites for specific
              financial requirements and alternative instruments accepted.
            </li>
          </ul> */}
        </div>
      </div>
    </section>
  );
};
export default GIC;
