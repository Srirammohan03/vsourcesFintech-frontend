import React, { memo, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useAnimation } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";

interface DelayedPopupProps {
  onMinimize: () => void;
}

const DelayedPopup: React.FC<DelayedPopupProps> = ({ onMinimize }) => {
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [backdropVisible, setBackdropVisible] = useState(true);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();

  const options = ["Masters in abroad", "Education Loan Guidance"];

  // Animate popup entrance
  useEffect(() => {
    controls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    });
  }, [controls]);

  // Shared close handler
  const animateAndClose = async () => {
    await controls.start({
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    });
    setBackdropVisible(false);

    // Delay so animation finishes
    setTimeout(onMinimize, 150);
  };

  const animateToIconAndClose = async () => {
    const card = cardRef.current;
    const anchor = document.getElementById("form-icon-anchor");

    if (!card || !anchor) {
      // Fallback: just fade out if anchor missing
      await controls.start({
        opacity: 0,
        scale: 0.8,
        transition: { duration: 0.25 },
      });
      setBackdropVisible(false);
      onMinimize();
      return;
    }

    const cardRect = card.getBoundingClientRect();
    const anchorRect = anchor.getBoundingClientRect();

    // Centers
    const cardCx = cardRect.left + cardRect.width / 2;
    const cardCy = cardRect.top + cardRect.height / 2;
    const anchorCx = anchorRect.left + anchorRect.width / 2;
    const anchorCy = anchorRect.top + anchorRect.height / 2;

    const dx = anchorCx - cardCx;
    const dy = anchorCy - cardCy;

    // Animate the card shrinking & moving into the icon position
    await controls.start({
      x: dx,
      y: dy,
      scale: 0.1,
      opacity: 0.9,
      borderRadius: "999px",
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    });

    // Fade out backdrop after the card lands in the icon spot
    setBackdropVisible(false);

    // Tiny delay to ensure smoothness
    setTimeout(onMinimize, 50);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (phoneNumber.length < 10 || name.trim().length === 0) {
      alert("Please enter your name and a valid phone number.");
      return;
    }
    if (!/^\d{10}$/.test(phoneNumber)) {
      alert("Enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);
    const payload = {
      data: {
        studentName: name,
        number: phoneNumber,
        service_required: selectedOption,
      },
    };
    // https://script.google.com/macros/s/AKfycbweggreBuHA2oxa8Fd7-yLmoB3-2_PhwgE-shKjNJHRIy2e6qShL46UcJ6hVlhQ94Oy/exec
    try {
      const { status } = await axios.post(
        `https://backend.vsourceoverseas.com/api/fintech-enquires`,
        payload,
      );
      await fetch(
        "https://script.google.com/macros/s/AKfycbweggreBuHA2oxa8Fd7-yLmoB3-2_PhwgE-shKjNJHRIy2e6qShL46UcJ6hVlhQ94Oy/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentName: name,
            number: phoneNumber,
            service_required: selectedOption,
          }),
        },
      );
      if (status === 200 || status === 201) {
        toast.success("Submitted successfully!");
        animateToIconAndClose();
        setName("");
        setPhoneNumber("");
        setSelectedOption("");
      }
    } catch (error) {
      console.error("failed to submit data", error);
      toast.error("failed to submit data");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  return typeof window !== "undefined"
    ? createPortal(
        <div className="fixed inset-0 z-[9999]">
          {/* Backdrop (click outside closes) */}
          {backdropVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={animateAndClose}
              className="absolute inset-0 bg-black"
              transition={{ duration: 0.25 }}
            />
          )}

          {/* Popup card */}
          <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              ref={cardRef}
              className="relative w-full max-w-md pointer-events-auto"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={controls}
            >
              <div className="relative w-full rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-white rounded-2xl max-h-[90vh] max-w-[90vw]  text-gray-800 p-4 ">
                  {/* Header */}
                  <div className="bg-red-500 text-white text-center rounded-t-2xl -mx-4 -mt-4 p-4 md:p-6 md:-mx-6 md:-mt-6 relative space-y-1">
                    <h2 className="text-xl md:text-2xl font-bold tracking-wide">
                      STUDY IN ABROAD
                    </h2>

                    <p className="text-sm md:text-base font-medium">
                      TOP UNIVERSITIES • LOW PACKAGES
                    </p>

                    <p className="text-lg md:text-xl font-medium">
                      APPLY NOW FOR SEP 2026 INTAKE
                    </p>

                    {/* Close button */}
                    <button
                      onClick={animateToIconAndClose}
                      className="absolute top-4 right-4 text-white hover:text-gray-100 transition hover:rotate-180 transition duration-300 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                      aria-label="Close"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    {/* Name */}
                    <input
                      type="text"
                      placeholder="Student Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-red-500 focus:outline-none text-sm md:text-base"
                      required
                    />

                    {/* Phone input */}
                    <div className="flex rounded-md overflow-hidden border border-gray-300">
                      <div className="bg-gray-100 text-gray-700 px-4 py-3 flex items-center font-medium border-r rounded-l-md">
                        +91
                      </div>

                      <input
                        type="tel"
                        placeholder="Mobile Number"
                        value={phoneNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          setPhoneNumber(value);
                        }}
                        className="w-full px-4 py-3 text-gray-700 focus:outline-none"
                        required
                        inputMode="numeric"
                        maxLength={10}
                      />
                    </div>

                    {/* Dropdown */}
                    <div className="relative">
                      <div
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 flex justify-between items-center cursor-pointer text-sm md:text-base"
                      >
                        <span>
                          {selectedOption || "Select Service Required"}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>

                      {showDropdown && (
                        <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          {options.map((option, index) => (
                            <div
                              key={index}
                              onClick={() => handleOptionClick(option)}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800 text-sm md:text-base"
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      disabled={loading}
                      type="submit"
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition duration-150 shadow-md text-sm md:text-base"
                    >
                      {loading ? "Submitting..." : "Request Callback"}
                    </button>
                  </form>

                  {/* Footer */}
                  <div className="bg-red-500 text-white  md:-mb-6 md:-mx-6 md:p-6 md:mt-3 -mb-3 -mx-3 mt-2 p-3 text-center relative rounded-b-2xl space-y-1">
                    <span className="text-xl font-medium ">
                      100% LOAN ASSISTANCE FROM DIFFERENT GOVERNMENT & PRIVATE
                      BANKS FOR
                    </span>
                    <br />
                    <span className="text-xl font-medium">
                      FULL COURSE FEES & ACCOMMODATION.
                    </span>
                    <br />
                    <span className="text-xl font-medium">
                      COMPLETE GUIDANCE TILL VISA.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>,
        document.body,
      )
    : null;
};

export default memo(DelayedPopup);
