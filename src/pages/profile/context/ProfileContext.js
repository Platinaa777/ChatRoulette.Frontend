import React, {useContext} from "react";
import UserProfile from '../core/UserProfile.js';

const userProfile = new UserProfile();

const ProfileContext = React.createContext({userProfile});

export function useProfile() {
    return useContext(ProfileContext);
}

export function ProfileProvider({children}) {
    return <ProfileContext.Provider value = {{userProfile}}>
        {children}
    </ProfileContext.Provider>
}