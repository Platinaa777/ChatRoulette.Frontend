import React from "react";
import "../main.css";
import {useNavigate} from 'react-router-dom'
import {observer} from "mobx-react-lite";
import {useUser} from "../../auth/context/UserContext";

const WaitingRoom = () => {
    const {userSession} = useUser()
    const navigate = useNavigate();

    const redirectToMainWithLogout = () => userSession.logout().then(() => navigate("/"))

    return (<div>
        Waiting room...
        <button className="main-button" onClick={() => userSession.test()}>test</button>
        <button className="main-button" onClick={redirectToMainWithLogout}>Logout</button>
    </div>);
}

export default observer(WaitingRoom);