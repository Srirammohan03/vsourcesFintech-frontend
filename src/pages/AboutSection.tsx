import { AboutUsBlock } from "@/lib/types/LandingPage";
import React, { useState, useEffect, useRef } from "react";
type Prop = { about: AboutUsBlock; isLoading: boolean };
const AboutSection: React.FC<Prop> = ({ about }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      id: 1,
      value: 100000,
      suffix: "+",
      label: "Students Happier",
      icon: "https://cdn-icons-gif.flaticon.com/6454/6454106.gif",
    },
    {
      id: 2,
      value: 20,
      suffix: "+",
      label: "Years of\nExperience",
      icon: "https://cdn-icons-gif.flaticon.com/15370/15370761.gif",
    },
    {
      id: 3,
      value: 25,
      suffix: "+",
      label: "Banking & NBFC Ties",
      icon: "/assets/images/diversity.gif",
    },
    {
      id: 4,
      value: 500,
      suffix: "+ cr",
      label: "Disbursed Every Year",
      icon: "/assets/images/money-bag.gif",
    },
  ];
  const defaultContent = [
    {
      id: "static-1",
      gif: { url: "/assets/images/Graduation-Hat.gif", name: "Graduation Hat" },
      title: "Study Abroad Education Loans Made Easy",
      sub_title:
        "Are you planning to study abroad but worried about finances? We are South India's most trusted name in education loan guidance, helping students secure study abroad loans with ease, speed, and confidence.",
    },
    {
      id: "static-2",
      gif: { url: "/assets/images/globe.gif", name: "Globe" },
      title: "100% Assistance for Education Loans to Study Abroad",
      sub_title:
        "We offer end-to-end support for students looking to finance their higher education overseas. From choosing the right loan provider to assisting with documentation, approval, and disbursement — we make the entire education loan process simple and stress-free.",
    },
    {
      id: "static-3",
      gif: { url: "/assets/images/Briefcase.gif", name: "Briefcase" },
      title: "Trusted Education Loan Experts for Top Global Destinations",
      sub_title:
        "We specialize in securing study abroad loans for students heading to: UK, USA, Ireland, France, and Canada.",
    },
  ];

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const useCounter = (end: number, start = 0, duration = 2000) => {
    const [count, setCount] = useState(start);
    useEffect(() => {
      if (!isVisible) return;
      let startTime: number | null = null;
      const step = (t: number) => {
        if (startTime === null) startTime = t;
        const p = Math.min((t - startTime) / duration, 1);
        setCount(Math.floor(p * (end - start) + start));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, [end, start, duration, isVisible]);
    return count;
  };
  const contentData =
    about?.content && about.content.length > 0 ? about.content : defaultContent;
  return (
    <section className="about-section" ref={sectionRef}>
      <div className="w-full max-w-[1400px] mx-auto px-4">
        <div className="top-section">
          <div className="left">
            {/* Heading */}
            <h2
              data-aos="fade-right"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1000"
              data-aos-delay="0"
              className="text-[#1e73be]"
            >
              {about?.heading || "About Vsource Fintech"}
            </h2>

            {/* Section 1 */}
            {contentData?.map((con, idx) => {
              return (
                <div key={con?.id || idx}>
                  {" "}
                  <div
                    className="flex items-start  pt-3"
                    data-aos="fade-right"
                    data-aos-anchor-placement="center-bottom"
                    data-aos-duration="1000"
                    data-aos-delay="200"
                  >
                    <img
                      src={con?.gif?.url || ""}
                      alt="Graduation Hat"
                      className="w-10 h-10 mt-1 flex-shrink-0"
                    />
                    <span className="font-bold text-lg md:leading-10">
                      {con?.title || ""}
                    </span>
                  </div>
                  <p
                    className="para pb-1"
                    data-aos="fade-right"
                    data-aos-anchor-placement="center-bottom"
                    data-aos-duration="1000"
                    data-aos-delay="200"
                  >
                    {con?.sub_title || ""}{" "}
                  </p>
                </div>
              );
            })}

            {/* Final Paragraph */}
            <p
              className="para"
              data-aos="fade-right"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <span className="font-bold">100% Educational Loan Guidance </span>
              provided to support your academic journey.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:hidden ">
            {about &&
              about?.about_number &&
              about?.about_number?.map((stat, i) => {
                const numericValue =
                  parseFloat(stat.count.replace(/[^0-9.]/g, "")) || 0;
                const count = useCounter(numericValue);
                return (
                  <div
                    key={stat.id}
                    className="stat-box"
                    data-aos="fade-up"
                    data-aos-delay={i * 200}
                    data-aos-duration="1000"
                    data-aos-anchor-placement="center-bottom"
                  >
                    <div className="left-box">
                      <img
                        src={stat?.image?.url}
                        alt={stat?.image?.name || ""}
                        className="icon"
                      />
                      <div className="count text-[#1e73be]">
                        {count.toLocaleString("en-US")}+
                      </div>
                    </div>
                    <div className="label">{stat.text}</div>
                  </div>
                );
              })}
          </div>

          <div
            className="right"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
            data-aos-anchor-placement="center-bottom"
          >
            <img
              src={
                about?.chairman.url ||
                "https://vsourcevarsity.com/assets/images/founder.webp"
              }
              alt="Founder"
              className="founder-img"
            />
            <p className="quote">
              “Redefining Education for Tomorrow’s Innovators”
            </p>
          </div>
        </div>
        {about?.about_number?.length ? (
          <div className="bottom-section">
            {about.about_number.map((stat, i) => {
              // Extract numeric part
              const numericValue =
                parseFloat(stat.count.replace(/[^0-9.]/g, "")) || 0;

              // Extract suffix (non-numeric characters)
              const suffix = stat.count.replace(/[0-9.,\s]/g, "");

              const count = useCounter(numericValue);

              return (
                <div
                  key={stat.id}
                  className="stat-box"
                  data-aos="fade-up"
                  data-aos-delay={i * 200}
                  data-aos-duration="1000"
                  data-aos-anchor-placement="center-bottom"
                >
                  <div className="left-box">
                    <img
                      src={stat.image?.url || ""}
                      alt={stat.image?.name || "Stat Icon"}
                      className="icon"
                    />
                    <div className="count text-[#1e73be]">
                      {count.toLocaleString("en-US")} {suffix} +
                    </div>
                  </div>
                  <div className="label">{stat.text}</div>
                </div>
              );
            })}
          </div>
        ) : (
          // fallback if no data
          <div className="bottom-section">
            <p>No stats available</p>
          </div>
        )}
      </div>

      <style>{`
        .about-section {
          padding: clamp(32px, 4vw, 50px) 16px;
          background: #fff;
          font-family: 'Barlow', sans-serif;
          color: #111;
        }
        .container { max-width: 1200px; margin: 0 auto; }

        .top-section {
          display: grid;
          grid-template-columns: 1fr;   
          gap: 24px;
        }

        @media (min-width: 768px) {
          .top-section {
            grid-template-columns: 65% 30%; 
            gap: 32px;
            align-items: start;
          }
        }

        .left { min-width: 0; }
        .right { display: flex; flex-direction: column; align-items: center; }
        h2 { font-size: clamp(30px, 3.6vw, 32px); font-weight: 700; margin: 0; }
        .desc { font-size: clamp(20px, 2.5vw, 25px); margin: 8px 0 0; line-height: 1.6; }
        .para { font-size: clamp(15px, 2.3vw, 15px); margin: 8px 0 0; }

        .features { list-style: none; padding: 0; margin: 16px 0 0; display: grid; gap: 10px; }
        .features li { display: grid; grid-template-columns: 22px 1fr; gap: 10px; font-size: clamp(15px, 2.3vw, 15px); }
        .features li img { width: 22px; height: 22px; margin-top: 2px; }

        .founder-img { width: 100%; max-width: 450px; border-radius: 10px; border: 1px solid #e5e7eb; }
        .quote { font-style: italic; margin-top: 10px; text-align: center; font-size: 15px; }

        /* Stats grid */
        .bottom-section {
          margin-top: clamp(28px, 6vw, 50px);
          display: grid;
          grid-template-columns: 1fr; /* mobile */
          gap: 20px;
          // width: 80%;
          margin: clamp(28px, 6vw, 50px) auto 0;
        }
        @media (min-width: 640px) {
          .bottom-section {
            grid-template-columns: repeat(2, 1fr); /* tablet */
          }
        }
        @media (min-width: 1024px) {
          .bottom-section {
            grid-template-columns: repeat(4, 1fr); /* desktop */
          }
        }

        .stat-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #0069E9;
          border-radius: 8px;
          padding: 13px;
          min-height: 80px;
          background: #fff;
          box-sizing: border-box;
        }

        .left-box {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .icon {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          object-fit: contain;
        }

        .bottom-section .stat-box:first-child .icon {
          width: 52px;
          height: 52px;
        }

        .count {
          font-size: clamp(20px, 4.5vw, 30px);
          font-weight: 800;
          margin: 0;
          white-space: nowrap;
        }

        .label {
          font-size: clamp(13px, 3.5vw, 15px);
          font-weight: 600;
          color: #111;
          line-height: 1.3;
          text-align: right;
          margin-left: 10px;
          width: 34%;
        }

        /* Ultra-small phones */
        @media (max-width: 380px) {
          .stat-box { gap: 8px; padding: 10px; }
          .count { font-size: 18px; }
          .label { font-size: 12px; }
        }
        @media (max-width: 540px) {
          .left-box {
              width: 50%;
              justify-content: space-between;
            }
          .stat-box:first-child .left-box {
              width: 60%;
              justify-content: space-between;
            }
          }
            
        @media (max-width: 640px) {
          .bottom-section{
            display:none;
          }
        }


        /* Accessibility: disable motion */
        @media (prefers-reduced-motion: reduce) {
          .about-section * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
