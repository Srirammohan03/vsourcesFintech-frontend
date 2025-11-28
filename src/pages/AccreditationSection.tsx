import React, { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Accreditation.css";

// ✅ Preconnect to Cloudinary CDN for faster first-byte
const PreconnectLinks = () => (
  <>
    <link rel="preconnect" href="https://res.cloudinary.com" />
    <link rel="dns-prefetch" href="https://res.cloudinary.com" />
  </>
);

const Accreditation = memo(() => {
  return (
    <>
      <PreconnectLinks />

      <div className="w-full max-w-[1400px] mx-auto px-4 py-8">
        {/* Desktop View */}
        <div className="desktop-marquee">
          <div className="accreditation-wrapper">
            {/* ===== ACCREDITATION ===== */}
            <Link
              to="https://www.icef.com/agency/0016M00002d5M0sQAE"
              className="accreditation-section"
              data-aos="fade-right"
              data-aos-duration="1000"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="section-title">ACCREDITATION</h2>
              <motion.img
                src="/assets/images/icef.webp"
                alt="ICEF Accreditation"
                loading="lazy"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="accreditation-img large-img"
              />
            </Link>

            {/* ===== CERTIFICATIONS ===== */}
            <div
              className="accreditation-section"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <h2 className="section-title">CERTIFICATIONS</h2>
              <motion.img
                src="/assets/images/ets.jpeg"
                alt="ETS Certification"
                loading="lazy"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="accreditation-img large-img"
              />
            </div>

            {/* ===== MEMBERSHIPS ===== */}
            <div
              className="accreditation-section"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <h2 className="section-title">MEMBERSHIPS</h2>
              <div className="membership-row">
                <motion.img
                  src="/assets/images/images.png"
                  alt="EAIE Membership"
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="accreditation-img"
                />
                <motion.img
                  src="/assets/images/nafsa.jpg"
                  alt="NAFSA Membership"
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="accreditation-img"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ===== MOBILE VIEW ===== */}
        <div className="mobile-static mt-8">
          <div className="accreditation-wrapper">
            {/* Accreditation */}
            <div
              className="accreditation-section"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <h2 className="section-title">ACCREDITATION</h2>
              <img
                src="/assets/images/icef.webp"
                alt="ICEF Accreditation"
                loading="lazy"
                className="accreditation-img"
              />
            </div>

            {/* Certifications */}
            <div
              className="accreditation-section"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <h2 className="section-title">CERTIFICATIONS</h2>
              <img
                src="/assets/images/ets.jpeg"
                alt="ETS Certification"
                loading="lazy"
                className="accreditation-img"
              />
            </div>

            {/* Memberships */}
            <div
              className="accreditation-section"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <h2 className="section-title">MEMBERSHIPS</h2>
              <div className="membership-row">
                <img
                  src="/assets/images/images.png"
                  alt="EAIE Membership"
                  loading="lazy"
                  className="accreditation-img"
                />
                <img
                  src="/assets/images/nafsa.jpg"
                  alt="NAFSA Membership"
                  loading="lazy"
                  className="accreditation-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Accreditation;
