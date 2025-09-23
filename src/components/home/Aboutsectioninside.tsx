import { AboutSectionSkeleton } from "@/Loaders/LandingPages/AboutSectionSkeleton";
import { AboutSectionProps } from "@/lib/types/LandingPage";
import { BoldText } from "@/utils/BoldText";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

const AboutSection: React.FC<AboutSectionProps> = ({
  aboutData,
  isLoading,
  isError,
  error,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  if (isError) {
    toast.error("failed to load");
    console.log("failed to load", error);
  }

  if (isLoading || !aboutData) {
    return <AboutSectionSkeleton />;
  }

  return (
    <section className="about-section" ref={sectionRef}>
      <div className="w-full max-w-[1400px] mx-auto">
        <div className={`content ${isVisible ? "visible" : ""}`}>
          {/* LEFT TEXT SECTION */}
          <div
            className="text-section"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <h1
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="200"
              data-aos-anchor-placement="center-bottom"
            >
              {aboutData?.title || "About Vsource Fintech"}
            </h1>

            <p
              className="subheading"
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="400"
              data-aos-anchor-placement="center-bottom"
            >
              <strong>
                {aboutData?.description ||
                  "Empowering Dreams with Tailored Student Loans"}
              </strong>
            </p>

            {aboutData &&
              aboutData?.subheadings &&
              aboutData?.subheadings?.map((text, i) => (
                <BoldText key={text?.id || i} text={text?.description} />
              ))}

            {/* STATS SECTION */}
            <div
              className="stats"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
              data-aos-delay="700"
            >
              {aboutData &&
                aboutData?.about_cards &&
                aboutData?.about_cards?.map((stat, index) => {
                  return (
                    <div
                      key={stat.id}
                      className="stat-block"
                      data-aos="fade-up"
                      data-aos-anchor-placement="center-bottom"
                      data-aos-duration="1000"
                      data-aos-delay={800 + index * 200}
                    >
                      <img
                        src={stat?.image?.url}
                        alt={stat?.image?.alternativeText || "Icon"}
                        className="icon"
                      />
                      <div className="stat-info">
                        <div className="count">
                          {Number(stat.count).toLocaleString("en-US")}+
                        </div>
                      </div>
                      <div className="label">{stat?.text}</div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div
            className="image-section"
            data-aos="fade-right"
            data-aos-anchor-placement="center-bottom"
            data-aos-duration="1200"
            data-aos-delay="400"
          >
            <img
              src={
                aboutData?.chairman?.url ||
                "https://vsourcevarsity.com/assets/images/founder.webp"
              }
              alt="Founder"
              data-aos="fade-right"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1200"
              data-aos-delay="500"
            />
            <p
              className="caption"
              data-aos="fade-left"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1000"
              data-aos-delay="700"
            >
              <strong style={{ fontSize: "20px" }}>“</strong>
              Redefining Education for Tomorrow’s Innovators
              <strong style={{ fontSize: "20px" }}>”</strong>
            </p>
          </div>
        </div>
      </div>

      {/* CSS */}
      <style>{`
    .about-section {
      font-family: 'Barlow', sans-serif;
      background-color: #fff;
      color: #333;
      padding: 40px 20px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 15px;
      box-sizing: border-box;
    }

    .content {
      display: flex;
      flex-direction: row;
      gap: 40px;
      opacity: 0;
      transform: translateY(50px);
      transition: all 0.8s ease-out;
    }

    .content.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .text-section {
     
    flex-basis: 60%;
    max-width: 60%;
    }

    .image-section {
      border: 1px solid grey;
    border-radius: 15px;
    padding: 5px;
    text-align: center;
    max-width: 40%;
    margin: 0 auto;
    flex-basis: 40%;
    }

    .stats {
    display: flex;
    gap: 20px;
    width: 100%;
    /* margin: 0 auto; */
    justify-items: center;
    align-items: center;
}

    .stat-block {
      display: flex;
      align-items: center;
      gap: 15px;
      text-align: left;
    }

    .stat-block .icon {
      width: 40px;
      height: 40px;
      object-fit: contain;
      flex-basis:30%
    }

    .stat-info {
      display: flex;
      flex-basis: 20%;
    justify-content: center;
    align-items: center;
    }

    .count {
      font-size: 27px;
      color: #1e73be;
      font-weight: bold;
    }

    .label {
      font-size: 20px;
      color: #555;
      margin-left: 8px;
      text-align:right;
      flex-basis: 50%;
    }
    @media (max-width: 1060px) {
          .content {
        flex-direction: column;
        align-items: center;
      }
         .text-section {
     
    flex-basis: 90%;
    max-width: 90%;
    }
      .image-section {
    max-width: 90%;
    flex-basis: 90%;
    }
    }

    @media (max-width: 485px) {
    
         .label {
        font-size: 15px;
        width: 100%;
        flex-basis: 30%;
    }
        label:first-child{
          margin-left: 0px;
        }
    }

    h1 {
      font-size: 29px;
      color: #1e73be;
      margin-top: 20px;
    }

    .subheading {
      font-size: 20px;
      margin-bottom: 20px;
      color: black;
      margin-top: 20px;
    }

    .paragraph {
      font-size: 15px;
      line-height: 1.6;
      color: black;
      margin-bottom: 15px;
      margin-top: 10px;
      
    }

    @media (max-width: 768px) {
     .about-section {
        padding: 20px ;
      }
      .paragraph {
        text-align:justify
      }
      h1 {
        font-size: 26px;
      }
      .subheading {
        font-size: 18px;
        margin-top: 10px;
      }
    }

    .caption {
      font-size: 15px;
      color: black;
      margin-top: 10px;
    }

    @media (max-width: 768px) {

      .stat-info {
        flex-direction: row !important;
        align-items: center;
      }

      .stats {
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }

      .stat-block {
    width: 100%;
}

      .text-section {
    flex-basis: 100%;
    max-width: 100%;
}

.image-section {
    max-width: 100%;
    flex-basis: 100%;
}
    }
  `}</style>
    </section>
  );
};

export default AboutSection;
