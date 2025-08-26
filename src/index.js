import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.js';
import ErrorBoundary from './components/ErrorBoundary.js';
import { SnackBarContextProvider } from './components/Snackbar/context.js';

import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <SnackBarContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SnackBarContextProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
