import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from './hooks/useAuth';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RecoilRoot>   
     <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
    

    </Router>
    </RecoilRoot>

  </React.StrictMode>
);

