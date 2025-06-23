import { StrictMode } from 'react'
import { Provider } from './components/ui/provider'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <ClerkProvider publishableKey={publishableKey}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <App />
      </BrowserRouter>
        
    </MantineProvider>
    </ClerkProvider>
  
  </StrictMode>
);
