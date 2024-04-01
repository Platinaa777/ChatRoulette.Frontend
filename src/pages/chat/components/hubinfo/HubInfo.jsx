import React from 'react';
import {useConnectionId} from "../../context/ConnectionIdContext";
import {useEmail} from "../../context/EmailContext";
import {useRoom} from "../../context/RoomContext";
import "./HubInfo.css";

const HubInfo = () => {
    const [connectionId, setConnectionId] = useConnectionId();
    const {email} = useEmail();
    const {room} = useRoom();
    return (
        <>
            <h1>Hub Page</h1>
            <div className="info">
                <p>Connection ID: {connectionId}</p>
                <p>Your email: {email}</p>
                <p>Your room ID: {room}</p>
                {/**<div className="input-section">
                 <p>Input your email</p>
                 <input className="email-input" onChange={(event) => setEmail(event.target.value)} />
                 </div> */}
            </div>
        </>
    );
};

export default HubInfo;