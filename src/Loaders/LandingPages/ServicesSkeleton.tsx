import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ServicesSkeleton() {
  return (
    <section className="py-12">
      {/* Title */}
      <div className="text-center mb-8">
        <Skeleton
          width={200}
          height={40}
          baseColor="#e5e7eb"
          highlightColor="#f3f4f6"
          className="mx-auto"
        />
      </div>

      {/* Cards Container */}
      <div className="scroll-container">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="service-card relative">
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gray-300 rounded-[16px]" />
            <div className="relative z-10 flex flex-col items-center text-center w-full">
              <div className="icon-wrapper mb-4">
                <Skeleton
                  circle
                  width={60}
                  height={60}
                  baseColor="#d1d5db"
                  highlightColor="#e5e7eb"
                />
              </div>
              <Skeleton
                width={120}
                height={20}
                baseColor="#d1d5db"
                highlightColor="#e5e7eb"
                className="mb-2"
              />
              <Skeleton
                width={`80%`}
                height={16}
                baseColor="#d1d5db"
                highlightColor="#e5e7eb"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Inline CSS to keep same layout */}
      <style>{`
        .scroll-container {
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          gap: 16px;
          scroll-snap-type: x mandatory;
          padding-bottom: 10px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }

        .scroll-container::-webkit-scrollbar {
          display: none;
        }

        .service-card {
          position: relative;
          flex: 0 0 90%;
          max-width: 90%;
          scroll-snap-align: start;
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: start;
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          height: 60px;
        }

        @media (min-width: 768px) {
          .scroll-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            overflow: visible;
            gap: 24px;
          }

          .service-card {
            flex: none;
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
