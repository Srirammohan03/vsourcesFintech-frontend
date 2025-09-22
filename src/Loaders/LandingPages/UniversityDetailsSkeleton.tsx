import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UniversityDetailsSkeleton: React.FC = () => {
  return (
    <main className="w-full bg-gray-50">
      {/* Hero Section */}
      <div className="curved-before overflow-hidden relative w-full">
        <div className="absolute bottom-0 left-0 right-0 flex flex-col-reverse md:flex-row w-full max-w-[1400px] mx-auto px-4 rounded-mds">
          {/* Left */}
          <div className="w-full md:basis-[40%] flex flex-col bg-white p-4 shadow">
            <Skeleton height={100} width={150} className="mb-4" />
            <Skeleton count={2} height={20} className="mb-2" />
            <Skeleton height={40} width="100%" className="mt-2" />
          </div>
          {/* Right */}
          <div className="w-full md:basis-[60%] h-[200px] md:h-auto overflow-hidden">
            <Skeleton height="100%" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-28 z-40 bg-white shadow-md border-b">
        <div className="mx-auto max-w-7xl flex overflow-x-auto sm:overflow-hidden p-2">
          {Array.from({ length: 10 }).map((_, idx) => (
            <Skeleton key={idx} width={100} height={40} className="mr-2" />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Overview */}
          <div className="space-y-4">
            <Skeleton height={30} width={200} />
            <Skeleton count={3} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="p-4 bg-gray-200 rounded-lg">
                  <Skeleton height={20} width={50} className="mb-2" />
                  <Skeleton height={15} width={80} />
                </div>
              ))}
            </div>
          </div>

          {/* Rankings */}
          <div className="space-y-4">
            <Skeleton height={30} width={150} />
            <Skeleton count={2} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="p-6 bg-gray-200 rounded-xl">
                  <Skeleton height={80} width={80} className="mb-3" />
                  <Skeleton height={20} width={120} className="mb-2" />
                  <Skeleton height={15} width="80%" />
                </div>
              ))}
            </div>
          </div>

          {/* Intakes Accordion */}
          <div className="space-y-4">
            <Skeleton height={30} width={150} />
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="p-4 bg-gray-200 rounded-md">
                <Skeleton height={25} width="100%" className="mb-2" />
                <Skeleton height={15} count={2} />
              </div>
            ))}
          </div>

          {/* Courses Carousel */}
          <div className="space-y-4">
            <Skeleton height={30} width={200} />
            <div className="flex gap-4 mt-2 overflow-x-auto">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="min-w-[250px] p-4 bg-gray-200 rounded-lg"
                >
                  <Skeleton height={20} width="80%" className="mb-2" />
                  <Skeleton height={15} width="60%" className="mb-2" />
                  <Skeleton height={30} width="100%" />
                </div>
              ))}
            </div>
          </div>

          {/* Cost to Study */}
          <div className="space-y-4">
            <Skeleton height={30} width={250} />
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} height={20} />
            ))}
            <div className="overflow-x-auto">
              <table className="min-w-full mt-4">
                <tbody>
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <tr key={idx} className="bg-gray-200 mb-2">
                      <td className="px-6 py-4">
                        <Skeleton height={20} width={120} />
                      </td>
                      <td className="px-6 py-4">
                        <Skeleton height={20} width={80} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Scholarships */}
          <div className="space-y-4">
            <Skeleton height={30} width={200} />
            <div className="flex gap-4 overflow-x-auto mt-2">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="min-w-[250px] p-4 bg-gray-200 rounded-xl"
                >
                  <Skeleton height={20} width="80%" className="mb-2" />
                  <Skeleton height={15} width="60%" className="mb-1" />
                  <Skeleton height={15} width="70%" />
                  <Skeleton height={30} width="100%" className="mt-3" />
                </div>
              ))}
            </div>
          </div>

          {/* Admissions */}
          <div className="space-y-4">
            <Skeleton height={30} width={200} />
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="p-4 bg-gray-200 rounded-xl">
                <Skeleton height={25} width="60%" className="mb-2" />
                <Skeleton height={15} count={2} />
              </div>
            ))}
          </div>

          {/* Placements */}
          <div className="space-y-4">
            <Skeleton height={30} width={200} />
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="p-4 bg-gray-200 rounded-lg">
                <Skeleton height={20} width="50%" className="mb-2" />
                <Skeleton height={15} count={2} />
              </div>
            ))}
          </div>

          {/* Gallery */}
          <div className="space-y-4">
            <Skeleton height={30} width={150} />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
              {Array.from({ length: 6 }).map((_, idx) => (
                <Skeleton key={idx} height={100} />
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            <Skeleton height={30} width={150} />
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="p-4 bg-gray-200 rounded-lg">
                <Skeleton height={20} width="80%" className="mb-2" />
                <Skeleton height={15} count={2} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-[22%] bg-white shadow-md rounded-lg p-4 space-y-4">
            <Skeleton height={40} width="100%" />
            <Skeleton height={15} width="80%" />
            <Skeleton height={50} width="100%" />
            <Skeleton height={50} width="100%" />
          </div>
        </div>
      </div>
      <style>{`
        .curved-before{
          height:80vh;
        }
        .curved-before::before {
          border-radius: 0 0 50% 50% / 0 0 100% 100%;
          transform: scaleX(2.1);
        }
        @media(max-width:768px){
          .curved-before{
            height:100vh;
          }
        }
      `}</style>
    </main>
  );
};

export default UniversityDetailsSkeleton;
