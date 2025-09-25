import React, { useState, useEffect } from "react";
import { ChevronUp, MessageSquareMore, FileText, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ChatBot from "@/services/ChatBot";

interface Props {
  showFormIcon: boolean;
  onFormIconClick: () => void;
}

const ScrollToTopButton: React.FC<Props> = ({
  showFormIcon,
  onFormIconClick,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [chatOpen, setChatOpen] = useState(false); // ✅ chatbot toggle

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };
    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {isVisible && (
        <>
          {/* Request form */}
          {showFormIcon && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onFormIconClick}
                  className="sonar-button fixed bottom-44 right-6 z-40 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors md:bottom-32 mb-3 flex items-center justify-center"
                  aria-label="Open Form"
                >
                  <FileText className="h-6 w-6" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Request form</TooltipContent>
            </Tooltip>
          )}

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="fixed bottom-20 right-7 z-40 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-6 w-6" />
          </button>
        </>
      )}

      {/* ✅ Load Gallabox once here */}
      <ChatBot onClose={() => setChatOpen(false)} />
      <style>{`

        .sonar-button {
  overflow: visible;
}

.sonar-button::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border: 3px solid rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0.9);
  opacity: 0;
  animation: sonarEffect 1.5s ease-out infinite;
}

@keyframes sonarEffect {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5),
                0 0 10px 10px rgba(239, 68, 68, 0.6),
                0 0 0 10px rgba(255, 255, 255, 0.6);
  }
  100% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
}


          @keyframes pulse {
             0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.8; }
          }
          .pulse {
           animation: pulse 1.5s infinite;
           }
    `}</style>
    </>
  );
};

export default ScrollToTopButton;
