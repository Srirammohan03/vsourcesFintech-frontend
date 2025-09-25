import React from "react";
import { Globe, Phone } from "lucide-react";
import qs from "qs";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { SimCards } from "@/lib/types/OurService";
import { toast } from "sonner";
import CreditCardSkeleton from "@/Loaders/our-services/CreditCardSkeleton";
import RichText from "@/utils/RichText";

const query = qs.stringify({
  populate: {
    our_services: {
      on: {
        "fintech.sim-cards": {
          populate: {
            background_image: { fields: ["url", "name", "documentId"] },
          },
        },
      },
    },
  },
});
const fetchSimCard = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_CMS_GLOBALURL}/api/our-service?${query}`
  );
  return data?.data?.our_services[0] || {};
};

const destinations = [
  "USA",
  "UK",
  "Canada",
  "Ireland",
  "France",
  "Germany",
  "Australia",
];

export default function SimCard() {
  const { data, isLoading, isError, error } = useQuery<SimCards>({
    queryKey: ["simcard"],
    queryFn: fetchSimCard,
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
    <div>
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
          <Globe className=" mb-4 w-14 h-14 animate-pulse" />
          <h1 className="text-xl md:text-3xl font-extrabold mb-4 max-w-3xl">
            {data?.heading || "Stay Connected Abroad with Student SIM Cards"}
          </h1>
          <p className="max-w-2xl text-lg md:text-xl leading-relaxed">
            {data?.description ||
              "Explore the best SIM card options for students studying abroad in USA, UK, Canada, Ireland, France, Germany, and Australia. Enjoy affordable local data, calls, and seamless connectivity tailored for international students."}
          </p>
        </div>
      </section>

      {/* What is Student SIM Card */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-900">
          {data?.providers_heading || "What is a Student SIM Card?"}
        </h2>
        <p className="text-lg md:text-xl max-w-4xl mx-auto text-center mb-12 leading-relaxed">
          {data?.providers_description ||
            "A Student SIM card is a special local or international SIM arrangement designed specifically for students abroad. It offers affordable data plans, free incoming calls, local minutes & texts, and sometimes international calling to home countries.  Many come as physical SIMs or eSIMs for easy activation on arrival."}
        </p>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              icon: <Phone className="w-12 h-12 text-blue-600 mb-3" />,
              title: "Affordable Data & Calls",
              desc: "Save on roaming charges with student-specific SIM plans offering reasonable data and unlimited local calls.",
            },
            {
              icon: <Globe className="w-12 h-12 text-blue-600 mb-3" />,
              title: "Easy Activation",
              desc: "Get eSIMs activated remotely or physical SIMs delivered before departure, so you stay connected the moment you land.",
            },
            {
              icon: <Phone className="w-12 h-12 text-blue-600 mb-3" />,
              title: "Coverage Across Destinations",
              desc: `Reliable network coverage in ${destinations.join(
                ", "
              )} so you can stay connected in your study destination and while traveling.`,
            },
          ].map(({ icon, title, desc }, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-lg text-center"
            >
              {icon}
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-700">{desc}</p>
            </div>
          ))}
        </div>

        {/* Popular Providers & Plans */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center">
            {data?.providers_heading ||
              "Popular Student SIM Card Providers & Plans"}
          </h3>
          <p className="text-center max-w-3xl mx-auto text-lg mb-8">
            {data?.providers_description ||
              "Plans vary per country, some examples:"}
          </p>
          <div className="max-w-xl mx-auto prose text-gray-800 text-lg">
            <RichText content={data?.provider_list} />
          </div>
          <p className="mt-8 text-center text-gray-600 italic">
            *Prices and features may vary and change frequently. Check official
            provider sites for latest plans.
          </p>
        </div>
      </div>
    </div>
  );
}
