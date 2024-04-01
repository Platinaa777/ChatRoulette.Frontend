import React, {useContext, useState} from "react";

const RoomContext = React.createContext(null);

export const useRoom = () => useContext(RoomContext);

export function RoomProvider({children}) {
    const [room, setRoom] = useState('');

    return <RoomContext.Provider value={{room, setRoom}}>
        {children}
    </RoomContext.Provider>
}