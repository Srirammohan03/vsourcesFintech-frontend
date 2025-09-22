// CoursesSectionSkeleton.tsx

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CoursesSectionSkeleton() {
  const placeholderCards = Array(3).fill(0);

  return (
    <section className="py-8 bg-white">
      <div className="mx-auto sm:px-10 px-5">
        <div className="space-y-4">
          <Skeleton width={300} height={30} enableAnimation={true} />
          <Skeleton width={500} height={20} enableAnimation={true} />
        </div>

        <div className="mt-6 overflow-hidden">
          <div className="flex gap-4">
            {placeholderCards.map((_, i) => (
              <div
                key={i}
                className="shrink-0 px-3 box-border h-[400px] py-6 w-[300px]"
              >
                <div className="relative rounded-[15px] overflow-hidden shadow-[0_10px_24px_rgba(16,24,40,0.10)] border border-gray-200 bg-white h-full">
                  <Skeleton className="aspect-square" enableAnimation={true} />
                  <div className="p-4 space-y-3">
                    <Skeleton width={80} height={15} enableAnimation={true} />
                    <Skeleton width={150} height={25} enableAnimation={true} />
                    <Skeleton width={120} height={20} enableAnimation={true} />
                    <div className="space-y-1">
                      <Skeleton
                        width={250}
                        height={15}
                        enableAnimation={true}
                      />
                      <Skeleton
                        width={200}
                        height={15}
                        enableAnimation={true}
                      />
                      <Skeleton
                        width={180}
                        height={15}
                        enableAnimation={true}
                      />
                    </div>
                    <Skeleton width="100%" height={40} enableAnimation={true} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
