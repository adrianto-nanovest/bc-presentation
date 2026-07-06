import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { VARIANT } from "./variant";
import "./styles/globals.css";

// index.html ships the Berau title/favicon; the general variant re-brands at
// boot. (Pre-auth, visitors see the middleware login page, which already
// carries the right branding per host.)
if (VARIANT === "general") {
  document.title = "AI Catalyst Workshop";
  document
    .querySelector<HTMLLinkElement>('link[rel="icon"]')
    ?.setAttribute("href", "/general-ai-logo.png");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
