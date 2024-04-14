import React, {useContext} from "react";
import UserProfile from '../core/UserProfile.js';

const userProfile = new UserProfile();

const ProfileContext = React.createContext({userProfile});

export function useProfile() {
    return useContext(UserContext);
}

export function Provider({children}) {
    return <ProfileContext.Provider value = {{userProfile}}>
        {children}
    </ProfileContext.Provider>
}