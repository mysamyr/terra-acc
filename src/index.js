import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './components/app';
import ErrorBoundary from './components/errorBoundary';
import { SnackBarContextProvider } from './components/store/snackbar-context';

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
