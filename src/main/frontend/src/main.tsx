import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes/Routes';
import './styles/index.css';
import { UserProvider } from './UserProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <Routes />
    </UserProvider>
  </React.StrictMode>
);
