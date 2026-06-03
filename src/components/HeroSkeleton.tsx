import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const HeroSkeleton: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#d1d5db" highlightColor="#e5e7eb">
      <div className="flex flex-col min-h-screen bg-[#f9fafb] animate-fade-in">
        {/* ===== Navbar Skeleton ===== */}
        <header className="w-full shadow-sm bg-white p-4 flex justify-between items-center">
          <Skeleton height={32} width={150} borderRadius={8} />
          <div className="hidden md:flex space-x-6">
            <Skeleton height={20} width={80} />
            <Skeleton height={20} width={80} />
            <Skeleton height={20} width={100} />
            <Skeleton height={20} width={80} />
          </div>
        </header>

        {/* ===== Hero Section ===== */}
        <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-14 gap-10">
          {/* Left Text */}
          <div className="flex-1 space-y-4">
            <Skeleton height={44} width="80%" />
            <Skeleton height={32} width="60%" />
            <Skeleton height={20} count={3} width="90%" />
            <div className="flex space-x-4 mt-4">
              <Skeleton height={48} width={150} borderRadius={8} />
              <Skeleton height={48} width={150} borderRadius={8} />
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="flex-1 flex justify-center">
            <Skeleton height={320} width="80%" borderRadius={16} />
          </div>
        </section>

        {/* ===== Section Cards ===== */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16 py-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="shadow-md rounded-2xl p-5 bg-white flex flex-col space-y-4 border border-gray-200"
            >
              <Skeleton height={160} borderRadius={12} />
              <Skeleton height={24} width="80%" />
              <Skeleton height={18} width="60%" />
            </div>
          ))}
        </section>

        {/* ===== Footer ===== */}
        <footer className="mt-auto bg-white py-8 px-6 md:px-16 border-t border-gray-200 flex justify-between items-center">
          <Skeleton height={20} width={150} />
          <Skeleton height={20} width={200} />
        </footer>
      </div>
    </SkeletonTheme>
  );
};

export default HeroSkeleton;
