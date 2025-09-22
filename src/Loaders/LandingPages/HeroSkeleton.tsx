import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeroSkeleton = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16 md:pt-0">
      {/* Desktop Background */}
      <div className="absolute inset-0 hidden md:block z-0">
        <Skeleton height="100%" />
      </div>

      {/* Mobile Background */}
      <div className="block md:hidden absolute inset-0 z-0">
        <Skeleton height="100%" />
      </div>

      {/* Content Area */}
      <div className="w-full max-w-[1400px] mx-auto px-4 z-20 text-center lg:text-left">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Desktop Left Content */}
          <div className="hidden md:block space-y-6 pt-28">
            <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 shadow-md max-w-3xl space-y-4">
              <Skeleton height={52} width="70%" />
              <Skeleton height={24} width="50%" />
            </div>

            {/* Logo */}
            <div className="flex justify-start pt-6">
              <Skeleton height={60} width={150} />
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Skeleton height={40} width={150} />
              <Skeleton height={40} width={150} />
            </div>

            {/* Rating Info */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Skeleton circle={true} height={20} width={20} />
              <Skeleton height={20} width={50} />
              <Skeleton height={20} width={80} />
              <Skeleton height={20} width={80} />
            </div>
          </div>

          {/* Mobile Content */}
          <div className="md:hidden relative flex flex-col min-h-screen pt-[250px] px-4 z-10 font-[Poppins]">
            <div className="absolute top-[40px] left-[-10px] bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 max-w-[200px] text-left shadow-sm ">
              <Skeleton height={20} width="80%" />
              <Skeleton height={10} width="60%" style={{ marginTop: "10px" }} />
              <div className="bg-white rounded-xl px-2 py-1 mt-3 flex justify-center gap-1 w-fit mx-auto">
                <Skeleton circle={true} height={30} width={30} />
                <Skeleton circle={true} height={30} width={30} />
                <Skeleton circle={true} height={30} width={30} />
              </div>
              <Skeleton height={40} width="60%" style={{ marginTop: "20px" }} />
              <div className="w-full mt-4 mx-auto">
                <Skeleton height={60} width="40%" />
              </div>
            </div>

            <div className="mt-auto pb-6 w-full text-center">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-2xl max-w-[95%] mx-auto shadow-sm">
                <Skeleton height={20} width="70%" />
                <div className="mt-4">
                  <Skeleton height={40} width="60%" />
                </div>
                <div className="mt-[20px] inline-block">
                  <Skeleton height={40} width="50%" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <div className="absolute bottom-4 md:bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <Skeleton circle={true} height={40} width={40} />
      </div>
    </section>
  );
};

export default HeroSkeleton;
