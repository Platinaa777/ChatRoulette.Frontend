import '../styles/video.css';
import React, { useState, useEffect } from 'react'; 
import * as signalR from "@microsoft/signalr";

const Video = () => {
    const [hubConnection, setHubConnection] = useState(null);
    const [email, setEmail] = useState('');
    const [chat, setChat] = useState([])
    const [connectionId, setConnectionId] = useState('')
    const [room, setRoom] = useState('')
    const [isHost, setIsHost] = useState(false)

    useEffect(() => {

        const initializeHubConnection = async () => {
            const connection = new signalR.HubConnectionBuilder()
                .withUrl("http://localhost:8003/chat")
                .build();
            
            // receiving messages
            connection.on('Receive', (message) => {
                console.log(message)
                setChat((prevChat) => [...prevChat, message]);
            });
            
            // get connection id
            connection.on("GettingConnId", (id) => {
                setConnectionId(id)
                console.log("id = " + id)
            })

            await connection.start();
            setHubConnection(connection);
            connection.invoke("GetConnectionId")
        };

        initializeHubConnection();
        
    }, []);

    const sendMessage = () => {
        if (hubConnection && room) {
            hubConnection.invoke("Send", email, room)
        }
    }

    const joinRoom = async () => {
        const postData = {
            email: email,
            connectionId: connectionId
        }

        fetch('http://localhost:8003/chat/join-room', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
            }).then(response => {
                if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            }).then(data => {
                if (data.isHost) {
                    setIsHost(true)
                }
                console.log('POST request successful:', data);

                setRoom(data.roomId)
            }).catch(error => {
                console.error('Error during POST request:', error);
            });
    }

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    }

    return (
        <div className="container">
            <div className="input-section">
                <label htmlFor="messageInput">Input email</label>
                <input
                    type="text"
                    id="messageInput"
                    value={email}
                    onChange={handleInputChange}
                />
                <button onClick={() => joinRoom()}>Join Free Room</button>
                <button onClick={() => sendMessage()}>Send Message</button>
            </div>
            <div className="chat-section">
                <ul className="message-list">
                    {chat.map((message, index) => (
                        <li key={index} className="message-item">{message}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Video;
