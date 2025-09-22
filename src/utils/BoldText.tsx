interface BoldTextProps {
  text: string;
}

export function BoldText({ text }: BoldTextProps) {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return (
    <p
      className="paragraph"
      data-aos="fade-right"
      data-aos-anchor-placement="center-bottom"
      data-aos-duration="1000"
      data-aos-delay="800"
    >
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          part
        )
      )}
      <style>{`
        .paragraph {
      font-size: 15px;
      line-height: 1.6;
      color: black;
      margin-bottom: 15px;
      margin-top: 10px;
      
    }

    @media (max-width: 768px) {
      .paragraph {
        text-align:justify
      }
      }
      `}</style>
    </p>
  );
}
