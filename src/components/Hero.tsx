import { lazy, memo } from "react";
import { motion } from "framer-motion";
const SearchHero = lazy(() => import("./SearchHero"));

const countryCodes = {
  fr: "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762702273/fr_cdemdi.svg",
  us: "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762702274/us_ruv7bj.svg",
  ie: "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762702273/ie_eixitt.svg",
  ca: "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762702273/ca_p8rr4y.svg",
  gb: "https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762702273/gb_ywaagd.svg",
};

function HeroSection() {
  return (
    <section className="relative w-full text-white overflow-hidden">
      {/* === Background image === */}
      <div
        className="hidden sm:block absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762858578/avlygh95olfci5q99tdc.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* === Mobile layout === */}
      <div className="relative z-10 sm:hidden w-full px-4 pt-32 pb-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-[position:center_35%]"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dch00stdh/image/upload/f_auto,q_auto/v1762858849/var4lvclf4g4ehmk50xj.jpg)",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 flex flex-col justify-between min-h-full">
          <div className="flex">
            <div className="w-[50%] bg-white/10 backdrop-blur-sm rounded-2xl p-2 flex flex-col justify-center space-y-4 mb-5">
              <h1 className="text-2xl font-bold leading-snug">
                Fund Your Dreams of
                <span className="block text-red-600 text-xl">
                  Studying Abroad
                </span>
              </h1>
              <div className="flex items-center space-x-2 mt-6">
                {Object.entries(countryCodes).map(([code, url]) => (
                  <img
                    key={code}
                    src={url}
                    alt={code.toUpperCase()}
                    className="w-5 h-5 object-cover rounded-full"
                  />
                ))}
              </div>

              <p className="text-white text-sm">
                Get instant access to education loans.
              </p>
            </div>
          </div>

          <div className="w-full mt-4">
            <SearchHero />
          </div>
        </div>
      </div>

      {/* === Desktop Layout === */}
      <div className="hidden sm:block relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 sm:space-y-8"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Fund Your Dreams of
            <span className="block text-red-600">Studying Abroad</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto">
            Get instant access to education loans, scholarships, and expert
            guidance to make your international education dreams a reality.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10"
        >
          <SearchHero />
        </motion.div>
      </div>
    </section>
  );
}

export default memo(HeroSection);
