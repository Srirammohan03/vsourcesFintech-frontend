import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SuccessStoriesSkeleton() {
  return (
    <section className="py-12 md:py-16 bg-gray-50 relative overflow-hidden">
      {/* Background simulation */}
      <div className="absolute inset-0 bg-gray-200 opacity-30" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <Skeleton
            width={220}
            height={40}
            baseColor="#e5e7eb"
            highlightColor="#f3f4f6"
            className="mx-auto"
          />
          <Skeleton
            width={`70%`}
            height={20}
            baseColor="#e5e7eb"
            highlightColor="#f3f4f6"
            className="mx-auto mt-6"
          />
        </div>

        {/* Desktop */}
        <div className="hidden sm:block relative h-[400px] w-full">
          <div className="flex items-center justify-center h-full">
            <div className="bg-white bg-opacity-70 text-black p-5 rounded-xl max-w-4xl w-full mx-auto">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <Skeleton
                    circle
                    width={144}
                    height={144}
                    baseColor="#d1d5db"
                    highlightColor="#e5e7eb"
                  />
                </div>
                <div className="flex-grow space-y-4">
                  <Skeleton
                    width={`100%`}
                    height={24}
                    baseColor="#d1d5db"
                    highlightColor="#e5e7eb"
                  />
                  <Skeleton
                    width={`80%`}
                    height={20}
                    baseColor="#d1d5db"
                    highlightColor="#e5e7eb"
                  />
                  <Skeleton
                    width={150}
                    height={24}
                    baseColor="#d1d5db"
                    highlightColor="#e5e7eb"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Arrows */}
          <div className="absolute inset-0 flex justify-between items-center px-4">
            <Skeleton
              width={40}
              height={40}
              circle
              baseColor="#d1d5db"
              highlightColor="#e5e7eb"
            />
            <Skeleton
              width={40}
              height={40}
              circle
              baseColor="#d1d5db"
              highlightColor="#e5e7eb"
            />
          </div>
        </div>

        {/* Mobile */}
        <div className="sm:hidden relative py-4">
          <div className="flex overflow-x-hidden scroll-smooth snap-x snap-mandatory px-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="snap-center flex-shrink-0 w-full max-w-xs mx-auto bg-white bg-opacity-70 text-black p-6 rounded-xl shadow-lg text-center"
              >
                <div className="mb-4">
                  <Skeleton
                    circle
                    width={96}
                    height={96}
                    baseColor="#d1d5db"
                    highlightColor="#e5e7eb"
                    className="mx-auto"
                  />
                </div>
                <Skeleton
                  width={`100%`}
                  height={20}
                  baseColor="#d1d5db"
                  highlightColor="#e5e7eb"
                  className="mx-auto mb-3"
                />
                <Skeleton
                  width={100}
                  height={20}
                  baseColor="#d1d5db"
                  highlightColor="#e5e7eb"
                  className="mx-auto"
                />
              </div>
            ))}
          </div>

          {/* Arrows */}
          <div className="absolute inset-0 flex justify-between items-center px-2">
            <Skeleton
              width={32}
              height={32}
              circle
              baseColor="#d1d5db"
              highlightColor="#e5e7eb"
            />
            <Skeleton
              width={32}
              height={32}
              circle
              baseColor="#d1d5db"
              highlightColor="#e5e7eb"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
