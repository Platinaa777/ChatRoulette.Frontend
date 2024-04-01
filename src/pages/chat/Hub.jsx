import './Hub.css'
import React from 'react'
// import connection from '../sockets/ChatConnection'
import {observer} from 'mobx-react-lite'
import {HubProvider} from "./context/HubContext";
import HubInfo from "./components/hubinfo/HubInfo";
import HubChat from "./components/hubchat/HubChat";

const Hub = () => {

    return (<HubProvider>
        <div className="hub-container">
            <div className="hub-info-container">
                <HubInfo/>
            </div>
            <div className="hub-chat-container">
                <HubChat/>
            </div>
        </div>
    </HubProvider>);
}

export default observer(Hub);