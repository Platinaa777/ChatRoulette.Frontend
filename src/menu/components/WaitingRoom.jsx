import React, {useContext, useEffect} from "react";
import "../styles/main.css";
import { useNavigate } from 'react-router-dom'
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const WaitingRoom = () => {
    const {userSession} = useContext(Context)
    const navigate = useNavigate();

    const redirectToMainWithLogout = () => {
        userSession.logout()
        navigate("/")
    }

    return (
        <div>
            Waiting room...
            <button className="main-button" onClick={() => userSession.test()}>test</button>
            <button className="main-button" onClick={redirectToMainWithLogout}>Logout</button>
        </div>
    );
}

export default observer(WaitingRoom);