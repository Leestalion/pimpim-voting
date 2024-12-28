import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "./router";
import { DeveloperProvider } from "./contexts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DeveloperProvider>
      <Router />
    </DeveloperProvider>
  </StrictMode>
);
