import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import axios from "axios";
import "./index.css";
import App from "./App.jsx";

// Set global API base URL dynamically
axios.defaults.baseURL = import.meta.env.DEV
  ? "http://127.0.0.1:8000"
  : "https://jobboardplatform-1-nmfm.onrender.com";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);