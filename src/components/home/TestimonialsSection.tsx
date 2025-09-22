import SectionTitle from "../SectionTitle";
import AnimateOnScroll from "../AnimateOnScroll";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import SuccessStoriesSkeleton from "@/Loaders/LandingPages/SuccessStoriesSkeleton";
import { Testimonials } from "@/lib/types/LandingPage";


const fetchTestimonialsSection = async () => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_CMS_GLOBALURL
    }/api/landing-pages?populate[Sections][on][blocks.success-stories][populate][testimonials][populate][image][fields][0]=url&populate[Sections][on][blocks.success-stories][populate][testimonials][populate][image][fields][1]=alternativeText&populate[Sections][on][blocks.success-stories][populate][testimonials][populate][image][fields][2]=name`
  );
  return data.data[0].Sections[0];
};

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError, error } = useQuery<Testimonials>({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonialsSection,
  });

  const testimonials = data?.testimonials || [];
  const sectionTitle = data?.basic?.title || "Success Stories";
  const sectionDescription =
    data?.basic?.description ||
    "Hear from our students who have achieved their academic and career goals with our guidance.";
  const testimonialsCount = testimonials.length;

  useEffect(() => {
    if (testimonialsCount === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonialsCount - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonialsCount]);

  useEffect(() => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollTo({
      left: currentIndex * sliderRef.current.clientWidth,
      behavior: "smooth",
    });
  }, [currentIndex]);

  if (isError) {
    toast.error("Failed to load testimonials.");
    console.error("Failed to load testimonials:", error);
    return null;
  }

  if (isLoading || !data) {
    return <SuccessStoriesSkeleton />;
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsCount - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonialsCount - 1 ? 0 : prev + 1));
  };

  if (testimonialsCount === 0) {
    return null; // Don't render if there are no testimonials
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-12 md:py-16 bg-gray-50 relative overflow-hidden">
      <style>
        {`
          @keyframes moveBackground {
            0% { background-position: 0 0; }
            100% { background-position: -100% 0; }
          }
          .animated-bg {
            background-image: url('/assets/images/badges/bg test.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0.25;
          }
          @media (max-width: 640px) {
            .animated-bg {
              background-size: 200% 100%;
              background-repeat: repeat-x;
              animation: moveBackground 40s linear infinite;
            }
          }
        `}
      </style>

      {/* Background */}
      <div className="animated-bg z-0"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-red-600 drop-shadow-lg">
            {sectionTitle}
          </h2>
          <p className="text-base md:text-lg text-black-900 mt-20 mt-35">
            {sectionDescription}
          </p>
        </div>

        {/* Desktop */}
        <div className="hidden sm:block relative h-[400px] w-full">
          <div className="flex items-center justify-center h-full">
            <div className="bg-white bg-opacity-70 text-black p-5 rounded-xl max-w-4xl w-full mx-auto">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={currentTestimonial.image.url}
                    alt={currentTestimonial.name}
                    loading="lazy"
                    className="rounded-full w-36 h-36 object-cover shadow-lg"
                  />
                </div>
                <div className="flex-grow">
                  <p className="text-lg md:text-xl mb-4 italic leading-relaxed">
                    "{currentTestimonial.feedback}"
                  </p>
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {currentTestimonial.name}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white border border-black rounded-full p-3 shadow-md z-20 hover:bg-gray-100 transition-colors"
          >
            ◀
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white border border-black rounded-full p-3 shadow-md z-20 hover:bg-gray-100 transition-colors"
          >
            ▶
          </button>
        </div>

        {/* Mobile */}
        <div className="sm:hidden relative py-4">
          <div
            ref={sliderRef}
            className="flex overflow-x-hidden scroll-smooth snap-x snap-mandatory px-4"
          >
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="snap-center flex-shrink-0 w-full max-w-xs mx-auto bg-white bg-opacity-70 text-black p-6 rounded-xl shadow-lg text-center transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="mb-4">
                  <img
                    src={testimonial.image.url}
                    alt={testimonial.name}
                    loading="lazy"
                    className="rounded-full w-24 h-24 object-cover mx-auto shadow-md"
                  />
                </div>
                <p className="text-md italic mb-3">"{testimonial.feedback}"</p>
                <h3 className="text-lg font-semibold">{testimonial.name}</h3>
              </div>
            ))}
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white border border-black rounded-full p-2 shadow-md z-10"
          >
            ◀
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white border border-black rounded-full p-2 shadow-md z-10"
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
}
