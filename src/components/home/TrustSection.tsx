import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { User, GraduationCap, IndianRupee, MapPin } from "lucide-react";

interface Service {
  icon: JSX.Element;
  title: string;
  description: string;
  backgroundImage: string;
}

const services: Service[] = [
  {
    backgroundImage: "/assets/images/dedicated-banker.jpg",
    icon: <User size={40} color="#ffffff" />,
    title: "Dedicated Banker",
    description:
      "Get personalized assistance from our dedicated education loan bankers to guide you through the entire loan process",
  },
  {
    backgroundImage:
      "/assets/images/Easy-Applicationprocess.jpg",
    icon: <GraduationCap size={40} color="#ffffffff" />,
    title: "Easy Application process",
    description:
      "Our streamlined application process makes it simple and quick to apply for an education loan online",
  },
  {
    backgroundImage: "/assets/images/UnderExpert-Guidance.jpg",
    icon: <IndianRupee size={40} color="#ffffffff" />,
    title: "Under Expert Guidance",
    description:
      "Receive expert guidance from our team of financial advisors to choose the best loan options tailored to your needs",
  },
];

const OurServices: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
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
      <div className="scroll-container">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card"
            data-aos="fade-up"
            data-aos-delay={index * 100}
            style={{
              backgroundImage: ` url(${service.backgroundImage})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: index === services.length - 1 ? "center 15%" : "center",
            }}
          >
            <div className="absolute inset-0 bg-black/70 rounded-[16px]"></div>
            <div className="relative z-10 flex flex-col items-center text-white">
              <div
                className="icon-wrapper mb-4"
                data-aos="fade-right"
                data-aos-delay={index * 200}
                data-aos-anchor-placement="center-bottom"
              >
                {service.icon}
              </div>
              <h3
                className="text-2xl font-bold mb-3 text-blue-500"
                data-aos="fade-right"
                data-aos-delay={index * 200}
                data-aos-anchor-placement="center-bottom"
              >
                {service.title}
              </h3>
              <p
                className="text-lg"
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

      {/* Inline CSS for responsive behavior & animation */}
      <style>{`
  .scroll-container {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    gap: 16px;
    scroll-snap-type: x mandatory;
    padding-bottom: 10px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    justify-content: center; /* ✅ center on small screens */
  }

  .scroll-container::-webkit-scrollbar {
    display: none;
  }

  .service-card {
    position: relative;
    flex: 0 0 85%;
    max-width: 85%;
    scroll-snap-align: center; /* ✅ center each card while scrolling */
    border-radius: 16px;
    padding: 24px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 300px;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    height: 60px;
  }

  @media (min-width: 768px) {
    .scroll-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr); /* ✅ 3 cards in a row */
      overflow: visible;
      gap: 24px;
      justify-content: center;
    }

    .service-card {
      flex: none;
      max-width: 100%;
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
    color: "#000", // Black heading
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: 600,
    marginBottom: "12px",
    color: "#ffffffff", // Red title
  },
  cardDesc: {
    fontSize: "14px",
    color: "#ffffff",
  },
};

export default OurServices;
