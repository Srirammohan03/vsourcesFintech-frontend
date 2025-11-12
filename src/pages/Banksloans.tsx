import { Partner, partners } from "@/lib/partners";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Banksloans = () => {
  const [visibleCount, setVisibleCount] = useState(8); // show first 8 (4x2)

  const visiblePartners: Partner[] = partners.slice(0, visibleCount);

  const handleToggle = () => {
    if (visibleCount >= partners.length) {
      setVisibleCount(8); // reset to first 8
    } else {
      setVisibleCount((prev) => prev + 8); // load next 8
    }
  };
  return (
    <div>
      {/* Loan Partners Section */}
      <section
        className="py-10 lg:py-16 bg-surface"
        data-aos="fade-up"
        data-aos-offset="80"
        data-aos-duration="700"
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Trusted Lending Partners
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We partner with leading financial institutions to offer you the
              best loan options tailored to your needs.
            </p>
          </motion.div>

          {/* Partners Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            }}
          >
            {visiblePartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
                className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white flex flex-col cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 6px 20px rgba(0,0,0,0.1)",
                }}
              >
                <Link to={partner.path}>
                  <div className="flex-1 flex items-center justify-center p-6">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      loading="lazy"
                      className="max-h-12 object-contain"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Banksloans;
