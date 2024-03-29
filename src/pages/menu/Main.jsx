import React from "react";
import "./Main.css";
import {observer} from "mobx-react-lite";
import {useUser} from "../../context/UserContext";

const Main = () => {
    const {userSession} = useUser();

    React.useEffect(() => {
        if (!localStorage.getItem('access-token')) {
            userSession.checkAuth().then()
        } else {
            console.log(localStorage.getItem('email'))
            userSession.setAuth(true)
            userSession.setUser({email: localStorage.getItem('email')})
        }
    })

    return (<div className="main-container">
        <button className="main-button" onClick={() => userSession.test()}>test</button>
    </div>);
};

export default observer(Main);