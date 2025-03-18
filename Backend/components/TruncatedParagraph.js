import { useState } from "react";

const TruncatedParagraph = ({ text, wordLimit }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const truncatedText = isTruncated
    ? text.split(" ").slice(0, wordLimit).join(" ") + "..."
    : text;

  return (
    <p onClick={toggleTruncate} style={{ cursor: "pointer" }}>
      {truncatedText}
    </p>
  );
};

export default TruncatedParagraph;
