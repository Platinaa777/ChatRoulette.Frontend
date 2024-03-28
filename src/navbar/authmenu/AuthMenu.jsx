import React from 'react';
import {BsPerson} from "react-icons/bs";
import './AuthMenu.css'
import {useUser} from "../../context/UserContext";
import {Link} from "react-router-dom";
import {mainPath, signInPath, signUpPath} from "../../res/Paths";

function AuthMenu() {

    const {userSession} = useUser();

    return (<div className="auth-dropdown">
        <button className="user-menu">
            <BsPerson className="user-icon"/>
            <span className="username">{userSession.IsAuth ? userSession.user.email : 'Guest'}</span>
        </button>
        <div className="dropdown-content">
            {userSession.IsAuth ?
                <Link to={mainPath} onClick={async () => await userSession.logout()}>Sign out</Link> : <>
                    <Link to={signInPath}>Sign in</Link>
                    <Link to={signUpPath}>Sign up</Link>
                </>}
        </div>
    </div>);
}

export default AuthMenu;