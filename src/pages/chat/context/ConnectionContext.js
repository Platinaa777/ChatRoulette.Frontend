import React, {useContext, useRef} from 'react';

const ConnectionContext = React.createContext(null);

export const useConnection = () => useContext(ConnectionContext);

export const ConnectionProvider = ({children}) => {
    const connection = useRef(null);
    return <ConnectionContext.Provider value={connection}>{children}</ConnectionContext.Provider>;
};