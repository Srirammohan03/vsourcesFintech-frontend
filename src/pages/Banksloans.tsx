import { Partner, partners } from '@/lib/partners';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

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
      <section className="py-10 lg:py-16 bg-surface">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Our Trusted Lending Partners
            </h2>
            <p className="text-lg text-muted-foreground">
              We partner with leading financial institutions to offer you the best
              loan options
            </p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {visiblePartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white flex flex-col"
              >
                <Link to={`/partners/${partner.slug}`}>
                  {/* Logo */}
                  <div className="flex-1 flex items-center justify-center p-4">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-12 object-cover"
                    />
                  </div>

                  {/* Rate */}
                  <div
                    className={`${partner.color} text-white py-2 text-sm font-medium text-center`}
                  >
                    {partner.rate}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Toggle Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleToggle}
              className="text-blue-600 font-medium hover:underline"
            >
              {visibleCount >= partners.length ? "View Less" : "View More..."}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Banksloans