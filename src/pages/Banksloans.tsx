import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BanksBlock } from '@/lib/types/LandingPage';

type Prop = {
  bankBlock?: BanksBlock | null;
  isLoading: boolean;
};

// credila /our-partners/credila nbfc  /our-partners/nbfc auxilo  /our-partners/auxilo
const Banksloans: React.FC<Prop> = ({ bankBlock, isLoading }) => {
  const [visibleCount, setVisibleCount] = useState(8); // show first 8 banks

  if (isLoading || !bankBlock || !bankBlock.bank) {
    return <p className="text-center">Loading...</p>;
  }

  const visibleBanks = bankBlock.bank.slice(0, visibleCount);

  const handleToggle = () => {
    if (visibleCount >= bankBlock.bank.length) {
      setVisibleCount(8); // reset to first 8
    } else {
      setVisibleCount((prev) => prev + 8); // load next 8
    }
  };

  return (
    <section className="py-10 lg:py-16 bg-surface">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
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
            {bankBlock.description || "We partner with leading financial institutions to offer you the best loan options"}
          </p>
        </motion.div>

        {/* Banks Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {visibleBanks.map((bank) => (
            <motion.div
              key={bank.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white flex flex-col"
            >
              <Link to={bank.path || '#'}>
                <div className="flex-1 flex items-center justify-center p-4">
                  <img
                    src={bank.logo?.url || "/assets/images/placeholder.png"}
                    alt={bank.name}
                    className="max-h-12 object-cover"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        {bankBlock.bank.length > 8 && (
          <div className="text-center mt-8">
            <button
              onClick={handleToggle}
              className="px-6 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition"
            >
              {visibleCount >= bankBlock.bank.length ? "Show Less" : "Load More"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Banksloans;
