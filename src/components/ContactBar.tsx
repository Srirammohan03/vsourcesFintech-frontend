import React, { useState, useEffect } from "react";
import { Phone, UserPlus, Video } from "lucide-react";
import { resetPopupPreferences } from "../lib/Popups";
import { FaWhatsapp } from "react-icons/fa";
import DelayedPopup from "./DelayedPopup"; // adjust this path as needed
import { PopupModal } from "react-calendly";

interface ContactBarProps {
  visible?: boolean;
}

const ContactBar: React.FC<ContactBarProps> = ({ visible = true }) => {
  const whatsappNumber = "919912611119";
  const phoneNumber = "+919912611119";
  const [showMobileBar, setShowMobileBar] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Calendly modal state
  const [openCalendly, setOpenCalendly] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowMobileBar(true);
      } else {
        setShowMobileBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRequestCallback = () => {
    resetPopupPreferences();
    setShowPopup(true);
  };

  const handleMinimize = () => {
    setShowPopup(false);
  };

  const handleGoVirtual = () => {
    setOpenCalendly(true);
  };

  if (!visible) return null;

  return (
    <>
      {/* Mobile Version */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-40 py-2 md:hidden transition-all duration-300 ${
          showMobileBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4">
          <div className="flex justify-around items-center">
            {/* Call Now */}
            <a href={`tel:${phoneNumber}`} className="flex flex-col items-center hover-lift">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#5ac1ff] flex items-center justify-center mb-1 shadow-md">
                <Phone className="text-white h-4 w-4 md:h-5 md:w-5" />
              </div>
              <span className="text-[10px] md:text-xs font-medium text-gray-800">Call Now</span>
            </a>

            {/* Request Callback */}
            <button onClick={handleRequestCallback} className="flex flex-col items-center hover-lift">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#f5a623] flex items-center justify-center mb-1 shadow-md">
                <UserPlus className="text-white h-4 w-4 md:h-5 md:w-5" />
              </div>
              <span className="text-[10px] md:text-xs font-medium text-gray-800">Request Callback</span>
            </button>

            {/* Go Virtual */}
            <button onClick={handleGoVirtual} className="flex flex-col items-center hover-lift">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black flex items-center justify-center mb-1 shadow-md">
                <Video className="text-white h-4 w-4 md:h-5 md:w-5" />
              </div>
              <span className="text-[10px] md:text-xs font-medium text-gray-800">Go Virtual</span>
            </button>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center hover-lift"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#25d366] flex items-center justify-center mb-1 shadow-md">
                <FaWhatsapp className="text-white h-4 w-4 md:h-5 md:w-5" />
              </div>
              <span className="text-[10px] md:text-xs font-medium text-gray-800">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Version */}
      <div className="hidden md:block bg-white border-t border-gray-200">
        <div className="w-full max-w-[1400px] mx-auto px-4 py-4">
          <div className="flex justify-around items-center">
            {/* Call Now */}
            <a href={`tel:${phoneNumber}`} className="flex flex-col items-center hover-lift">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#5ac1ff] flex items-center justify-center mb-1 shadow-md">
                <Phone className="text-white h-4 w-4 md:h-5 md:w-5" />
              </div>
              <span className="text-[10px] md:text-xs font-medium text-gray-800">Call Now</span>
            </a>

            {/* Request Callback */}
            <button onClick={handleRequestCallback} className="flex flex-col items-center hover-lift">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#f5a623] flex items-center justify-center mb-1 shadow-md">
                <UserPlus className="text-white h-4 w-4 md:h-5 md:w-5" />
              </div>
              <span className="text-[10px] md:text-xs font-medium text-gray-800">Request Callback</span>
            </button>

            {/* Go Virtual */}
            <button onClick={handleGoVirtual} className="flex flex-col items-center hover-lift">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black flex items-center justify-center mb-1 shadow-md">
                <Video className="text-white h-4 w-4 md:h-5 md:w-5" />
              </div>
              <span className="text-[10px] md:text-xs font-medium text-gray-800">Go Virtual</span>
            </button>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center hover-lift"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#25d366] flex items-center justify-center mb-1 shadow-md">
                <FaWhatsapp className="text-white h-4 w-4 md:h-5 md:w-5" />
              </div>
              <span className="text-[10px] md:text-xs font-medium text-gray-800">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* DelayedPopup */}
      {showPopup && <DelayedPopup onMinimize={() => setShowPopup(false)} />}

      {/* Calendly PopupModal */}
      <PopupModal
        url="https://calendly.com/sriram9491/30min"
        open={openCalendly}
        onModalClose={() => setOpenCalendly(false)}
        rootElement={document.getElementById("root")}
        pageSettings={{ hideEventTypeDetails: false }}
      />
    </>
  );
};

export default ContactBar;
