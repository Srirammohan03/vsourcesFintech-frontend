import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function AboutSectionSkeleton() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4">
      {/* Top Section */}
      <div className="top-section">
        <div className="left">
          <h2 className="text-[#1e73be]">
            <Skeleton width={200} height={30} />
          </h2>
          <p className="desc pb-3 sm:pb-0">
            <Skeleton width={`80%`} height={20} />
          </p>
          <p className="para">
            <Skeleton count={1} width={`100%`} height={20} />
          </p>
          <p className="para pb-3">
            <Skeleton count={1} width={`90%`} height={20} />
          </p>
          <hr />
          <ul className="features space-y-2">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Skeleton circle width={24} height={24} />
                  <Skeleton width={`70%`} height={20} />
                </li>
              ))}
          </ul>
        </div>

        <div className="flex flex-col gap-5 sm:hidden ">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="stat-box flex items-center space-x-4">
                <Skeleton circle width={50} height={50} />
                <div>
                  <Skeleton width={80} height={20} />
                  <Skeleton
                    width={100}
                    height={16}
                    style={{ marginTop: "4px" }}
                  />
                </div>
              </div>
            ))}
        </div>

        <div className="right">
          <Skeleton width={200} height={200} circle={false} />
          <p className="quote mt-4">
            <Skeleton width={`60%`} height={20} />
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="stat-box flex items-center space-x-4">
              <Skeleton circle width={50} height={50} />
              <div>
                <Skeleton width={80} height={20} />
                <Skeleton
                  width={100}
                  height={16}
                  style={{ marginTop: "4px" }}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
