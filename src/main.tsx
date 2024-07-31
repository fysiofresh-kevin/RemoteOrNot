import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "@/components/ui/sonner.tsx";
import { SignOutButton } from "@/components/SignOutButton.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <SignOutButton />
    <Toaster />
  </React.StrictMode>,
);
