import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useEmail} from "../../context/EmailContext";
import {useConnection} from "../../context/ConnectionContext";
import {useRoom} from "../../context/RoomContext";
import "./HubMessageChat.css"

const HubMessageChat = forwardRef((props, ref) => {

    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    const connection = useConnection();
    const {email, setEmail} = useEmail();
    const {room, setRoom} = useRoom();


    useImperativeHandle(ref, () => {
        return {
            updateMessageList(message) {
                setMessageList(messageList => [...messageList, message])
            },
            clearMessageList() {
                setMessageList([])
            }
        }
    }, []);

    const sendMessage = async () => {
        if (email) {
            await connection.current.invoke('SendMessageInRoom', message, room, email);
        }
    }

    return (<>
        <div className="message-container">
            {messageList.length === 0 ? "Empty yet..." : messageList.map((val, index) => <div
                className="styled-message" key={index}>{val}</div>)}
        </div>
        <div className="input-container">
            <p>Input your message</p>
            <input className="custom-input" onChange={(e) => setMessage(e.target.value)}/>
            <button className='beatiful-button' onClick={sendMessage}>Push</button>
        </div>
    </>);
});

export default HubMessageChat;