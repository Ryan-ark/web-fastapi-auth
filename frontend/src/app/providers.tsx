import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "sonner";
import { RouterProvider } from "react-router-dom";

import { queryClient } from "./query-client";
import { router } from "./router";
import { ThemeProvider } from "./theme-provider";

export function AppProviders() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={150}>
          <RouterProvider router={router} />
          <Toaster richColors position="top-right" theme="system" />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
