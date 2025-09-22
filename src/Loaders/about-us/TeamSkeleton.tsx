import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import your styled wrapper

export default function TeamSkeleton({ count = 4 }: { count?: number }) {
  const placeholders = Array(count).fill(0);

  return (
    <div className="main">
      {placeholders.map((_, index) => {
        const delay = 50 + index * 100;
        return (
          <div
            className="profile-card"
            key={index}
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            data-aos-delay={delay}
          >
            <div className="img">
              <Skeleton
                circle
                width={100}
                height={100}
                enableAnimation={true}
              />
            </div>
            <div className="caption">
              <h3
                data-aos="fade-right"
                data-aos-anchor-placement="center-bottom"
                data-aos-delay={delay}
              >
                <Skeleton width={120} height={20} enableAnimation={true} />
              </h3>
              <p
                data-aos="fade-right"
                data-aos-anchor-placement="center-bottom"
                data-aos-delay={delay}
              >
                <Skeleton width={80} height={15} enableAnimation={true} />
              </p>
            </div>
            <div className="extra-info">
              <Skeleton width="100%" height={60} enableAnimation={true} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
