import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log("APP BOOTING...");

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("FATAL: root element not found!");
  } else {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
    console.log("APP RENDER CALLED");
  }
} catch (err) {
  console.error("CRITICAL BOOT ERROR:", err);
  if (err instanceof Error) {
    console.error("Stack:", err.stack);
  }
}
