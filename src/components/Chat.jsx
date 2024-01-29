import '../styles/video.css';
import React, { useState, useEffect } from 'react'; 
import * as signalR from "@microsoft/signalr";

const Chat = () => {
    const [hubConnection, setHubConnection] = useState(null);
    const [email, setEmail] = useState('');
    const [chat, setChat] = useState([])
    const [connectionId, setConnectionId] = useState('')
    const [room, setRoom] = useState('')
    const [isHost, setIsHost] = useState(false)
    const [offer, setOffer] = useState('')
    let [localConnection, setLocalConnection] = useState('')
    let [sendChannel, setSendChannel] = useState('')


    const generateHostCredentials = async () => {
        setLocalConnection(new RTCPeerConnection())

    }

    const createChannel = async () => {
        localConnection.onicecandidate = e =>  {
            console.log(" NEW ice candidate!! on localconnection reprinting SDP " )
            console.log(JSON.stringify(localConnection.localDescription))
        }
        setSendChannel(localConnection.createDataChannel("sendChannel"))
    }

    const configureChannel = async () => {
        sendChannel.onmessage =e =>  console.log("messsage received!!!"  + e.data )
        sendChannel.onopen = e => console.log("open!!!!");
        sendChannel.onclose =e => console.log("closed!!!!!!");

        console.log("start")
        let a
        await localConnection.createOffer().then(o => {
            setOffer(o)
            a = o
        })
        console.log("end")
        console.log(a)
        return a
    }

    const generatePeerCreadentials = async () => {
        localConnection.onicecandidate = e =>  {
            console.log(" NEW ice candidnat!! on localconnection reprinting SDP " )
            console.log(JSON.stringify(localConnection.localDescription) )
        }
        localConnection.ondatachannel= e => {
            const receiveChannel = e.channel;
            receiveChannel.onmessage = e =>  console.log("messsage received!!!"  + e.data )
            receiveChannel.onopen = e => console.log("open!!!!");
            receiveChannel.onclose = e => console.log("closed!!!!!!");
            localConnection.channel = receiveChannel;
        }
        localConnection.setRemoteDescription(JSON.parse(offer)).then(a => console.log("done"))

        let answer = ""
        await localConnection.createAnswer().then(a => {
            localConnection.setLocalDescription(a)
            answer = a
        })
        console.log(answer)
        return answer
    };

    const initializeHubConnection = async () => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:8003/chat")
            .build();
        
        await connection.start();
        setHubConnection(connection);
        connection.invoke("GetConnectionId")
    };

    useEffect(() => {
        generateHostCredentials().then(() => createChannel().then(() => configureChannel().then(() => initializeHubConnection().then(() => {
            // receiving messages
            hubConnection.on('Receive', (message) => {
                console.log(message)
                setChat((prevChat) => [...prevChat, message]);
            });

            hubConnection.on('HostPort', (message, roomId) => {
                console.log(message)
                console.log(offer)
                hubConnection.invoke("GetOfferFromHost", roomId, JSON.stringify(offer))
            });

            hubConnection.on("PeerPort", (offer, roomId) => {
                generatePeerCreadentials(offer).then((answer) => {
                    console.log(`asnwer = ${answer}`)
                    console.log(`room = ${roomId}`)
                    hubConnection.invoke("TransportAnswer", roomId, JSON.stringify(answer))
                })
            });

            hubConnection.on("GetAnswerFromPeer", (answer) => {
                console.log(`asnwer = ${answer}`)
                localConnection.setRemoteDescription(JSON.parse(answer)).then(a=>console.log("done"))
                sendChannel.send("hello")
            });
            
            hubConnection.on("Notify", (message) => {
                console.log(message)
            })
            
            // get connection id
            hubConnection.on("GettingConnId", (id) => {
                setConnectionId(id)
                console.log("id = " + id)
            })
        }))))}, []);    

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

                // ping from participant client side
                console.log(data.isHost)
                if (!data.isHost) {
                    hubConnection.invoke("PingFromPeer", data.roomId)
                }
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
                <div>
                    <button onClick={() => joinRoom()}>Join Free Room</button>
                </div>
                <div>
                    <button onClick={() => sendMessage()}>Send Message</button>
                </div>
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

export default Chat;
