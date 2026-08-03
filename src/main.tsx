import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { VARIANT } from "./variant";
import { applyBrandChrome } from "./brand-chrome";
import "./styles/globals.css";

// index.html ships the `general` default, matching the resolver's default; the
// brand row is then applied unconditionally, so no brand is the "no-op" one.
// (Pre-auth, visitors see the middleware login page, which already carries the
// right branding per host.)
applyBrandChrome(VARIANT.brand, document);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
