import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./pages/auth/context/UserContext";
import { ProfileProvider } from "./pages/profile/context/ProfileContext.js"
import App from './App';
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<UserProvider>
    <ProfileProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ProfileProvider>
</UserProvider>);
