import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/index.tsx';
import App from './App.tsx';
import './index.css';
import { Toaster } from "@/components/ui/toaster"


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
    <Toaster />
  </StrictMode>
);
