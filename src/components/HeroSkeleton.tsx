import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeroSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="#d1d5db" // Tailwind gray-300 — distinct visible grey
      highlightColor="#f9fafb" // Tailwind gray-50 — soft white shimmer
    >
      <section className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col">
        {/* White Background */}
        <div className="absolute inset-0 bg-white" />
        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center text-center justify-center flex-grow px-6 sm:px-12 space-y-8 mt-10">
          {/* Heading */}
          <div className="space-y-5 max-w-3xl w-full">
            <Skeleton height={50} width="75%" className="mx-auto rounded-md" />
            <Skeleton height={30} width="55%" className="mx-auto rounded-md" />
          </div>

          {/* Subtext */}
          <div className="space-y-3 max-w-2xl w-full mt-6">
            <Skeleton height={16} width="90%" className="mx-auto rounded-md" />
            <Skeleton height={16} width="80%" className="mx-auto rounded-md" />
            <Skeleton height={16} width="70%" className="mx-auto rounded-md" />
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-6 mt-10">
            <Skeleton height={48} width={160} borderRadius={8} />
            <Skeleton height={48} width={140} borderRadius={8} />
          </div>
        </div>

        {/* Footer-like bottom row (optional visual balance) */}
        <div className="flex justify-center items-center gap-6 py-8">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} height={40} width={100} borderRadius={6} />
          ))}
        </div>
      </section>
    </SkeletonTheme>
  );
};

export default HeroSkeleton;
