import React, { createContext, useContext, useState } from "react";
import pt from "../locales/pt.json";
import en from "../locales/en.json";
import ru from "../locales/ru.json";
import ka from "../locales/ka.json";
import hy from "../locales/hy.json";

const languages = {
  pt,
  en,
  ru,
  ka,
  hy,
};

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [lang, setLang] = useState("en");

  const t = (key) => {
    return languages[lang][key] || key;
  };

  return (
    <TranslationContext.Provider value={{ t, setLang, lang }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslate = () => useContext(TranslationContext);
