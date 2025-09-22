import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UniversityHomePageSkeleton: React.FC = () => {
  return (
    <main>
      {/* Banner Skeleton */}
      <div className="relative bg-gray-200 pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 mb-6 container mx-auto max-w-6xl p-4">
          <div className="mx-auto max-w-3xl rounded-xl p-6 text-center shadow bg-gray-300">
            <Skeleton height={40} width={250} className="mx-auto mb-4" />
            <Skeleton height={20} count={2} width={`80%`} className="mx-auto" />
          </div>
        </div>
      </div>

      {/* Filters Skeleton */}
      <div className="w-full max-w-[1400px] mx-auto px-4 mt-8">
        {/* Country Dropdown Skeleton */}
        <div className="relative z-10 flex justify-center px-4 mb-6">
          <div className="w-full max-w-md rounded-xl p-8 flex flex-col space-y-3 shadow bg-gray-300">
            <Skeleton height={30} width={`60%`} className="mx-auto" />
            <Skeleton height={40} width={`100%`} />
          </div>
        </div>

        {/* Count + Search Skeleton */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between mb-6 gap-4 mx-auto px-4 mt-3">
          <Skeleton height={20} width={200} />
          <Skeleton height={40} width={250} />
        </div>

        {/* University List Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="bg-gray-300 rounded-xl shadow p-4">
              <Skeleton height={150} width={`100%`} className="mb-4" />
              <Skeleton height={20} width={`80%`} className="mb-2" />
              <Skeleton height={15} width={`60%`} />
            </div>
          ))}
        </div>

        <div className="h-8" />
      </div>
    </main>
  );
};

export default UniversityHomePageSkeleton;
