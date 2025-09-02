import React from "react";
import { motion } from "framer-motion";
import "./Accreditation.css";
import { Link } from "react-router-dom";

const Accreditation = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-8">
      {/* Desktop View */}
      <div className="desktop-marquee">
        <div className="accreditation-wrapper">
          {/* Accreditation */}
          <Link
            to="https://www.icef.com/agency/0016M00002d5M0sQAE"
            className="accreditation-section"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="0"
            target="_blank"
          >
            <h2 className="section-title">ACCREDITATION</h2>
            <img
              src="https://icef-api-production.s3.eu-central-1.amazonaws.com/ias_material/0016M00002d5M0sQAE_badge.png"
              alt="ICEF Accreditation"
              className="accreditation-img large-img"
            />
          </Link>

          {/* Certifications */}
          <div
            className="accreditation-section"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            <h2 className="section-title">CERTIFICATIONS</h2>
            <img
              src="assets/images/ets.jpeg"
              alt="ETS Certification"
              className="accreditation-img large-img"
            />
          </div>

          {/* Memberships */}
          <div
            className="accreditation-section"
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay="400"
          >
            <h2 className="section-title">MEMBERSHIPS</h2>
            <div className="membership-row">
              <img
                src="assets/images/images.png"
                alt="EAIE Membership"
                className="accreditation-img"
                data-aos="fade-up"
                data-aos-delay="600"
                data-aos-duration="900"
              />
              <img
                src="assets/images/nafsa.jpeg"
                alt="NAFSA Membership"
                className="accreditation-img"
                data-aos="fade-up"
                data-aos-delay="800"
                data-aos-duration="900"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View - Stacked */}
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
              src="https://icef-api-production.s3.eu-central-1.amazonaws.com/ias_material/0016M00002d5M0sQAE_badge.png"
              alt="ICEF Accreditation"
              className="accreditation-img"
            />
          </div>

          {/* Certifications */}
          <div
            className="accreditation-section"
            data-aos="zoom-in"
            data-aos-delay="200"
            data-aos-duration="1000"
          >
            <h2 className="section-title">CERTIFICATIONS</h2>
            <img
              src="assets/images/ets.jpeg"
              alt="ETS Certification"
              className="accreditation-img"
            />
          </div>

          {/* Memberships */}
          <div
            className="accreditation-section"
            data-aos="zoom-in"
            data-aos-delay="400"
            data-aos-duration="1000"
          >
            <h2 className="section-title">MEMBERSHIPS</h2>
            <div className="membership-row">
              <img
                src="assets/images/images.png"
                alt="EAIE Membership"
                className="accreditation-img"
                data-aos="fade-up"
                data-aos-delay="600"
                data-aos-duration="900"
              />
              <img
                src="assets/images/nafsa.jpeg"
                alt="NAFSA Membership"
                className="accreditation-img"
                data-aos="fade-up"
                data-aos-delay="800"
                data-aos-duration="900"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accreditation;
