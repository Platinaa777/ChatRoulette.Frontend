import React, {createContext, useContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserSession from './auth/core/UserSession';

const userSession = new UserSession();

export const Context = createContext({
    userSession
})

// React.StrictMode changed on div
// todo
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Context.Provider value={{userSession}}>
    <div>
        <App/>
    </div>
</Context.Provider>);
