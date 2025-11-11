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
                src="https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_350/v1762757629/icef_lzba2f.png"
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
                src="https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_350/v1762707879/ets_hrpoem.webp"
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
                  src="https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_200/v1762707889/images_tzknwo.webp"
                  alt="EAIE Membership"
                  loading="lazy"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="accreditation-img"
                />
                <motion.img
                  src="https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_200/v1762707890/nafsa_awwntg.webp"
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
                src="https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_280/v1762757629/icef_lzba2f.png"
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
                src="https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_280/v1762707879/ets_hrpoem.webp"
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
                  src="https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_180/v1762707889/images_tzknwo.webp"
                  alt="EAIE Membership"
                  loading="lazy"
                  className="accreditation-img"
                />
                <img
                  src="https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto,w_180/v1762707890/nafsa_awwntg.webp"
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
