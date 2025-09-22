import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function HeroBannerSkeleton() {
  return (
    <section className="pt-40 pb-36 relative bg-gray-800">
      {/* Dark overlay simulation */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-700/60 to-gray-900/90" />

      {/* Content */}
      <div className="relative w-full max-w-[1400px] mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Title Skeleton */}
          <Skeleton
            width={300}
            height={60}
            baseColor="#374151"
            highlightColor="#6B7280"
            borderRadius={8}
          />

          {/* Description Skeleton */}
          <div className="space-y-3">
            <Skeleton
              width="100%"
              height={24}
              baseColor="#374151"
              highlightColor="#6B7280"
              borderRadius={6}
            />
            <Skeleton
              width="90%"
              height={24}
              baseColor="#374151"
              highlightColor="#6B7280"
              borderRadius={6}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function OverviewHighlightsSkeleton() {
  return (
    <section className="container mx-auto px-4 md:px-6 py-10 md:py-14 rounded-2xl bg-gray-100">
      {/* Heading */}
      <div className="text-center space-y-2">
        <Skeleton width={240} height={36} borderRadius={6} />
        <Skeleton width={120} height={24} borderRadius={6} />
      </div>

      {/* Grid highlights */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-xl p-5 shadow-sm"
            style={{ backgroundColor: "#e5ebf0" }}
          >
            <Skeleton width="60%" height={20} />
            <Skeleton width="100%" height={24} className="mt-2" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function WhyStudyUSASkeleton() {
  return (
    <section className="container mx-auto px-4 md:px-6 py-10 md:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left column */}
        <div className="space-y-4">
          <Skeleton width={300} height={36} />
          <Skeleton width="100%" height={24} count={3} />
          <div className="mt-6 h-1 w-20 bg-red-600 rounded-full" />
          <Skeleton width="80%" height={20} count={4} className="mt-4" />
          <Skeleton width={220} height={40} className="mt-6 rounded-md" />
        </div>

        {/* Right column: feature cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="rounded-xl p-5 shadow-sm bg-white">
              <Skeleton width="80%" height={20} />
              <Skeleton width="100%" height={48} className="mt-2" />
              <div className="mt-4 h-1 w-12 bg-red-600 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CityCostsTabsSkeleton() {
  return (
    <section className="container mx-auto px-4 md:px-6 py-10 md:py-14">
      {/* Heading */}
      <div className="text-center mb-6">
        <Skeleton width={240} height={36} />
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-3 md:gap-6 mb-8">
        {Array.from({ length: 3 }).map((_, idx) => (
          <Skeleton key={idx} width={100} height={24} borderRadius={6} />
        ))}
      </div>

      {/* Active city content */}
      <div className="max-w-3xl mx-auto space-y-4">
        <Skeleton width={180} height={28} className="mx-auto" />
        <Skeleton width="100%" height={20} count={2} />
        <Skeleton width="100%" height={200} className="rounded-xl mt-4" />

        {/* Tables */}
        {Array.from({ length: 2 }).map((_, idx) => (
          <div key={idx} className="mt-8">
            <Skeleton width={150} height={24} className="mx-auto" />
            <Skeleton
              width="100%"
              height={32}
              count={4}
              className="mt-2 rounded-md"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function BannerSkeleton() {
  return (
    <div className="space-y-16">
      <HeroBannerSkeleton />
      <OverviewHighlightsSkeleton />
      <WhyStudyUSASkeleton />
      <CityCostsTabsSkeleton />
    </div>
  );
}
