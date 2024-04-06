import React from 'react';
import {useConnectionId} from "../../context/ConnectionIdContext";
import {useEmail} from "../../context/EmailContext";
import {useRoom} from "../../context/RoomContext";
import "./HubInfo.css";

const HubInfo = () => {
    const [connectionId, setConnectionId] = useConnectionId();
    const {email, setEmail} = useEmail();
    const {room} = useRoom();
    return (
        <>
            <h1>Hub Page</h1>
            <div className="info">
                <p>Connection ID: {connectionId !== "" ? connectionId : "Unknown"}</p>
                <>
                    <label>Your Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </>
                <p>Your room ID: {room !== "" ? room : "Unknown"}</p>
            </div>
        </>
    );
};

export default HubInfo;