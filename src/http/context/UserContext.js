import React, { createContext, useContext } from "react";
import { UserSession } from "../UserSession";
import { observer, useLocalObservable } from "mobx-react-lite";

const Context = createContext(null);

export const UserProvider = observer(({ children }) => {
    const store = useLocalObservable(() => new UserSession());
    return <Context.Provider value={store}>
        {children}
    </Context.Provider>
});

export const useSession = () => {
    const store = useContext(Context);
    if (!store) throw new Error('Use user store within provider!')
    return store
}