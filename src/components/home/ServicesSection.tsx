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
    <section className="py-16 md:py-24 bg-white text-black relative">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <SectionTitle
          title="Comprehensive Services"
          subtitle="Comprehensive educational solutions to help you achieve your academic and career goals"
        />

        {/* Services grid */}
        <div className="mt-14 flex md:flex-row flex-col gap-8 lg:gap-12">
          {services.map((service, index) => (
            <AnimateOnScroll key={service.title} delay={index * 100}>
              <div
                onClick={() => window.open(service.externalUrl, "_blank")}
                className="relative rounded-2xl overflow-hidden shadow-md bg-gray-50 cursor-pointer transform transition-all duration-500  hover:shadow-2xl group"
              >
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={service.imageSrc}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src =
                        "https://via.placeholder.com/600x400?text=Image+Not+Found";
                    }}
                  />
                </div>

                {/* Overlay content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-transparent flex flex-col justify-between p-6 sm:p-8">
                  <div>
                    <img
                      src={service.logoSrc}
                      alt="Logo"
                      className="w-20 h-20 sm:w-24 sm:h-24 mb-4 drop-shadow-lg"
                    />
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-100 whitespace-pre-line leading-relaxed tracking-wide">
                      {service.description}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="mt-6 flex flex-wrap gap-3 sm:gap-4">
                    <a
                      href={"/assets/media/Brochure 16 pages _CTC.pdf"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm bg-white text-black font-bold p-2  rounded-md hover:bg-gray-200 transition text-center flex-1 sm:flex-none"
                      onClick={(e) => e.stopPropagation()}
                    >
                      VIEW PROGRAM
                    </a>

                    <a
                      href="tel:+919912611119"
                      className="flex-1 sm:flex-none text-xs sm:text-sm md:text-base bg-red-600 text-white font-semibold p-2  rounded-md hover:bg-red-700 transition-all text-center shadow-md"
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
