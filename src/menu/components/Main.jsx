import React from "react";
import "../styles/main.css";
import { useNavigate } from 'react-router-dom'

export const Main = () => {
    const navigate = useNavigate();

    const redirectToSignUp = () => {
        navigate('/SignUp')
    }

    return (
      <div className="main-container">
        <div className="button-container">
          <button className="main-button" onClick={redirectToSignUp}>Sign Up</button>
          <button className="main-button">Sign In</button>
        </div>
        <div className="profile-tab">Profile</div>
      </div>
    );
};
