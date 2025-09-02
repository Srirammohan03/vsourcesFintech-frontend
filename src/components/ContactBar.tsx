import React, { useState, useEffect } from "react";
import { Phone, UserPlus, Video } from "lucide-react";
import { openGreenPopup, resetPopupPreferences } from "../lib/Popups";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface ContactBarProps {
  visible?: boolean;
}

const ContactBar: React.FC<ContactBarProps> = ({ visible = true }) => {
  const whatsappNumber = "919912611119";
  const phoneNumber = "+919912611119";
  const [showMobileBar, setShowMobileBar] = useState(false);
  const navigate = useNavigate();

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
    openGreenPopup();
  };

  const handleGoVirtual = () => {
    navigate("/meeting");
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
            <a
              href={`tel:${phoneNumber}`}
              className="flex flex-col items-center hover-lift"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#5ac1ff] flex items-center justify-center mb-1 shadow-md">
                <Phone className="text-white h-4 w-4 md:h-5 md:w-5" />
              </div>
              <span className="text-[10px] md:text-xs font-medium text-gray-800">
                Call Now
              </span>
            </a>

            {/* Request Callback */}
            <button
              onClick={handleRequestCallback}
              className="flex flex-col items-center hover-lift"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#f5a623] flex items-center justify-center mb-1 shadow-md">
                <UserPlus className="text-white h-4 w-4 md:h-5 md:w-5" />
              </div>
              <span className="text-[10px] md:text-xs font-medium text-gray-800">
                Request Callback
              </span>
            </button>

            {/* Go Virtual */}
            <button
              onClick={handleGoVirtual}
              className="flex flex-col items-center hover-lift"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black flex items-center justify-center mb-1 shadow-md">
                <Video className="text-white h-4 w-4 md:h-5 md:w-5" />
              </div>
              <span className="text-[10px] md:text-xs font-medium text-gray-800">
                Go Virtual
              </span>
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
              <span className="text-[10px] md:text-xs font-medium text-gray-800">
                WhatsApp
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Version */}
      <div className="hidden md:block bg-white border-t border-gray-200">
        <div className="w-full max-w-[1400px] mx-auto px-4 py-4">
          <div className="flex justify-around items-center">
            {/* Call Now */}
            <a
              href={`tel:${phoneNumber}`}
              className="flex flex-col items-center hover-lift"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#5ac1ff] flex items-center justify-center mb-1 shadow-md">
                <Phone className="text-white h-4 w-4 md:h-5 md:w-5" />
              </div>
              <span className="text-[10px] md:text-xs font-medium text-gray-800">
                Call Now
              </span>
            </a>

            {/* Request Callback */}
            <button
              onClick={handleRequestCallback}
              className="flex flex-col items-center hover-lift"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#f5a623] flex items-center justify-center mb-1 shadow-md">
                <UserPlus className="text-white h-4 w-4 md:h-5 md:w-5" />
              </div>
              <span className="text-[10px] md:text-xs font-medium text-gray-800">
                Request Callback
              </span>
            </button>

            {/* Go Virtual */}
            <button
              onClick={handleGoVirtual}
              className="flex flex-col items-center hover-lift"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black flex items-center justify-center mb-1 shadow-md">
                <Video className="text-white h-4 w-4 md:h-5 md:w-5" />
              </div>
              <span className="text-[10px] md:text-xs font-medium text-gray-800">
                Go Virtual
              </span>
            </button>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center hover-lift"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#25d366] flex items-center justify-center mb-1 shadow-md">
                <svg
                  className="text-white h-4 w-4 md:h-5 md:w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <span className="text-[10px] md:text-xs font-medium text-gray-800">
                WhatsApp
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactBar;
