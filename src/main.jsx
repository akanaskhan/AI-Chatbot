import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './Route';
import './index.css';
import AuthContextProvider from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthContextProvider>
    <AppRouter />
      </AuthContextProvider>
  </React.StrictMode>
);
