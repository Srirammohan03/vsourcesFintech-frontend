import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeroSkeleton = () => {
  return (
    <section className="relative w-full text-white overflow-hidden min-h-screen">

      {/* Desktop BG Skeleton */}
      <div className="hidden sm:block absolute inset-0">
        <Skeleton height="100%" width="100%" />
      </div>

      {/* Mobile Layout (Full Height) */}
      <div className="relative z-10 sm:hidden w-full px-4 pt-32 pb-8 overflow-hidden min-h-screen flex flex-col">
        <div className="absolute inset-0">
          <Skeleton height="100%" width="100%" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between flex-grow">
          <div className="flex">
            <div className="w-[50%] bg-white/10 backdrop-blur-sm rounded-2xl p-2 flex flex-col space-y-4 mb-5">
              <Skeleton height={20} width="90%" />
              <Skeleton height={20} width="70%" />

              <div className="flex items-center space-x-2 mt-6">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} circle width={20} height={20} />
                ))}
              </div>

              <Skeleton height={18} width="80%" />
            </div>
          </div>

          {/* Search box */}
          <div className="w-full mt-4">
            <Skeleton height={55} borderRadius={12} />
          </div>
        </div>
      </div>

      {/* Desktop Layout (Full Height) */}
      <div className="hidden sm:flex flex-col justify-between relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 min-h-screen">

        <div className="text-center space-y-6 sm:space-y-8">
          <Skeleton height={45} width="60%" className="mx-auto" />
          <Skeleton height={22} width="70%" className="mx-auto" />
        </div>

        <div className="mt-10">
          <Skeleton height={70} borderRadius={16} />
        </div>
      </div>

    </section>
  );
};

export default HeroSkeleton;
