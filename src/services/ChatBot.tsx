import React, { useState } from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "👋 Hi! I’m Study Abroad Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Call your backend AI API (RAG or OpenAI)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });
      const data = await res.json();

      const botMessage: Message = {
        sender: "bot",
        text: data.answer || "Sorry, I don’t know that yet.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error connecting to AI service." },
      ]);
    }
  };

  return (
    <div className="fixed bottom-20 right-6 w-80 h-96 bg-white shadow-xl rounded-xl flex flex-col z-50 border border-gray-300">
      {/* Header */}
      <div className="bg-blue-600 text-white p-3 rounded-t-xl font-semibold flex justify-between items-center">
        Study Abroad Assistant
        <button
          onClick={() => {
            const chatbot = document.getElementById("chatbot-container");
            if (chatbot) chatbot.style.display = "none";
          }}
        >
          ✖
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg max-w-[80%] ${
              msg.sender === "user"
                ? "ml-auto bg-blue-100 text-blue-900"
                : "mr-auto bg-gray-200 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-2 border-t flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-lg px-2 text-sm"
          placeholder="Ask me about studying abroad..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
