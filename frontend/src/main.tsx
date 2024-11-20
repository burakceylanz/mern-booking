import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AppContext.tsx";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "react-query";
import { SearchContextProvider } from "./context/SearchContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <SearchContextProvider>
            <App />
          </SearchContextProvider>
        </QueryClientProvider>
      </AuthProvider>
    </Router>
    <Toaster />
  </StrictMode>
);
