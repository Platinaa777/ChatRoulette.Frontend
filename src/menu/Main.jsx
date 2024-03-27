import React, {useContext, useEffect} from "react";
import "./main.css";
import {useNavigate} from 'react-router-dom'
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Navbar from "../navbar/Navbar";

const Main = () => {
    const navigate = useNavigate();
    const {userSession} = useContext(Context)

    useEffect(() => {
        if (!localStorage.getItem('access-token')) {
            userSession.checkAuth().then()
        }
    }, [])

    return (<div className="menu-container">
        <Navbar userSession={userSession} navigate={navigate}/>
        <div className="main-container">
            <button className="main-button" onClick={() => userSession.test()}>test</button>
        </div>
    </div>);
};

export default observer(Main);