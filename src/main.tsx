import React, { StrictMode, Component, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: any }> {
  state = { hasError: false, error: null as any };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white p-8 flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl font-bold text-rose-500 mb-4">Oups ! Une erreur est survenue.</h1>
          <pre className="bg-slate-800 p-4 rounded-xl text-left text-xs overflow-auto max-w-full mb-6">
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-emerald-600 rounded-full font-bold shadow-lg"
          >
            Recharger l'application
          </button>
        </div>
      );
    }
    return (this as any).props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
