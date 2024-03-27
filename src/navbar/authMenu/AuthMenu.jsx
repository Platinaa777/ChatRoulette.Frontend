import React from 'react';
import {BsPerson} from "react-icons/bs";
import './AuthMenu.css'

function AuthMenu({userSession, navigate}) {

    const redirectToSignIn = () => {
        navigate('/Login')
    }

    const redirectToSignUp = () => {
        navigate('/SignUp')
    }

    const redirectToMainWithLogout = async () => {
        await userSession.logout()
        navigate("/")
    }

    return (<div className="auth-dropdown">
        <button className="user-menu">
            <BsPerson className="user-icon"/>
            <span className="username">{userSession.IsAuth ? userSession.user.email : 'Guest'}</span>
        </button>
        <div className="dropdown-content">
            {userSession.IsAuth ? <a onClick={redirectToMainWithLogout}>Sign out</a> : <>
                <a onClick={redirectToSignIn}>Sign in</a>
                <a onClick={redirectToSignUp}>Sign up</a>
            </>}
        </div>
    </div>);
}

export default AuthMenu;