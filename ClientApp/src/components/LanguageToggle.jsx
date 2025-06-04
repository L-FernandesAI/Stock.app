/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import { useTranslate } from "../context/TranslationContext";

const LanguageToggle = () => {
  const { lang, setLang } = useTranslate();

  const btnStyle = (code) => ({
    padding: "10px 20px",
    backgroundColor: lang === code ? "#3f3f46" : "#1f2937",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "20px 0",
        gap: "20px",
      }}
    >
      <button onClick={() => setLang("pt")} style={btnStyle("pt")}>
        🇧🇷 Português
      </button>
      <button onClick={() => setLang("en")} style={btnStyle("en")}>
        🇬🇧 English
      </button>
      <button onClick={() => setLang("ru")} style={btnStyle("ru")}>
        🇷🇺 Русский
      </button>
      <button onClick={() => setLang("ka")} style={btnStyle("ka")}>
        🇬🇪 ქართული
      </button>
      <button onClick={() => setLang("hy")} style={btnStyle("hy")}>
        🇦🇲 Հայերեն
      </button>
    </div>
  );
};

export default LanguageToggle;
