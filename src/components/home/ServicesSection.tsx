import SectionTitle from "../SectionTitle";
import AnimateOnScroll from "../AnimateOnScroll";

const services = [
  {
    title: "ABROAD MASTERS",
    description:
      "Turn your masters dream into a global reality\nUS | UK | IRELAND | CANADA | FRANCE",
    imageSrc:
      "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762857619/ii78bltggggakhho0ysv.jpg",
    externalUrl: "https://vsourceoverseas.com/",
    logoSrc: "/assets/images/logo overseas.png",
  },
  {
    title: "MBBS IN ABROAD",
    description:
      "Affordable, Globally Recognized MBBS Abroad\nGeorgia | Russia",
    imageSrc:
      "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762857636/ahusyvnzcu1f3cvoxqc1.jpg",
    externalUrl: "https://vsourceadmissions.com/",
    logoSrc: "/assets/images/mini logo.png",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white text-black">
      <div className="w-full max-w-[1400px] mx-auto px-4">
        <SectionTitle
          title="Our Comprehensive Programs"
          subtitle="Comprehensive educational solutions to help you achieve your academic and career goals"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <AnimateOnScroll key={service.title} delay={index * 100}>
              <div
                onClick={() => window.open(service.externalUrl, "_blank")}
                className="relative rounded-xl shadow-lg bg-cover bg-center bg-no-repeat cursor-pointer transform transition-transform duration-300 hover:scale-102 min-h-[320px]"
                style={{ backgroundImage: `url(${service.imageSrc})` }}
              >
                <div className="absolute inset-0 bg-black/60 rounded-xl flex flex-col justify-between p-5">
                  <div>
                    <img
                      src={service.logoSrc}
                      alt="Logo"
                      className="w-20 h-20 sm:w-24 sm:h-24 mb-3"
                      onClick={(e) => e.stopPropagation()}
                      loading="lazy"
                    />
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white whitespace-pre-line leading-snug">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-3 flex gap-3 flex-wrap sm:flex-nowrap">
                    <a
                      href="/assets/media/Brochure 16 pages _CTC.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm bg-white text-black font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-md hover:bg-gray-200 transition text-center flex-1 sm:flex-none"
                      onClick={(e) => e.stopPropagation()}
                    >
                      VIEW PROGRAM
                    </a>
                    <a
                      href="tel:+919912611119"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm bg-red-600 text-white font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-md hover:bg-red-700 transition text-center flex-1 sm:flex-none"
                      onClick={(e) => e.stopPropagation()}
                    >
                      CALL NOW
                    </a>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
