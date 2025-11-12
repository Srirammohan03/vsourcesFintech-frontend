import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BanksBlock } from "@/lib/types/LandingPage";
import axios from "axios";
import qs from "qs";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import BannerSkeleton from "@/Loaders/about-us/BannerSkeleton";

const query = qs.stringify({
  populate: {
    blocks: {
      on: {
        "fintech.banks": {
          populate: {
            bank: {
              populate: {
                logo: { fields: ["url", "name", "documentId"] },
              },
            },
          },
        },
      },
    },
  },
});

const fetchHome = async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_CMS_GLOBALURL}/api/fintech-landing-page?${query}`
    );
    return data?.data?.blocks[0] || {};
  } catch (error) {
    throw new Error("Failed to fetch bank data");
  }
};

const Banksloans: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(8);
  const {
    data: bankBlock,
    isLoading,
    isError,
    error,
    refetch,
    isPending,
  } = useQuery<BanksBlock>({
    queryKey: ["landingPage"],
    queryFn: fetchHome,
    staleTime: 10 * 60 * 1000,
    retry: 2,
  });

  if (isLoading) return <BannerSkeleton />;

  if (isError) {
    toast.error((error as Error).message || "Something went wrong");
    return (
      <div className="text-center py-10">
        <p className="text-gray-600 mb-4">
          Failed to load bank data. Please try again.
        </p>
        <button
          onClick={() => refetch()}
          className="px-6 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          disabled={isLoading || isPending}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!bankBlock?.bank?.length)
    return (
      <p className="text-center text-gray-500 py-10">
        No bank partners available at the moment.
      </p>
    );

  const visibleBanks = bankBlock.bank.slice(0, visibleCount);

  const handleToggle = () => {
    if (visibleCount >= bankBlock.bank.length) {
      setVisibleCount(8);
    } else {
      setVisibleCount((prev) => prev + 8);
    }
  };

  return (
    <section className="py-10 lg:py-16 bg-surface">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {bankBlock.heading || "Our Trusted Lending Partners"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {bankBlock.description ||
              "We partner with leading financial institutions to offer you the best loan options"}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {visibleBanks.map((bank) => (
            <motion.div
              key={bank.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white flex flex-col"
            >
              <Link to={bank.path || "#"}>
                <div className="flex-1 flex items-center justify-center p-4">
                  <img
                    src={bank.logo?.url || "/assets/images/placeholder.png"}
                    alt={bank.name}
                    className="max-h-12 object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/images/placeholder.png";
                    }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {bankBlock.bank.length > 8 && (
          <div className="text-center mt-8">
            <button
              onClick={handleToggle}
              className="px-6 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            >
              {visibleCount >= bankBlock.bank.length
                ? "Show Less"
                : "Load More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Banksloans;
