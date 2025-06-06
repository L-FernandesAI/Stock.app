import React, { useState } from "react";
import { useTranslate } from "../context/TranslationContext";

function LanguageMobileMenu() {
  const { setLang } = useTranslate();
  const [open, setOpen] = useState(false);

  return (
    <div className="language-hamburger">
      <button onClick={() => setOpen(!open)} className="hamburger-btn">
        ☰
      </button>

      {open && (
        <div className="language-menu">
          <button
            onClick={() => {
              setLang("pt");
              setOpen(false);
            }}
          >
            🇧🇷 Português
          </button>
          <button
            onClick={() => {
              setLang("en");
              setOpen(false);
            }}
          >
            🇬🇧 English
          </button>
          <button
            onClick={() => {
              setLang("ru");
              setOpen(false);
            }}
          >
            🇷🇺 Русский
          </button>
          <button
            onClick={() => {
              setLang("ka");
              setOpen(false);
            }}
          >
            🇬🇪 ქართული
          </button>
          <button
            onClick={() => {
              setLang("hy");
              setOpen(false);
            }}
          >
            🇦🇲 Հայերեն
          </button>
        </div>
      )}
    </div>
  );
}

export default LanguageMobileMenu;
