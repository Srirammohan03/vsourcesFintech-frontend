import { useEffect } from "react";

interface ChatBotProps {
  onClose?: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ onClose }) => {
  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0Ijoid3d3LnZzb3VyY2VvdmVyc2Vhcy5jb20iLCJpZCI6IjY3NmZlMzQ3Yzk3NTFkMmFhNWNkZTQ5NyIsImFjY0lkIjoiNjZiZjVjNjUzNTIzZmIxNjhjYzBkZTFlIiwiaWF0IjoxNzM1Mzg2MTgwfQ.3S6jVYpF0IgDzev3E98tthkqDG081q1nG8Z_UD5D4Rg";
    (function (w, d, s, u, t) {
      w.Chatty = function (c: any) {
        w.Chatty._.push(c);
      };
      w.Chatty._ = [];
      w.Chatty.url = u;
      w.Chatty.hash = t;
      const h = d.getElementsByTagName(s)[0];
      const j = d.createElement(s) as HTMLScriptElement;
      j.async = true;
      j.src =
        "https://widget.gallabox.com/chatty-widget.min.js?_=" + Math.random();
      h.parentNode?.insertBefore(j, h);
    })(window, document, "script", "https://widget.gallabox.com", token);

    window.gbWidgetOnClose = () => {
      if (onClose) onClose();
    };

    return () => {
      delete window.gbWidgetOnClose;
    };
  }, [onClose]);

  return null;
};

export default ChatBot;
