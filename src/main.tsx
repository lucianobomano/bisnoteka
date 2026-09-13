import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Initialize dynamic API URL based on host environment
const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || 
   window.location.hostname === '127.0.0.1' || 
   window.location.hostname === '[::1]');

(window as any).__VITE_API_URL__ = isLocalhost
    ? 'http://localhost:3001'
    : window.location.origin;

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <App />
)
