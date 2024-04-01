import React, {useContext, useState} from "react";

const ConnectionIdContext = React.createContext(null);

export const useConnectionId = () => useContext(ConnectionIdContext);

export function ConnectionIdProvider({children}) {
    const [connectionId, setConnectionId] = useState('');

    return <ConnectionIdContext.Provider value={[connectionId, setConnectionId]}>
        {children}
    </ConnectionIdContext.Provider>
}