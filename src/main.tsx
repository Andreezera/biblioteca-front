import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <main className="text-foreground bg-background min-h-screen">
          <RouterProvider router={router} />
        </main>
        <Toaster position="bottom-right" />
      </NextThemesProvider>
    </NextUIProvider>
  </React.StrictMode>
);
