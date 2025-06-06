// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { TranslationProvider } from "./context/TranslationContext";
import "./index.css";
import "./mobile.css"; // <- Importa o CSS responsivo aqui

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <TranslationProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TranslationProvider>
);
