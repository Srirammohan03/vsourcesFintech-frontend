// import React, { useState, useRef, useEffect } from "react";

// interface Message {
//   sender: "user" | "bot";
//   text: string;
//   options?: string[];
// }

// interface ChatBotProps {
//   onClose: () => void;
// }

// const MAIN_MENU_OPTIONS = [
//   "Tell me about loan eligibility",
//   "What documents are required?",
//   "How much loan amount can I get?",
//   "Tell me about collateral-free loans",
//   "What is a moratorium period?",
// ];

// const flow: Record<string, Message> = {
//   "Tell me about loan eligibility": {
//     sender: "bot",
//     text: "Most banks require you to be an Indian citizen, have a confirmed admission letter from a recognized foreign university, and a co-applicant (usually a parent/guardian). Your academic record and the co-applicant's income are also important factors.",
//     options: [
//       "What about collateral?",
//       "Are there age limits?",
//       "Go back to main menu",
//     ],
//   },
//   "Are there age limits?": {
//     sender: "bot",
//     text: "Yes, some lenders have age criteria. Typically, you should be between 18 and 35, though some lenders may fund applicants up to 65 for certain post-doctoral courses.",
//     options: ["What documents are required?", "Go back to main menu"],
//   },
//   "What about collateral?": {
//     sender: "bot",
//     text: "Collateral is usually required for loans above ₹7.5 Lakhs, but this can vary by bank. It can be property, fixed deposits, or insurance policies. A secured loan with collateral can also get you a higher loan amount and a lower interest rate.",
//     options: ["Tell me about collateral-free loans", "Go back to main menu"],
//   },
//   "What documents are required?": {
//     sender: "bot",
//     text: "Common documents for the student and co-applicant include: a filled application form, KYC documents (ID & address proof), academic records, admission letter, income proof of the co-applicant (e.g., salary slips, ITR), and collateral documents if applicable.",
//     options: [
//       "What about documents for the co-applicant?",
//       "How much loan amount can I get?",
//       "Go back to main menu",
//     ],
//   },
//   "What about documents for the co-applicant?": {
//     sender: "bot",
//     text: "The co-applicant typically needs to provide proof of identity and address, proof of income (like ITR for the last 2 years, salary slips), and their bank statements. This helps the bank assess their financial stability for repayment.",
//     options: ["What documents are required?", "Go back to main menu"],
//   },
//   "How much loan amount can I get?": {
//     sender: "bot",
//     text: "Loan amounts vary significantly. You can typically get a collateral-free loan of up to ₹20-30 Lakhs, or even up to ₹75 Lakhs from some NBFCs. With collateral, loan amounts can go up to ₹1.5-2 Crore, depending on the value of the collateral and the bank's policies.",
//     options: ["What affects the loan amount?", "Go back to main menu"],
//   },
//   "What affects the loan amount?": {
//     sender: "bot",
//     text: "The final loan amount is influenced by the cost of your course and living expenses, the value of your collateral (if any), your academic profile, and your co-applicant's income and credit score. Some banks also offer higher amounts for admission to premier universities.",
//     options: ["How much loan amount can I get?", "Go back to main menu"],
//   },
//   "Tell me about collateral-free loans": {
//     sender: "bot",
//     text: "Collateral-free loans are unsecured loans that do not require any physical asset as security. The loan is sanctioned based on your academic merit, the university's ranking, and the co-applicant's financial profile. This is a great option if you don't have collateral.",
//     options: [
//       "What is a moratorium period?",
//       "How much loan amount can I get?",
//       "Go back to main menu",
//     ],
//   },
//   "What is a moratorium period?": {
//     sender: "bot",
//     text: "A moratorium period is a holiday period during which you do not have to make any loan repayments. This typically covers the duration of your course plus an additional 6 to 12 months. After this period, you must begin paying your EMIs.",
//     options: ["Tell me about loan eligibility", "Go back to main menu"],
//   },
//   "Go back to main menu": {
//     sender: "bot",
//     text: "Main Menu: What would you like to know?",
//     options: [...MAIN_MENU_OPTIONS],
//   },
// };

// // Initial message for the chatbot
// const initialMessages: Message[] = [
//   {
//     sender: "bot",
//     text: "Hi! I’m Study Abroad Loans Assistant. How can I help you today?",
//     options: [...MAIN_MENU_OPTIONS],
//   },
// ];

// const ChatBot: React.FC<ChatBotProps> = ({ onClose }) => {
//   const [messages, setMessages] = useState<Message[]>(initialMessages);

//   const chatRef = useRef<HTMLDivElement>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
//         onClose();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [onClose]);

//   const handleOptionClick = (option: string) => {
//     setMessages((prev) => [...prev, { sender: "user", text: option }]);
//     const next = flow[option];
//     if (next) {
//       setTimeout(() => {
//         setMessages((prev) => [...prev, next]);
//       }, 600);
//     } else {
//       // fallback in case option string is not found (should not occur)
//       setTimeout(() => {
//         setMessages((prev) => [
//           ...prev,
//           {
//             sender: "bot",
//             text: "Sorry, I didn't understand that. Please choose an available option.",
//             options: [...MAIN_MENU_OPTIONS],
//           },
//         ]);
//       }, 600);
//     }
//   };

//   return (
//     <div
//       ref={chatRef}
//       id="chatbot-container"
//       className="fixed bottom-6 right-6 w-80 h-[400px] bg-white shadow-2xl rounded-3xl flex flex-col z-50 border border-gray-100 font-sans overflow-hidden transition-all duration-300 transform"
//       onMouseDown={(e) => e.stopPropagation()}
//     >
//       <div className="bg-red-600 text-white p-4 rounded-t-[22px] font-semibold text-lg flex justify-between items-center shadow-md">
//         Study Abroad Assistant
//         <button
//           onClick={onClose}
//           aria-label="Close Chatbot"
//           className="text-white text-3xl font-light leading-none opacity-80 hover:opacity-100 transition-all duration-300"
//         >
//           &times;
//         </button>
//       </div>

//       <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
//         {messages.map((msg, idx) => (
//           <div key={idx} className="flex flex-col">
//             <div
//               className={`p-3 rounded-xl text-xs max-w-[85%] leading-relaxed drop-shadow-sm ${
//                 msg.sender === "user"
//                   ? "ml-auto bg-[#1F2B6E] text-white"
//                   : "mr-auto bg-gray-100 text-gray-800"
//               }`}
//             >
//               {msg.text}
//             </div>
//             {msg.sender === "bot" && msg.options && (
//               <div className="mt-3 flex flex-col space-y-2">
//                 {msg.options.map((opt, i) => (
//                   <button
//                     key={i}
//                     onClick={() => handleOptionClick(opt)}
//                     className="text-xs font-medium bg-white text-[#1F2B6E] px-2 py-2 rounded-xl border border-[#1F2B6E] drop-shadow-sm hover:bg-[#1F2B6E] hover:text-white transition-colors duration-200 ease-in-out"
//                   >
//                     {opt}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <style>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 8px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #f1f1f1;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #888;
//           border-radius: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #555;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ChatBot;
import { useEffect } from "react";

interface ChatBotProps {
  onClose?: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ onClose }) => {
  useEffect(() => {
    (window as any).gbwawc = {
      url: "https://waw.gallabox.com",
      options: {
        waId: "919000139547",
        siteName: "Vsource Overseas",
        siteTag: "Very Responsive",
        siteLogo:
          "https://files.gallabox.com/66bf5c653523fb168cc0de1e/a1575190-cfd9-4ae4-9493-593087c368d8-Untitled2.png",
        widgetPosition: "RIGHT",
        welcomeMessage:
          "Hi, I'm Vsource Overseas Assistant. How can I help you?",
        brandColor: "#25D366",
        messageText: "Looking for Masters Abroad",
        replyOptions: [
          "Tell me about eligibility for studying abroad",
          "What Documents do I need for admission",
          "How much education loan can I avail for abroad studies",
          "What are non collateral education loan options?",
        ],
        version: "v1",
        widgetPositionMarginX: 12,
        widgetPositionMarginY: 12,
      },
    };

    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://waw.gallabox.com/whatsapp-widget.min.js?_=" +
      new Date().getTime();
    document.body.appendChild(script);

    // ⚡ Optionally listen for widget close if Gallabox exposes events
    (window as any).gbWidgetOnClose = () => {
      if (onClose) onClose();
    };

    return () => {
      document.body.removeChild(script);
      delete (window as any).gbWidgetOnClose;
    };
  }, [onClose]);

  return null;
};

export default ChatBot;
