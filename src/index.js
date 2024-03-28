import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {UserProvider} from "./context/UserContext";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<UserProvider>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
</UserProvider>);
