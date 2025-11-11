// ServicesSection.tsx
import React from "react";
import SectionTitle from "../SectionTitle";
import AnimateOnScroll from "../AnimateOnScroll";
import { ComprehensiveBlock } from "@/lib/types/LandingPage";

type Prop = {
  compre?: ComprehensiveBlock | null;
  isLoading?: boolean;
};

// fallback (your original hard-coded data)
const fallbackServices = [
  {
    title: "ABROAD MASTERS",
    description:
      "Turn your masters dream\n into a global reality\nUS | UK | IRELAND | CANADA | FRANCE",
    imageSrc:
      "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762857619/ii78bltggggakhho0ysv.jpg",
    externalUrl: "https://vsourceoverseas.com/",
    logoSrc: "/assets/images/logo overseas.png",
  },
  {
    title: "MBBS IN ABROAD",
    description:
      "Affordable, Globally Recognized\n MBBS Abroad\nGeorgia | Russia",
    imageSrc:
      "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762857636/ahusyvnzcu1f3cvoxqc1.jpg",
    externalUrl: "https://vsourceadmissions.com/",
    logoSrc: "/assets/images/mini logo.png",
  },
];
function getMediaUrl(media: any): string | undefined {
  if (!media) return undefined;
  if (media?.data?.attributes?.url) return media.data.attributes.url;
  if (media?.url) return media.url;
  if (media?.attributes?.url) return media.attributes.url;
  if (typeof media === "string") return media;
  return undefined;
}

const ServicesSection: React.FC<Prop> = ({ compre, isLoading = false }) => {
  // Build services from CMS cards (if present) or fallback
  const cmsCards = compre?.cards?.length ? compre.cards : null;

  const services = cmsCards
    ? cmsCards.map((c) => ({
        title: c.title ?? "Untitled",
        description: c.description ?? "",
        imageSrc: getMediaUrl(c.image) ?? "/assets/images/placeholder.png",
        externalUrl: c.external_url ?? c.external_url ?? "#",
        logoSrc: getMediaUrl(c.logo) ?? "/assets/images/mini logo.png",
        id: c.id,
      }))
    : fallbackServices.map((s, i) => ({ ...s, id: `fallback-${i}` }));

  const skeletonCount = Math.max(2, services.length);

  const openLink = (url: string) => {
    if (!url || url === "#") return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-10 md:py-10 bg-white text-black">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Comprehensive Services"
          subtitle="Comprehensive educational solutions to help you achieve your academic and career goals"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading
            ? Array.from({ length: skeletonCount }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="animate-pulse rounded-xl bg-gray-100 h-64 md:h-56"
                />
              ))
            : services.map((service: any, index: number) => (
                <AnimateOnScroll
                  key={service.id ?? service.title}
                  delay={index * 100}
                >
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => openLink(service.externalUrl)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openLink(service.externalUrl);
                      }
                    }}
                    className="relative overflow-hidden rounded-xl shadow-lg bg-white cursor-pointer transform transition-transform duration-300 hover:scale-105"
                    aria-label={`Open ${service.title}`}
                  >
                    <div className="aspect-[16/13] md:aspect-[16/9] overflow-hidden">
                      <img
                        src={service.imageSrc}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src =
                            "https://via.placeholder.com/600x400?text=Image+Not+Found";
                        }}
                      />
                    </div>

                    <div className="absolute inset-0 bg-black/60 flex flex-col justify-between p-5">
                      <div className="">
                        <img
                          src={service.logoSrc}
                          alt={`${service.title} logo`}
                          className="w-32 h-24 sm:w-36 sm:h-28 object-contain "
                          onError={(e) => {
                            const t = e.target as HTMLImageElement;
                            t.onerror = null;
                            t.src = "/assets/images/mini logo.png";
                          }}
                        />
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                          {service.title}
                        </h3>
                        <p className="text-sm sm:text-base text-white whitespace-pre-line leading-snug">
                          {service.description}
                        </p>
                      </div>

                      <div className="mt-3 flex gap-3 flex-wrap sm:flex-nowrap">
                        <a
                          href={"/assets/media/Brochure 16 pages _CTC.pdf"}
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
