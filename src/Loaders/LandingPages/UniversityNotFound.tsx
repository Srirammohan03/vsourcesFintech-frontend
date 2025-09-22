import React from "react";
import { FaUniversity } from "react-icons/fa";

const UniversityNotFound: React.FC = () => {
  return (
    <div className="curved-before overflow-hidden relative w-full bg-gray-100">
      <div className="absolute bottom-0 left-0 right-0 flex flex-col-reverse md:flex-row w-full max-w-[1400px] mx-auto px-4 py-20 rounded-mds">
        {/* Left */}
        <div className="w-full md:basis-[40%] flex flex-col justify-center items-start bg-white p-8 shadow-lg rounded-lg">
          <FaUniversity className="text-6xl text-gray-300 mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-700 mb-4">
            University Not Found
          </h1>
          <p className="text-gray-500 text-lg">
            We couldn't find the university you are looking for. Please check
            the name or try searching again.
          </p>
        </div>
        {/* Right */}
        <div className="w-full md:basis-[60%] h-[250px] md:h-auto flex justify-center items-center">
          <div className="w-full h-full bg-gray-200 rounded-lg flex justify-center items-center">
            <span className="text-gray-400 text-lg md:text-xl">
              No Image Available
            </span>
          </div>
        </div>
      </div>
      <style>{`
        .curved-before{
          height: 80vh;
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
    </div>
  );
};

export default UniversityNotFound;
