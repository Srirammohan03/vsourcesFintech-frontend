import React, { useEffect, useRef, useState } from "react";
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
        student_name: name,
        number: phoneNumber,
        service_required: selectedOption,
      },
    };

    try {
      const { status } = await axios.post(
        `${import.meta.env.VITE_CMS_GLOBALURL}/api/fintech-enquires`,
        payload
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
                <div className="bg-white p-6 text-gray-800 rounded-2xl">
                  {/* Header */}
                  <div className="bg-red-500 text-white py-4 px-6 -mx-6 -mt-6 mb-6 text-center relative rounded-t-2xl">
                    <h2 className="text-xl font-bold mb-1">Save</h2>
                    <p className="text-xl font-semibold">
                      big on your application fees!
                    </p>
                    <button
                      onClick={animateAndClose}
                      className="absolute top-3 right-3 text-white hover:text-gray-200 transition-colors"
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

                  {/* Body */}
                  <p className="text-center text-gray-700 mb-6 text-lg">
                    We are just a call away from making your{" "}
                    <span className="font-bold">dreams into reality!!</span>
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name input */}
                    <input
                      type="text"
                      placeholder="Student Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none"
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
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-4 py-3 text-gray-700 focus:outline-none"
                        required
                        pattern="[0-9]{10}"
                        maxLength={10}
                      />
                    </div>

                    {/* Dropdown */}
                    <div className="relative">
                      <div
                        className="border border-gray-300 rounded-md px-4 py-3 text-gray-700 flex justify-between items-center cursor-pointer"
                        onClick={() => setShowDropdown(!showDropdown)}
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
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                              onClick={() => handleOptionClick(option)}
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
                      className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-md transition duration-150 shadow-md"
                    >
                      {loading ? "Submitting..." : "Request Callback"}
                    </button>
                  </form>

                  {/* Footer */}
                  <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left pt-6 border-t border-gray-200">
                    <p className="text-base mb-4 md:mb-0">
                      You can always reach us on
                      <br />
                      <span className="font-bold text-lg">+91 99126 11119</span>
                    </p>

                    <div className="text-xs text-gray-500">
                      By continuing, you agree to our{" "}
                      <a href="#" className="underline">
                        terms
                      </a>{" "}
                      and{" "}
                      <a href="#" className="underline">
                        privacy policy
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default DelayedPopup;
