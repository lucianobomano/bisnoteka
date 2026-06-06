import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Initialize dynamic API URL based on host environment
(window as any).__VITE_API_URL__ = typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    ? window.location.origin
    : 'http://localhost:3001';

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <App />
)
