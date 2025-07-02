import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ClerkAuthProvider from './components/ClerkAuthProvider';
import { UserProvider } from './components/UserContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkAuthProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ClerkAuthProvider>
  </React.StrictMode>,
);
