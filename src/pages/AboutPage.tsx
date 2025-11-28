import React, { useEffect } from "react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import AboutSection from "../components/home/Aboutsectioninside";
import styled from "styled-components";
import SectionTitle from "@/components/SectionTitle";

import img1 from "@/assets/about-us/imgi_6_1698599558.jpg";
import img2 from "@/assets/about-us/imgi_7_1742728530.jpg";
import img3 from "@/assets/about-us/imgi_8_1742879268.jpg";
import img4 from "@/assets/about-us/imgi_9_1698845224.jpg";
import img5 from "@/assets/about-us/imgi_10_1742793595.jpg";
import img6 from "@/assets/about-us/imgi_11_1746726161.jpg";
import img7 from "@/assets/about-us/imgi_12_1659255847.jpg";
import img8 from "@/assets/about-us/imgi_13_1633425065.jpg";
import img9 from "@/assets/about-us/imgi_14_1681479951.jpg";
import img10 from "@/assets/about-us/1653732726.jpg";
import img11 from "@/assets/about-us/imgi_16_1698838414.jpg";
import img12 from "@/assets/about-us/imgi_18_1653732679.jpg";
import img13 from "@/assets/about-us/imgi_17_1746727815.jpg";
import img14 from "@/assets/about-us/imgi_20_1700658713.jpg";
import img15 from "@/assets/about-us/imgi_19_1746799571.jpg";
import img16 from "@/assets/about-us/imgi_22_1742967303.jpg";
import img17 from "@/assets/about-us/imgi_21_1653732920.jpg";
import img18 from "@/assets/about-us/imgi_23_1698835988.jpg";
import img19 from "@/assets/about-us/imgi_24_1742794381.jpg";
import img20 from "@/assets/about-us/imgi_25_1702922280.jpg";
import img21 from "@/assets/about-us/imgi_26_1698841744.jpg";
import img22 from "@/assets/about-us/imgi_27_1702989960.jpg";
import img23 from "@/assets/about-us/imgi_35_1653733108.jpg";
import img24 from "@/assets/about-us/imgi_28_1746788220.jpg";
import img25 from "@/assets/about-us/imgi_29_1742733198.jpg";
import img26 from "@/assets/about-us/imgi_30_1706010104.jpg";
import img27 from "@/assets/about-us/imgi_31_1698844684.jpg";
import img28 from "@/assets/about-us/imgi_32_1702915574.jpg";
import img29 from "@/assets/about-us/imgi_33_1698841454.jpg";
import img30 from "@/assets/about-us/imgi_34_1698839202.jpg";
import img31 from "@/assets/about-us/imgi_37_1742967370.jpg";
import img32 from "@/assets/about-us/imgi_38_1702987001.jpg";
import img33 from "@/assets/about-us/imgi_39_1653732858.jpg";
import img34 from "@/assets/about-us/imgi_40_1742967444.jpg";
import img35 from "@/assets/about-us/imgi_41_1703151553.jpg";
import img36 from "@/assets/about-us/imgi_42_1653732795.jpg";
import img37 from "@/assets/about-us/imgi_43_1684232284.jpg";
import img38 from "@/assets/about-us/imgi_44_1698835021.jpg";
import img39 from "@/assets/about-us/imgi_45_1709625617.jpg";
import img40 from "@/assets/about-us/imgi_46_1711625393.jpg";
import img41 from "@/assets/about-us/imgi_47_1720255503.jpg";
import img42 from "@/assets/about-us/imgi_48_1746798079.jpg";
import img43 from "@/assets/about-us/imgi_49_1746798440.jpg";
import img44 from "@/assets/about-us/imgi_50_1746799685.jpg";
import img45 from "@/assets/about-us/imgi_55_1746800414.jpg";
import img46 from "@/assets/about-us/imgi_51_1746799807.jpg";
import img47 from "@/assets/about-us/imgi_52_1746800109.jpg";
import img48 from "@/assets/about-us/imgi_53_1746800202.jpg";
import img49 from "@/assets/about-us/imgi_54_1746800299.jpg";
import img50 from "@/assets/about-us/imgi_56_1746800837.jpg";
import img51 from "@/assets/about-us/imgi_57_1746800915.jpg";
import img52 from "@/assets/about-us/imgi_58_1746801341.jpg";
import img53 from "@/assets/about-us/imgi_59_1746801607.jpg";
import img54 from "@/assets/about-us/imgi_60_1746802086.jpg";
import img55 from "@/assets/about-us/imgi_61_1746802279.jpg";
import img56 from "@/assets/about-us/imgi_62_1746802437.jpg";
import img57 from "@/assets/about-us/imgi_63_1746802584.jpg";
import img58 from "@/assets/about-us/imgi_64_1702915314.jpg";
import img59 from "@/assets/about-us/imgi_65_1746802945.jpg";
import img60 from "@/assets/about-us/imgi_66_1657097156.jpg";

const AboutPage: React.FC = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        className="pt-40 pb-36 bg-cover bg-center bg-no-repeat relative text-white"
        style={{
          backgroundImage: `url(/assets/images/about-banner.webp)`,
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-darkblue/60 to-gray-900/90"></div>

        {/* Content */}
        <div className="relative w-full max-w-[1400px] mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl text-red-600 font-bold mb-6">
              About Us
            </h1>
            <p className="text-xl text-gray-300">
              Learn about our journey, our team, and our mission to provide
              exceptional educational consultancy for over 20 years.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        .py-16 {
          padding-top: 0.5rem !important;
          padding-bottom: 4rem;
        }
      `}</style>

      {/* About Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4">
          <AboutSection />
        </div>
      </section>

      {/* Management Team Section */}
      <section className="py-16 md:py-24">
        <div className="w-full max-w-[1400px] mx-auto px-4">
          <SectionTitle title="Management Team" />
          <StyledTeamWrapper>
            <div className="main">
              {teamMembers.map((member, index) => {
                return (
                  <div
                    className="profile-card"
                    key={index}
                    data-aos="fade-up"
                    data-aos-anchor-placement="center-bottom"
                  >
                    <div className="img">
                      <img
                        src={member?.image}
                        alt={member?.name}
                        data-aos="flip-left"
                        data-aos-anchor-placement="center-bottom"
                        decoding="async"
                        loading="eager"
                      />
                    </div>
                    <div className="caption">
                      <h3
                        data-aos="fade-right"
                        data-aos-anchor-placement="center-bottom"
                      >
                        {member?.name?.toUpperCase()}
                      </h3>
                      <p
                        data-aos="fade-right"
                        data-aos-anchor-placement="center-bottom"
                      >
                        {member?.position?.toUpperCase()}
                      </p>
                    </div>
                    <div className="extra-info">
                      {member?.bio?.toUpperCase()}
                    </div>
                  </div>
                );
              })}
            </div>
          </StyledTeamWrapper>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Vision */}
            <AnimateOnScroll>
              <div className="border border-gray-200 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#E6F0FF] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-[#0052CC]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center text-[#0052CC]">
                  Our Vision
                </h3>
                <p className="text-center text-gray-700 mt-4 leading-relaxed">
                  To be the leading educational consultancy in India, recognized
                  for our integrity, personalized approach, and consistent
                  delivery of successful academic and career outcomes for our
                  students.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Mission */}
            <AnimateOnScroll delay={200}>
              <div className="border border-gray-200 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#FFF8E1] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-[#FFC107]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center text-[#FFC107]">
                  Our Mission
                </h3>
                <p className="text-center text-gray-700 mt-4 leading-relaxed">
                  To empower students with comprehensive guidance and supportive
                  resources that enable them to make informed decisions about
                  their educational and career paths, both in India and abroad.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;

/* =======================
   TEAM STYLES
======================= */
const StyledTeamWrapper = styled.div`
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 50px 50px;
    padding: 10px;
  }

  .profile-card {
    position: relative;
    width: 100%;
    max-width: 260px;
    height: 355px;
    background: #fff;
    padding: 20px 20px 0px 20px;
    border-radius: 15px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    text-align: center;
    font-family: "Poppins", Arial, sans-serif;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease-in-out;
  }

  .profile-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3);
  }

  .img {
    width: 100%;
    height: 200px;
    position: relative;
    transform: translateY(-45px);
    margin-bottom: 15px;
  }

  .img img {
    width: 200px !important;
    height: 200px !important;
    border-radius: 15px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
  }

  .profile-card:hover .img img {
    transform: scale(1.05);
  }

  .caption {
    transform: translateY(-45px);
  }

  .caption h3 {
    font-size: clamp(0.9rem, 2.5vw, 1.2rem);
    color: #333;
    margin: 0;
  }

  .caption p {
    font-size: clamp(0.9rem, 2vw, 1rem);
    color: rgb(243, 35, 8);
    margin: 5px 0;
  }

  .extra-info {
    font-size: clamp(0.7rem, 2vw, 1rem);
    color: #555;
    transform: translateY(-45px);
  }

  @media (max-width: 460px) {
    .profile-card {
      max-width: 250px;
      height: 320px;
    }
    .img img {
      width: 180px !important;
      height: 180px !important;
    }
  }
`;

const teamMembers = [
  {
    name: "Mr. MOHAMMED MUSTAFA",
    position: "FOUNDER",
    image: img1,
    bio: "VSOURCE COMPANY",
  },
  {
    name: "Mr. NAGENDER RAO",
    position: "MANAGING DIRECTOR",
    image: img2,
    bio: "12 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. CHARAN TEJA",
    position: "CEO",
    image: img3,
    bio: "8 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. Y RANJITH",
    position: "CFO",
    image: img4,
    bio: "12 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. SHAIK YASIN",
    position: "EXECUTIVE DIRECTOR",
    image: img5,
    bio: "8 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. AKRAM",
    position: "DIRECTOR, ADMISSIONS",
    image: img6,
    bio: "12 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. SATYAM TOMER",
    position: "CHEIF TECHNICAL OFFICER",
    image: img7,
    bio: "12 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. VIRENDRA SINGH",
    position: "VICE PRESIDENT",
    image: img8,
    bio: "VSOURCE COMPANY",
  },
  {
    name: "Mr. VIJAY KUMAR",
    position: "CHIEF ADVISOR",
    image: img9,
    bio: "VSOURCE GROUP",
  },
  {
    name: "Mr. ARUN",
    position: "CHEIF OPERATING OFFICER",
    image: img10,
    bio: "10 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. TEJESH NAIDU",
    position: "DIRECTOR, OPERATIONS",
    image: img11,
    bio: "VSOURCE COMPANY",
  },
  {
    name: "Mr. RAJASHEKAR",
    position: "DIRECTOR, EDUCATION",
    image: img12,
    bio: "9 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. HABIB",
    position: "DIRECTOR, MARKETING",
    image: img13,
    bio: "10 YEARS WITH VSOURCE",
  },
  {
    name: "Mrs. PUSHPALATHA REDDY",
    position: "DIRECTOR, OVERSEAS",
    image: img14,
    bio: "7 YEARS WITH VSOURCE",
  },
  {
    name: "Mr. MOULALI",
    position: "DIRECTOR, FINTECH",
    image: img15,
    bio: " ",
  },
  {
    name: "Dr. GIORGI MIKADZE",
    position: "DIRECTOR, SERVICES. LLC",
    image: img17,
    bio: "GEORGIA",
  },
  {
    name: "Dr. MARIAM KANDELAKI",
    position: "DIRECTOR, STUDENT WELFARE",
    image: img16,
    bio: "GEORGIA",
  },
  {
    name: "Mr. SREENATH REDDY",
    position: "DIRECTOR, ADMINISTRATION",
    image: img18,
    bio: "VSOURCE COMPANY",
  },
  {
    name: "Ms. K CHAITHANYA",
    position: "HR",
    image: img19,
    bio: "VSOURCE COMPANY",
  },
  {
    name: "Mr. NARUN REDDY",
    position: "HEAD, MARKETING",
    image: img20,
    bio: "VSOURCE VARSITY",
  },
  {
    name: "Ms. NAVYA",
    position: "HEAD, MARKETING",
    image: img21,
    bio: "VSOURCE OVERSEAS",
  },
  // bpo
  {
    name: "Ms. DEEPIKA",
    position: "INCHARGE, B.P.O",
    image: img22,
    bio: "VSOURCE FINTECH",
  },

  {
    name: "Mr. MAHESH",
    position: "INCHARGE, B.P.O",
    image: img24,
    bio: "VSOURCE OVERSEAS",
  },
  // BRANCH MANAGER
  {
    name: "Ms. RADHA",
    position: "BRANCH MANAGER",
    image: img23,
    bio: "Bengaluru",
  },
  {
    name: "Mr. SRINIVAS CHOWDARY",
    position: "BRANCH MANAGER",
    image: img25,
    bio: "Tirupati",
  },
  {
    name: "Mr. SRINADH YADAV",
    position: "BRANCH MANAGER",
    image: img26,
    bio: "VIJAYAWADA",
  },
  {
    name: "Mr. KIRAN KUMAR",
    position: "BRANCH MANAGER",
    image: img27,
    bio: "VIZAG",
  },
  {
    name: "Ms. NIKHITHA",
    position: "BRANCH MANAGER",
    image: img28,
    bio: "DILSUKHNAGAR",
  },
  {
    name: "Mr. Raj",
    position: "BRANCH MANAGER",
    image: img29,
    bio: "AMEERPET",
  },
  {
    name: "Ms. SPANDANA",
    position: "BRANCH MANAGER",
    image: img30,
    bio: "KUKATPALLY",
  },
  // ADMINISTRATION
  {
    name: "Mrs. TAKO",
    position: "ADMINISTRATION",
    image: img31,
    bio: "GEORGIA",
  },
  {
    name: "Mr. ZAZA",
    position: "ADMINISTRATION",
    image: img32,
    bio: "GEORGIA",
  },
  {
    name: "Ms. NINO",
    position: "ADMINISTRATION",
    image: img34,
    bio: "GEORGIA",
  },
  {
    name: "Mr. DIMITRILP",
    position: "ADMINISTRATION",
    image: img35,
    bio: "GEORGIA",
  },
  {
    name: "Mr. NOORBAZ KHAN QADERI",
    position: "ADMINISTRATION",
    image: img36,
    bio: "RUSSIA",
  },
  {
    name: "Mr. ALEKSANDRE",
    position: "ACCOUNTANT",
    image: img33,
    bio: "GEORGIA",
  },
  {
    name: "Mrs. SHAISTA ASHRAF",
    position: "HEAD ADMISSIONS",
    image: img37,
    bio: "UAE & SAUDI ARABIA",
  },
  // SR
  {
    name: "Mr. SHAIK GAFOOR",
    position: "Sr. ASSOCIATE",
    image: img38,
    bio: "VSOURCE OVERSEAS",
  },
  {
    name: "Mr. VENKATA SASIKUMAR",
    position: "Sr. ASSOCIATE",
    image: img39,
    bio: "VSOURCE VARSITY",
  },
  {
    name: "Mr. MAHESH PATIL",
    position: "Sr. ASSOCIATE",
    image: img40,
    bio: "VSOURCE OVERSEAS",
  },
  {
    name: "Mr. BHANU SAI PRAKASH",
    position: "Sr. ASSOCIATE",
    image: img41,
    bio: "VSOURCE OVERSEAS",
  },
  {
    name: "Mr. RADHA KRISHNA",
    position: "Sr. ASSOCIATE",
    image: img42,
    bio: "VSOURCE VARSITY",
  },
  {
    name: "Mr. VENKAT",
    position: "Sr. ASSOCIATE",
    image: img43,
    bio: "VSOURCE FINTECH",
  },
  {
    name: "Mr. NAGARAJU",
    position: "Sr. ASSOCIATE",
    image: img44,
    bio: "VSOURCE FINTECH",
  },

  {
    name: "Mr. MAHESH GOUD",
    position: "Sr. ASSOCIATE",
    image: img46,
    bio: "VSOURCE FINTECH",
  },
  // JR
  {
    name: "Mr. RAKESH",
    position: "Jr. ASSOCIATE",
    image: img47,
    bio: "VSOURCE OVERSEAS",
  },
  {
    name: "Mr. SHAIK MUNEER",
    position: "Jr. ASSOCIATE",
    image: img48,
    bio: "VSOURCE VARSITY",
  },
  {
    name: "Mr. M PAVAN",
    position: "Jr. ASSOCIATE",
    image: img49,
    bio: "VSOURCE OVERSEAS",
  },
  {
    name: "Mr. NAGA VENKATESH",
    position: "Jr. ASSOCIATE",
    image: img50,
    bio: "VSOURCE OVERSEAS",
  },
  {
    name: "Mr. S PAVAN",
    position: "Jr. ASSOCIATE",
    image: img51,
    bio: "VSOURCE OVERSEAS",
  },
  {
    name: "Mr. BHANU SAIRAM",
    position: "Jr. ASSOCIATE",
    image: img52,
    bio: "VSOURCE VARSITY",
  },
  {
    name: "Mr. VIJAY",
    position: "Jr. ASSOCIATE",
    image: img53,
    bio: "VSOURCE OVERSEAS",
  },
  {
    name: "Mr. SUBRAHMANYAM",
    position: "Jr. ASSOCIATE",
    image: img54,
    bio: "VSOURCE VARSITY",
  },
  {
    name: "Mr. LAKSHMAN",
    position: "Jr. ASSOCIATE",
    image: img55,
    bio: "VSOURCE FINTECH",
  },
  {
    name: "Mr. MOHAN KRISHNA",
    position: "Jr. ASSOCIATE",
    image: img56,
    bio: "VSOURCE FINTECH",
  },
  {
    name: "Mr. RAMU",
    position: "Jr. ASSOCIATE",
    image: img57,
    bio: "VSOURCE FINTECH",
  },
  {
    name: "Mr. FAHAD",
    position: "DIGITAL MARKETING",
    image: img58,
    bio: "VSOURCE OVERSEAS",
  },
  {
    name: "Mr. VAMSHI",
    position: "DIGITAL MARKETING",
    image: img59,
    bio: "VSOURCE VARSITY",
  },
];
