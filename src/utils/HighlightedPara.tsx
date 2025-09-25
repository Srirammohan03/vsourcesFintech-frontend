export function HighlightedPara({ text, mobileSize, color }) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <p
      className="text-lg text-white max-w-md mx-auto md:mx-0"
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
    </p>
  );
}
