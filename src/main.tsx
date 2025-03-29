import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SpeedInsights } from "@vercel/speed-insights/react"; // Corrected import
import { Analytics } from "@vercel/analytics/react";

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <>
      <SpeedInsights />
      <Analytics />
      <App />
    </>
  );
}
