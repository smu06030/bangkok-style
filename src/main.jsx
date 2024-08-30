import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import EntireProvider from "./store/Context/EntireProvider.jsx";

createRoot(document.getElementById("root")).render(
  <EntireProvider>
    <App />
  </EntireProvider>
);
