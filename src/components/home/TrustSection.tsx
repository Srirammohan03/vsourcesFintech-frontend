import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { User, GraduationCap, IndianRupee } from "lucide-react";
import { ServicesBlock } from "@/lib/types/LandingPage";

type Prop = {
  trust: ServicesBlock;
  isLoading: boolean;
};

// Mapping: title (from CMS) -> Icon
const iconMap: Record<string, JSX.Element> = {
  "Dedicated Banker": <User size={40} color="#ffffff" />,
  "Easy Application process": <GraduationCap size={40} color="#ffffff" />,
  "Under Expert Guidance": <IndianRupee size={40} color="#ffffff" />,
};

const OurServices: React.FC<Prop> = ({ trust, isLoading }) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (!trust || !trust.services_list) {
    return null;
  }

  return (
    <section className="mx-auto" style={styles.section}>
      {/* Title from CMS */}
      <h2
        style={styles.title}
        data-aos="zoom-in"
        data-aos-anchor-placement="center-bottom"
      >
        {trust.title}
      </h2>

      <div
        className="scroll-container"
        role="region"
        aria-label="Scrollable list of services"
      >
        {trust.services_list.map((service, index) => (
          <div
            key={service.id}
            className="service-card"
            data-aos="fade-up"
            data-aos-delay={index * 100}
            style={{
              backgroundImage: `url(${service.image?.url})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="card-overlay" />

            <div className="card-content">
              {/* Icon wrapper */}
              <div
                className="icon-wrapper"
                data-aos="fade-right"
                data-aos-delay={index * 200}
                data-aos-anchor-placement="center-bottom"
              >
                {iconMap[service.title] ?? <User size={40} color="#ffffff" />}
              </div>

              <h3
                className="card-title"
                data-aos="fade-right"
                data-aos-delay={index * 200}
                data-aos-anchor-placement="center-bottom"
              >
                {service.title}
              </h3>

              <p
                className="card-desc"
                data-aos="fade-right"
                data-aos-delay={index * 200}
                data-aos-anchor-placement="center-bottom"
              >
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .scroll-container {
          display: flex;
          flex-wrap: nowrap;
          gap: 16px;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 4px 4px 12px;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          -ms-overflow-style: none;
          scrollbar-width: none;
          touch-action: pan-x;
        }
        .scroll-container::-webkit-scrollbar { display: none; }

        .service-card {
          position: relative;
          flex: 0 0 auto;
          min-width: 82vw;
          max-width: 82vw;
          height: 320px;
          border-radius: 16px;
          scroll-snap-align: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          transition: transform .3s ease;
          display: flex;
          align-items: stretch;
          justify-content: center;
        }
        .service-card:active { transform: scale(.99); }

        .card-overlay {
          pointer-events: none;
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,.65);
          border-radius: 16px;
        }

        .card-content {
          position: relative;
          z-index: 1;
          color: #fff;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 60px;
          width: 60px;
          margin-bottom: 14px;
        }

        .card-title {
          font-size: 24px;
          font-weight: 800;
          margin: 6px 0 8px;
          color: #0A84FF;
        }
        .card-desc {
          font-size: 18px;
          line-height: 1.5;
          color: #fff;
        }

        @media (min-width: 768px) {
          .scroll-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            overflow: visible;
            gap: 24px;
          }
          .service-card {
            min-width: 0;
            max-width: 100%;
            height: 340px;
          }
        }
      `}</style>
    </section>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  section: {
    padding: "40px 20px",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    fontWeight: 700,
    marginBottom: "30px",
    color: "#000",
  },
};

export default OurServices;
