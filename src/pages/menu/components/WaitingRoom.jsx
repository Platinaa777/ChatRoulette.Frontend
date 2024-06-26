import React from "react";
import {useNavigate} from 'react-router-dom'
import {observer} from "mobx-react-lite";
import {useSession} from "../../../http/context/UserContext";

const WaitingRoom = () => {
    const {userSession} = useSession()
    const navigate = useNavigate();

    const redirectToMainWithLogout = () => userSession.logout().then(() => navigate("/"))

    return (<div>
        Waiting room...
        <button className="main-button" onClick={() => userSession.test()}>test</button>
        <button className="main-button" onClick={redirectToMainWithLogout}>Logout</button>
    </div>);
}

export default observer(WaitingRoom);