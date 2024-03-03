import '../styles/hub.css'
import {React, useEffect, useRef, useState } from 'react'
import connection from '../sockets/ChatConnection'

var pc_config = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};

export const Hub = () => {
    const [email, setEmail] = useState('')
    const [connectionId, updateConnectionId] = useState('')
    const [room, updateRoom] = useState('')
    const [listMessages, updateList] = useState([])
    const [message, setMessage] = useState('')

    const meRTC = useRef(null) // my RTCPeerConnection
    const localMediaStream = useRef(null) // my local media stream

    const videoRef = useRef(null) // my video
    const remoteVideo = useRef(null) // peer video

    useEffect(() => {
        connection.on('id', (responseId) => updateConnectionId(responseId))
        connection.on('onReceiveMessage', (message) => {
            updateList(listMessages => [...listMessages, message])
        })

        connection.invoke('GetId')    
    }, [])

    useEffect(() => {
        connection.on('onPeerJoinRoom', async (room, isReadyToCommunicate) => {
            updateRoom(room)
            console.log("is ready = " + isReadyToCommunicate)

            meRTC.current = new RTCPeerConnection(pc_config)

            meRTC.current.ontrack = ({streams: [remoteStream]}) => {
                console.log('REMOTE')
                console.log(remoteStream)
                remoteVideo.current = remoteStream;
            };

            meRTC.current.onicecandidate = event => {
                // console.log(event.candidate)
            }

            localMediaStream.current.getTracks().forEach(track => {
                console.log(track)
                meRTC.current.addTrack(track, localMediaStream.current);
            })

            if (isReadyToCommunicate) {
                const offer = await meRTC.current.createOffer()
                await meRTC.current.setLocalDescription(offer)
                
                await connection.invoke('PeerOffer', room, JSON.stringify(offer))
            }
        })

        connection.on('onCreateAnswer', async (offerJson, roomId) => {
            const offer = JSON.parse(offerJson)

            await meRTC.current.setRemoteDescription(new RTCSessionDescription(offer))
            const answer = await meRTC.current.createAnswer()
            await meRTC.current.setLocalDescription(answer)

            await connection.invoke('AnswerFromPeer', JSON.stringify(answer), roomId)
        })

        connection.on('onConfirmAnswer', async (answerJson) => {
            const answer = JSON.parse(answerJson)
            await meRTC.current.setRemoteDescription(new RTCSessionDescription(answer))
        })
    }, [room])
        
    const startCapture = async() => {
        localMediaStream.current = await navigator.mediaDevices.getUserMedia(
            {audio: true,video: true})

        videoRef.current.srcObject = localMediaStream.current
    }

    const findRoom = async () => {
        await startCapture()
        await connection.invoke('FindRoom', connectionId, email); // sends to onPeerJoinRoom
    }

    const sendMessage = async () => {
        if (email) {
            await connection.invoke('SendMessageInRoom', message, room, email);
        }
    }

    const viewReceivers = () => {
        console.log(meRTC.current.getReceivers())
    }

    return (
        <div key={1}>
            <button onClick={viewReceivers} style={{width:'100px'}}></button>
            <div>Hub page</div>
            <div>Connection id = {connectionId}</div>
            <div>
                <p>Your email: {email}</p>
            </div>
            <div>
                <p>Your room id: {room}</p>
            </div>
            <div>
                <p>Input your email</p>
                <input onChange={(event) => setEmail(event.target.value)} />
            </div>
            

            { room ?
                <div>
                    <div>
                        <p>Input your message</p>
                        <input onChange={(e) => setMessage(e.target.value) } />
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

            <div>
                <p>Me</p>
                <video ref={videoRef} muted autoPlay></video>
                <p>Peer</p>
                <video ref={remoteVideo} autoPlay></video>
            </div>
            <div>
                <button onClick={findRoom} style={{width:'100px', height:'60px', backgroundColor:'green'}}>Find room</button>
            </div>
        </div>
    );
}
