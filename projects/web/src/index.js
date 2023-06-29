import React from 'react';
import {createRoot} from 'react-dom/client';
import {
  BrowserRouter,
} from "react-router-dom";
import App from './components/app/App';
import './index.css';
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
