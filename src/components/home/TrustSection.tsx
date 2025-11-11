import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { User, GraduationCap, IndianRupee } from "lucide-react";

interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
  backgroundImage: string;
}

const services: Service[] = [
  {
    backgroundImage:
      "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762858858/x1y1ad3cvsxqjchxqefu.jpg",
    icon: <User size={40} color="#ffffff" />,
    title: "Dedicated Banker",
    description:
      "Get personalized assistance from our dedicated education loan bankers to guide you through the entire loan process",
  },
  {
    backgroundImage:
      "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762858859/ks9gnlmo4hrfxo1du04f.jpg",
    icon: <GraduationCap size={40} color="#ffffff" />,
    title: "Easy Application process",
    description:
      "Our streamlined application process makes it simple and quick to apply for an education loan online",
  },
  {
    backgroundImage:
      "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762858858/cfjlrshdlcjj6xkhnaas.jpg",
    icon: <IndianRupee size={40} color="#ffffff" />,
    title: "Under Expert Guidance",
    description:
      "Receive expert guidance from our team of financial advisors to choose the best loan options tailored to your needs",
  },
];

const OurServices: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="mx-auto" style={styles.section}>
      <h2
        style={styles.title}
        data-aos-anchor-placement="center-bottom"
        data-aos="zoom-in"
      >
        Our Services
      </h2>

      {/* The container is horizontally scrollable on mobile */}
      <div
        className="scroll-container"
        role="region"
        aria-label="Scrollable list of services"
      >
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card"
            data-aos="fade-up"
            style={{
              backgroundImage: `url(${service.backgroundImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition:
                index === services.length - 1 ? "center 15%" : "center",
            }}
          >
            {/* pointer-events:none so the overlay doesn't block horizontal drag */}
            <div className="card-overlay" />

            <div className="card-content">
              <div
                className="icon-wrapper"
                data-aos="fade-right"
                data-aos-anchor-placement="center-bottom"
              >
                {service.icon}
              </div>

              <h3
                className="card-title"
                data-aos="fade-right"
                data-aos-anchor-placement="center-bottom"
              >
                {service.title}
              </h3>

              <p
                className="card-desc"
                data-aos="fade-right"
                data-aos-anchor-placement="center-bottom"
              >
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Inline CSS: tuned for reliable horizontal scroll on iOS/Android */}
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
          -webkit-overflow-scrolling: touch;      /* iOS momentum scroll */
          -ms-overflow-style: none;               /* IE/Edge hides scrollbar */
          scrollbar-width: none;                  /* Firefox hides scrollbar */
          touch-action: pan-x;                    /* allow horizontal drag */
        }
        .scroll-container::-webkit-scrollbar { display: none; }

        .service-card {
          position: relative;
          flex: 0 0 auto;                         /* don't shrink */
          min-width: 82vw;                         /* card width on mobile */
          max-width: 82vw;
          height: 320px;
          border-radius: 16px;
          scroll-snap-align: center;              /* snap each card */
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          transition: transform .3s ease;
          display: flex;
          align-items: stretch;
          justify-content: center;
        }
        .service-card:active { transform: scale(.99); }

        .card-overlay {
          pointer-events: none;                   /* don't block swipe */
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
          display: flex; align-items: center; justify-content: center;
          height: 60px; width: 60px;
          margin-bottom: 14px;
        }
        .card-title {
          font-size: 24px;
          font-weight: 800;
          margin: 6px 0 8px;
          color: #0A84FF; /* accent title */
        }
        .card-desc {
          font-size: 18px;
          line-height: 1.5;
          color: #fff;
        }

        /* Tablet/Desktop: switch to 3-column grid, no horizontal scroll */
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
