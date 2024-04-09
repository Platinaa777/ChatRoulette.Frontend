import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useEmail} from "../../context/EmailContext";
import {useConnection} from "../../context/ConnectionContext";
import {useRoom} from "../../context/RoomContext";
import "./HubMessageChat.css"
import {BiSend} from "react-icons/bi";
import {FiSend} from "react-icons/fi";
import {BsSend} from "react-icons/bs";
import {IoSend} from "react-icons/io5";

const HubMessageChat = forwardRef((props, ref) => {

    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    const connection = useConnection();
    const {email, setEmail} = useEmail();
    const {room, setRoom} = useRoom();


    useImperativeHandle(ref, () => {
        return {
            updateMessageList(message) {
                setMessageList(messageList => [...messageList, {
                    email: message.split(":")[0],
                    text: message.split(":").pop().substring(1)
                }])
            },
            clearMessageList() {
                setMessageList([])
            }
        }
    }, []);

    const sendMessage = async () => {
        if (email) {
            await connection.current.invoke('SendMessageInRoom', message, room, email);
            setMessage("");
        }
    }

    return (<>
        <div className="message-container">
            {messageList.length === 0 ? "Empty yet..." : messageList.map((val, index) =>
                <div className="message-box">
                    <div className={`message ${val.email === email ? "mine" : "other"}`} key={index}>
                        <p className="message-sender">{val.email}</p>
                        <p className="message-text">{val.text}</p>
                    </div>
                </div>
            )
            }
        </div>
        <div className="input-container">
            <input
                placeholder="Your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter")
                        sendMessage().then()
                }}/>
            <button onClick={sendMessage}><IoSend/></button>
        </div>
    </>);
});

export default HubMessageChat;