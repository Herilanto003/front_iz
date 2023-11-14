import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import RefreshProvider from './context/useRefresh';  
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackDropProvider from './context/useBack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RefreshProvider>
        <BackDropProvider>
            <ToastContainer /> 
            <App />
        </BackDropProvider>
    </RefreshProvider>
);
