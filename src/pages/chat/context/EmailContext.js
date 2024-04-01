import React, {useContext, useState} from "react";

const EmailContext = React.createContext(null);

export const useEmail = () => useContext(EmailContext);

export function EmailProvider({children}) {
    const [email, setEmail] = useState('');

    return <EmailContext.Provider value={{email, setEmail}}>
        {children}
    </EmailContext.Provider>
}