import '../styles/video.css';
import React, { useState, useEffect } from 'react'; 
import * as signalR from "@microsoft/signalr";

const Video = () => {
    const [hubConnection, setHubConnection] = useState(null);
    const [email, setEmail] = useState('');
    const [connectionId, setConnectionId] = useState('')

    useEffect(() => {

        const initializeHubConnection = async () => {
            const connection = new signalR.HubConnectionBuilder()
                .withUrl("http://localhost:8003/chat")
                .build();

            connection.on('Receive', (message) => { 
                console.log(message);
            });

            connection.on("GettingConnId", (id) => {
                setConnectionId(id)
                console.log("id = " + id)
            })

            await connection.start();
            setHubConnection(connection);
            console.log("hubConn " + connection);
        };

        initializeHubConnection();
        hubConnection.invoke("GetConnectionId")
    }, []);

    const sendMessage = () => {
        if (hubConnection) {
            hubConnection.invoke("Send", email)
        }
    }

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    }

    return (
        <div className="container">
        <label htmlFor="messageInput">Input email</label>
        <input
            type="text"
            id="messageInput"
            value={email}
            onChange={handleInputChange}
        />
        <br />
        <button onClick={sendMessage}>Send Message</button>
        </div>
    );
};

export default Video;
