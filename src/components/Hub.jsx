import '../styles/hub.css'
import {React, useEffect, useRef, useState } from 'react'
import { ChatConnection } from './ChatConnection';
import { ACTIONS } from './Actions';
import {useSingleton} from '../hooks/useSingleton'

export const Hub = () => {
    const [conn, setConn] = useState('')
    const [email, setEmail] = useState('')
    const [connectionId, updateConnectionId] = useState('')
    const [room, updateRoom] = useState('')
    const [listMessages, updateList] = useState([])
    const [message, setMessage] = useState('')
    const meRTC = useRef(null)
    const peerRTC = useRef(null)
    const remoteVideo = useRef(null)
    
    const localMediaStream = useRef(null)
    const videoRef = useRef(null)

    useEffect(() => {
        ChatConnection().then(async connection => {
                setConn(connection)
                
                connection.on('id', (responseId) => updateConnectionId(responseId))

                connection.on('onReceiveMessage', (message) => {
                    updateList(listMessages => [...listMessages, message])
                })

                

                await connection.invoke('GetId')
            })
    }, [])

    const startCapture = async() => {
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: {width: 1280, height: 720}
        });
        videoRef.current.srcObject = localMediaStream.current
        videoRef.current.play()
    }

    const findRoom = async () => {
        conn.on('onPeerJoinRoom', async (room, isReadyToCommunicate) => {
            updateRoom(room)
            console.log(isReadyToCommunicate)


            if (isReadyToCommunicate) {
                meRTC.current = new RTCPeerConnection()

                const offer = await meRTC.current.createOffer()
                await meRTC.current.setLocalDescription(offer)
                console.log(offer)
                console.log(connectionId)
                await conn.invoke('PeerOffer', connectionId, JSON.stringify(offer))
            }
        })

        await conn.invoke('FindRoom', connectionId, email);
        await startCapture()
    }

    const sendMessage = async () => {
        await conn.invoke('SendMessageInRoom', message, room);
    }

    return (
        <div key={1}>
            <div>Hub page</div>
            <div>Connection id = {connectionId}</div>
            <div>
                <p>Input your email</p>
                <input onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div>
                <p>Your email: {email}</p>
            </div>
            <div>
                <p>Your room id: {room}</p>
            </div>

            { room ?
                <div>
                    <div>
                        <p>Input your message</p>
                        <input onChange={(e) => setMessage(e.target.value) } />
                    </div>
                    <div>
                        <p>Your message: {message}</p>
                    </div>

                    <button onClick={sendMessage} style={{width:'100px', height:'60px', backgroundColor:'blue'}}>
                    send message 
                    </button>
                    
                    {
                        listMessages.map((val, index) => <div key={index}>{val}</div> )
                    }
                </div>
            : 
            ""}

            <video ref={videoRef} muted></video>

            <div>
                <button onClick={findRoom} style={{width:'100px', height:'60px', backgroundColor:'green'}}>Find room</button>
            </div>
        </div>
    );
}
