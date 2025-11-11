import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DelayedPopup from "./DelayedPopup";

export default function SearchHero() {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-6 mb-6">
        <Link
          to="/education-loan"
          className={`w-[80%] md:w-auto text-lg px-6 py-2 rounded-md text-center transition ${
            location.pathname === "/education-loan"
              ? "border border-red-600 text-red-600"
              : "text-red-600 bg-white border border-white hover:bg-red-600 hover:text-white hover:border-red-600"
          }`}
        >
          Get an Education Loan
        </Link>

        <button
          className="w-[80%] md:w-auto  text-lg px-6 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition"
          onClick={() => setShowPopup(true)}
        >
          Apply Now
        </button>
      </div>

      {showPopup && <DelayedPopup onMinimize={handlePopupClose} />}
    </div>
  );
}
