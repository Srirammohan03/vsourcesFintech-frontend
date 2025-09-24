import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CreditCardSkeleton: React.FC = () => {
  return (
    <div className="">
      {/* Hero Section */}
      <section className="relative text-white pt-32 pb-10 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0">
          <Skeleton height="100%" width="100%" />
        </div>
        <div className="relative w-full max-w-[1400px] mx-auto px-6 flex flex-col items-center md:items-start">
          <Skeleton circle width={40} height={40} className="mb-4" />
          <Skeleton width={300} height={40} className="mb-3" />
          <Skeleton width={500} height={20} className="mb-6" />
          <div className="flex flex-col gap-3 w-full max-w-2xl">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} width={250} height={30} />
            ))}
          </div>
        </div>
      </section>

      {/* Country Selector */}
      <section className="w-full max-w-[1400px] mx-auto px-6 py-10 flex flex-col items-center">
        <Skeleton width={200} height={24} className="mb-4" />
        <Skeleton width="50%" height={48} />
      </section>

      {/* Partner Section */}
      <section className="bg-gradient-to-br from-white via-red-100 to-white py-10 px-4">
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col order-2 md:order-1">
            <Skeleton width={400} height={35} className="mb-4" />
            <Skeleton count={3} height={18} className="mb-2" />
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <Skeleton width={200} height={200} />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <Skeleton width={300} height={30} className="mx-auto mb-4" />
            <Skeleton width={500} height={20} className="mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-6 rounded-2xl shadow-lg"
              >
                <Skeleton circle width={64} height={64} className="mb-4" />
                <Skeleton width={150} height={20} className="mb-2" />
                <Skeleton count={2} height={16} width={180} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Products */}
      <section className="w-full max-w-[900px] mx-auto px-4 sm:px-6 py-10 space-y-10">
        <Skeleton width={400} height={30} className="mx-auto mb-8" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="w-full max-w-4xl mx-auto min-h-[300px] rounded-2xl shadow-md p-6"
          >
            <Skeleton width={200} height={25} className="mb-3" />
            <Skeleton width={150} height={20} className="mb-2" />
            <Skeleton count={3} height={16} className="mb-2" />
            <Skeleton width={120} height={30} />
          </div>
        ))}
      </section>

      {/* Eligibility Note */}
      <div className="mb-10 text-center py-4 px-6 rounded-xl bg-indigo-100">
        <Skeleton width={500} height={20} className="mx-auto" />
      </div>

      {/* How To Apply */}
      <section className="w-full max-w-[1400px] mx-auto px-4 py-14">
        <Skeleton width={300} height={30} className="mx-auto mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center rounded-xl p-7 shadow-lg"
            >
              <Skeleton circle width={56} height={56} className="mb-4" />
              <Skeleton width={100} height={20} className="mb-2" />
              <Skeleton width={150} height={18} className="mb-2" />
              <Skeleton count={2} height={14} width={160} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Button */}
      <div className="flex flex-col items-center pb-16">
        <Skeleton width={200} height={50} className="mb-2" />
        <Skeleton width={180} height={15} />
      </div>
    </div>
  );
};

export default CreditCardSkeleton;
