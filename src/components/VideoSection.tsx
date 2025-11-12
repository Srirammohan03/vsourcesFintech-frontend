import { useState } from "react";
import SectionTitle from "./SectionTitle";
import AnimateOnScroll from "./AnimateOnScroll";

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <section className="py-9 md:py-22 bg-gray-50">
      <div className="w-full max-w-[1400px] mx-auto px-4">
        <SectionTitle
          title="Company Video"
          subtitle="Get to know us better through our corporate presentation"
        />

        <AnimateOnScroll>
          <div className="mt-10 relative overflow-hidden rounded-xl shadow-2xl max-w-4xl mx-auto aspect-video">
            {isPlaying ? (
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/IbjoEr-lTuw?autoplay=1"
                title="Company Video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ) : (
              <div
                className="absolute inset-0 bg-darkblue/10 flex items-center justify-center group cursor-pointer"
                onClick={handlePlay}
              >
                <img
                  src="https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762838892/gkodku3uo3wt02e1era5.jpg"
                  alt="Company Video Thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center transition-transform group-hover:scale-110">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h3 className="text-white text-xl font-semibold">CHARAN TEJA</h3>
                  <p className="text-white/80">CEO, Vsource Company</p>
                </div> */}
              </div>
            )}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default VideoSection;
