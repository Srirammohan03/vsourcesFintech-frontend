import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ComprehensiveSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <section className="py-16 md:py-24 bg-white text-black">
      <div className="w-full max-w-[1400px] mx-auto px-4">
        {/* Title Skeleton */}
        <Skeleton
          width={300}
          height={40}
          className="mx-auto mb-3"
          baseColor="#e0e0e0"
          highlightColor="#f5f5f5"
        />

        {/* Description Skeleton */}
        <Skeleton
          width={600}
          height={20}
          className="mx-auto mb-12"
          baseColor="#e0e0e0"
          highlightColor="#f5f5f5"
        />

        {/* Cards Skeleton */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className="relative rounded-xl shadow-lg min-h-[320px] overflow-hidden"
            >
              <Skeleton
                height={320}
                className="rounded-xl"
                baseColor="#e0e0e0"
                highlightColor="#f5f5f5"
              />

              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <div>
                  <Skeleton
                    circle
                    width={80}
                    height={80}
                    className="mb-3"
                    baseColor="#c0c0c0"
                    highlightColor="#e0e0e0"
                  />
                  <Skeleton
                    width={`80%`}
                    height={25}
                    className="mb-2"
                    baseColor="#c0c0c0"
                    highlightColor="#e0e0e0"
                  />
                  <Skeleton
                    width={`90%`}
                    height={16}
                    count={3}
                    baseColor="#c0c0c0"
                    highlightColor="#e0e0e0"
                  />
                </div>

                <div className="mt-3 flex gap-3 flex-wrap sm:flex-nowrap">
                  <Skeleton
                    width={100}
                    height={35}
                    baseColor="#c0c0c0"
                    highlightColor="#e0e0e0"
                  />
                  <Skeleton
                    width={100}
                    height={35}
                    baseColor="#c0c0c0"
                    highlightColor="#e0e0e0"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComprehensiveSkeleton;
