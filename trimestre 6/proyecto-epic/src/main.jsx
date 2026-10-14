import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import App from './App.jsx'
import { initMercadoPago } from '@mercadopago/sdk-react';

initMercadoPago('APP_USR-e7644ceb-3393-4b1b-9cd7-da8f2bd89593', { locale: 'es-CO' }); 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
