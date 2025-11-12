import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeroSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="rgba(229,231,235,0.9)"
      highlightColor="rgba(243,244,246,0.9)"
    >
      <section className="relative w-full min-h-screen bg-white overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Skeleton height="100%" width="100%" />
        </div>

        {/* Overlay to match hero opacity */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

        {/* Navbar Skeleton */}
        <div className="relative z-10 flex justify-between items-center px-6 sm:px-12 py-6">
          {/* Logo */}
          <Skeleton height={50} width={150} borderRadius={8} />

          {/* Nav Items */}
          <div className="hidden md:flex items-center gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} height={18} width={80} borderRadius={8} />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center justify-center px-6 sm:px-12 min-h-[75vh] space-y-6">
          {/* Heading */}
          <div className="space-y-4 max-w-3xl w-full">
            <Skeleton height={60} width="75%" className="mx-auto rounded-md" />
            <Skeleton height={35} width="55%" className="mx-auto rounded-md" />
          </div>

          {/* Subtext */}
          <div className="space-y-3 max-w-2xl w-full mt-6">
            <Skeleton height={18} width="90%" className="mx-auto rounded-md" />
            <Skeleton height={18} width="85%" className="mx-auto rounded-md" />
            <Skeleton height={18} width="70%" className="mx-auto rounded-md" />
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-5 mt-8">
            <Skeleton height={50} width={180} borderRadius={10} />
            <Skeleton height={50} width={150} borderRadius={10} />
          </div>
        </div>
      </section>
    </SkeletonTheme>
  );
};

export default HeroSkeleton;
