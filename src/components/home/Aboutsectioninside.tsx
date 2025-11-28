import React, { useState, useEffect, useRef } from "react";

const AboutSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      id: 1,
      value: 100000,
      suffix: "+",
      label: "Students Empowered",
      icon: "https://cdn-icons-gif.flaticon.com/6454/6454106.gif",
    },
    {
      id: 2,
      value: 20,
      suffix: "+",
      label: "Years of Experience",
      icon: "https://cdn-icons-gif.flaticon.com/15370/15370761.gif",
    },
    {
      id: 3,
      value: 10,
      suffix: "+",
      label: "Study Destinations",
      icon: "https://cdn-icons-gif.flaticon.com/15747/15747340.gif",
    },
  ];

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

  const useCounter = (end: number, start = 0, duration = 2000) => {
    const [count, setCount] = useState(start);

    useEffect(() => {
      if (!isVisible) return;

      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }, [end, start, duration, isVisible]);

    return count;
  };

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
              data-aos-anchor-placement="center-bottom"
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              About Vsource Fintech
            </h1>

            <p
              className="subheading text-lg md:text-xl font-semibold text-red-600 mb-4"
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-anchor-placement="center-bottom"
            >
              <span className="font-semibold">
                Empowering Dreams with Tailored Student Loans
              </span>
            </p>

            <p
              className="paragraph text-gray-700 mb-4 leading-relaxed"
              data-aos="fade-right"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1000"
            >
              At <span className="font-semibold">VSource Fintech</span>, we
              believe that financial barriers should never stand in the way of
              education. With over{" "}
              <span className="font-semibold">20 years of expertise</span> in
              financial services, we specialize in{" "}
              <span className="font-semibold">student loans</span> that make
              higher education accessible and affordable for ambitious learners
              in India and abroad.
            </p>

            <p
              className="paragraph text-gray-700 mb-4 leading-relaxed"
              data-aos="fade-right"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1000"
            >
              Partnering with{" "}
              <span className="font-semibold">leading banks and NBFCs</span>, we
              offer loans that cover{" "}
              <span className="font-semibold">
                tuition fees, living expenses, travel, and insurance
              </span>
              , ensuring you can focus entirely on your studies. Our solutions
              are designed with{" "}
              <span className="font-semibold">
                flexible repayment options, competitive interest rates,
              </span>{" "}
              and <span className="font-semibold">transparent guidance</span> to
              ease your financial journey.
            </p>

            <p
              className="paragraph text-gray-700 leading-relaxed"
              data-aos="fade-right"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1000"
            >
              Thousands of students have trusted us to turn their{" "}
              <span className="font-semibold">
                study abroad dreams into reality
              </span>
              . At VSource Fintech, we don’t just provide loans — we provide a{" "}
              <span className="font-semibold">
                foundation for your global success story
              </span>
              .
            </p>

            <p
              className="paragraph font-semibold text-2xl"
              data-aos="fade-right"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1000"
            >
              Our Legacy in Numbers
            </p>

            {/* STATS SECTION */}
            <div
              className="stats"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              {stats.map((stat, index) => {
                const count = useCounter(stat.value);
                return (
                  <div
                    key={stat.id}
                    className="stat-block"
                    data-aos="fade-up"
                    data-aos-anchor-placement="center-bottom"
                    data-aos-duration="1000"
                  >
                    <img src={stat.icon} alt={stat.label} className="icon" />
                    <div className="stat-info">
                      <div className="count">
                        {count}
                        {stat.suffix}
                      </div>
                    </div>
                    <div className="label">{stat.label}</div>
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
          >
            <img
              src="/assets/images/founder.webp"
              alt="Founder"
              data-aos="fade-right"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1200"
            />
            <p
              className="caption"
              data-aos="fade-left"
              data-aos-anchor-placement="center-bottom"
              data-aos-duration="1000"
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
      .content {
        flex-direction: column;
        align-items: center;
      }

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
