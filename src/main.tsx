import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// El service worker se registra automáticamente por Vite PWA
// No es necesario registrarlo manualmente

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

