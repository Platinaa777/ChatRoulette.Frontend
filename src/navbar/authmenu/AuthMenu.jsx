import React from 'react';
import {BsPerson} from "react-icons/bs";
import './AuthMenu.css'
import {useUser} from "../../pages/auth/context/UserContext";
import {Link} from "react-router-dom";
import {mainPath, signInPath, signUpPath} from "../../static/Paths";

function AuthMenu() {

    const {userSession} = useUser();

    return (<div className="auth-dropdown">
        <span className="auth-menu">
            <BsPerson className="user-icon"/>
            {userSession.IsAuth ? userSession.user.email : 'Guest'}
        </span>
        <div className="auth-dropdown-content">
            {userSession.IsAuth ?
                <Link to={mainPath} onClick={async () => await userSession.logout()}>Sign out</Link> : <>
                    <Link to={signInPath}>Sign in</Link>
                    <Link to={signUpPath}>Sign up</Link>
                </>}
        </div>
    </div>);
}

export default AuthMenu;