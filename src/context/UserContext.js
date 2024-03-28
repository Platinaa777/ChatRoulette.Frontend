import React, {useContext} from "react";
import UserSession from "../pages/auth/core/UserSession";

const userSession = new UserSession();
const UserContext = React.createContext({userSession});

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({children}) {
    return <UserContext.Provider value = {{userSession}}>
        {children}
    </UserContext.Provider>
}