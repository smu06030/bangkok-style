import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import ContextProvider from "./Context/ContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
