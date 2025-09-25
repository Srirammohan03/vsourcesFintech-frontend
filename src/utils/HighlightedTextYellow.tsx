import { motion } from "framer-motion";

export function HighlightedTextYellow({ text, mobileSize, color }) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <motion.h1
      className="leading-tight font-bold text-white max-w-2xl"
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      style={{
        fontFamily: "Poppins, sans-serif",
        fontSize: mobileSize, // default on mobile
      }}
    >
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <span key={i} className={`text-${color}-300 font-bold`}>
            {part.replace(/\*\*/g, "")}
          </span>
        ) : (
          part
        )
      )}
    </motion.h1>
  );
}
