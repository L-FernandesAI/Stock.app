import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { TranslationProvider } from "./context/TranslationContext"; // 👈 AQUI
import "./index.css";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <TranslationProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TranslationProvider>
);
