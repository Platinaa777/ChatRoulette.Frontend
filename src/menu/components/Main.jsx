import React, {useContext, useEffect} from "react";
import "../styles/main.css";
import { useNavigate } from 'react-router-dom'
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import WaitingRoom from "./WaitingRoom";

const Main = () => {
  const navigate = useNavigate();
  const {userSession} = useContext(Context)

  useEffect(() => {
    if (!localStorage.getItem('access-token')) {
      userSession.checkAuth()
    }
  }, [])

  const redirectToSignUp = () => {
      navigate('/SignUp')

  }

  const redirectToLogin = () => {
    navigate('/Login')
  }

  const redirectToMainWithLogout = async () => {
    await userSession.logout()
    navigate("/")
  }

  return (
    <div className="main-container">
      <div className="button-container">
        {
          userSession.IsAuth 
          ?
          <button className="main-button" onClick={redirectToMainWithLogout}>Logout</button>
          :
          <div>
            <button className="main-button" onClick={redirectToSignUp}>Sign Up</button>
            <button className="main-button" onClick={redirectToLogin}>Sign In</button>
          </div>
        }
        
        <h1>Пользователь 
          {
            userSession.IsAuth 
            ? ` Авторизован ${userSession.user.email}` 
            : " Не авторизован"
          }
        </h1>

        <button className="main-button" onClick={() => userSession.test()}>test</button>
      </div>
      <div className="profile-tab">Profile</div>
    </div>
  );
};

export default observer(Main);