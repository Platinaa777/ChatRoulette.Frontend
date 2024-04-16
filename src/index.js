import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./http/context/UserContext";
import App from './App';
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<UserProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</UserProvider>);
