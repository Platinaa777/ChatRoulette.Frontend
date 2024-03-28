import '../styles/hub.css'
import {React, useEffect, useRef, useState, useContext} from 'react'
// import connection from '../sockets/ChatConnection'
import { useNavigate } from 'react-router-dom'
import {Context} from "../../index.js"
import { observer } from 'mobx-react-lite'
import * as signalR from "@microsoft/signalr";
import {useUser} from "../../context/UserContext";


const servers = {
    iceServers:[
        {
            urls:['stun:stun.1und1.de:3478', 'stun:stun.gmx.net:3478']
        },
    ],
    iceCandidatePoolSize: 10
}

const constraints = {
    audio: true, // We want an audio track
    video: true, // And we want a video track
}

const Hub = () => {
    const navigate = useNavigate();
    const isFirstEstablishment = useRef(false)
    const isLeftPerson = useRef(false)
    const {userSession} = useUser()
    
    const [email, setEmail] = useState('')
    const [connectionId, updateConnectionId] = useState('')
    const [room, updateRoom] = useState('')
    const [listMessages, updateList] = useState([])
    const [message, setMessage] = useState('')

    const connection = useRef(null)

    const peerConnection = useRef(null) // my RTCPeerConnection
    const localMediaStream = useRef(null) // my local media stream
    const myIceCandidates = useRef([])

    const localVideo = useRef(null) // my video
    const remoteVideo = useRef(new MediaStream()) // peer video

    useEffect(() => {
        connection.current = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:8003/my-chat")
        .withAutomaticReconnect()
        .build();

        const f = async () => {
            await connection.current.start()

            connection.current.on('id', (responseId) => updateConnectionId(responseId))
            connection.current.on('onReceiveMessage', (message) => {
                updateList(listMessages => [...listMessages, message])
            })

            connection.current.invoke('GetId')
        }
        
        f()
        setEmail(localStorage.getItem('email'))
    }, [])

    const findRoom = async () => {
        if (!isFirstEstablishment.current) {
            connection.current.on('PeerConnection', handleInfoFromPeer);
            isFirstEstablishment.current = true;
        }
        await connection.current.invoke('FindRoom', connectionId, email);
    }

    // type can be ['offer', 'answer', 'candidate', 'relay-ice', '']
    const handleInfoFromPeer = async (roomId, message, type) => {
        if (!room) {
            updateRoom(roomId)
        }
        // console.log('MyIceCandidates', myIceCandidates.current.length)

        if (type === 'offer') {
            await createRTC(roomId)
            await createOffer(roomId)
        }

        if (type === 'answer') {
            await createRTC(roomId)
            await createAnswer(message, roomId)
        }

        if (type === 'confirmAnswer') {
            await addAnswer(message, roomId)
        }

        if (type === 'relay-ice') {
            // console.log('MyIceCandidates:', myIceCandidates.current.length)
            await connection.current.invoke('OnIceCandidate', roomId, JSON.stringify(myIceCandidates))
            // console.log('OnIceCandidate was invoked:', myIceCandidates.current, roomId)
        }

        if (type === 'candidate') {
            if (peerConnection.current) {
                await addIceCandidate(message, roomId)
            }
        }

        if (type === 'leave-room') {
            updateList([])
            await stopAudioAndVideoTracks();
            if (!isLeftPerson.current) {
                connection.current.invoke('FindRoom', connectionId, email)
            }
        }

        if (type === 'next-room') {
            updateList([])
            await stopAudioAndVideoTracks();
            if (!isLeftPerson.current) {
                connection.current.invoke('FindRoom', connectionId, email)
            }
        }
    }

    const createOffer = async (roomId) => {
        const offer = await peerConnection.current.createOffer()
        await peerConnection.current.setLocalDescription(offer)
        await connection.current.invoke('OnPeerOffer', roomId, JSON.stringify(offer))
        // console.log('Offer: ', offer)
    }

    const createAnswer = async (offerJson, roomId) => {
        const offer = JSON.parse(offerJson)
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer))
        const answer = await peerConnection.current.createAnswer()
        await peerConnection.current.setLocalDescription(answer)
        await connection.current.invoke('OnPeerAnswer', roomId, JSON.stringify(answer))
        // console.log('Answer: ', answer)
    }

    const addAnswer = async (answerJson, roomId) => {
        const answer = JSON.parse(answerJson)
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer))
        await connection.current.invoke('OnStartRelayIce', roomId)
        // console.log('Confirm answer', answer)
    }

    const addIceCandidate = async (iceJson, roomId) => {
        const ices = JSON.parse(iceJson)
        // console.log('GetIceCandidates', ices.current.length)
        ices.current.forEach(ice => {
            peerConnection.current.addIceCandidate(new RTCIceCandidate(ice))
            // console.log('Ice candidate was added', ice)
        })
    }

    const stopAudioAndVideoTracks = async () => {
        peerConnection.current = null;
        myIceCandidates.current = [];

        if (remoteVideo.current.srcObject) {
            const tracks = remoteVideo.current.srcObject.getTracks();

            tracks.forEach(track => {
                track.stop();
            });

            // Remove the stream from the video element
            remoteVideo.current.srcObject = null;
        }
    }

    const leaveHub = async () => {
        // console.log('Leaving room')
        isLeftPerson.current = true
        await connection.current.invoke('OnLeaveRoom')
        navigate('/main')
    }

    const nextRoom = async () => {
        console.log('NextRoom was invoked')
        await connection.current.invoke('OnNextRoom')
    }

    const createRTC = async (roomId) => {
        peerConnection.current = new RTCPeerConnection(servers)
        localMediaStream.current = await navigator.mediaDevices.getUserMedia(constraints)

        localVideo.current.srcObject = localMediaStream.current

        peerConnection.current.ontrack = (event) => {
            // console.log('Remote stream was accepted', event.streams)
            if (event.streams && event.streams[0] && !remoteVideo.current.srcObject) {
                remoteVideo.current.srcObject = event.streams[0];
                // console.log('Remote stream was established')
            }
        }

        peerConnection.current.onicecandidate = async (event) => {
            if (event.candidate) {
                myIceCandidates.current.push(event.candidate)
            }
        }

        localMediaStream.current.getTracks().forEach(track => {
            // console.log('Push my track to another peer:', track)
            peerConnection.current.addTrack(track, localMediaStream.current);
        })
    }

    const sendMessage = async () => {
        if (email) {
            await connection.current.invoke('SendMessageInRoom', message, room, email);
        }
    }

    const muteMe = async () => {
        localVideo.current.muted = !localVideo.current.muted;
    }

    const mutePeer = async () => {
        remoteVideo.current.muted = !remoteVideo.current.muted;
    }

    return (
        <div key={1}>
            <div className="container">
                <div className="header">Hub Page</div>
                <div className="connection-id">Connection ID: {connectionId}</div>
                <div className="info">
                    <p>Your email: {email}</p>
                    <p>Your room ID: {room}</p>
                </div>
                {/* <div className="input-section">
                    <p>Input your email</p>
                    <input className="email-input" onChange={(event) => setEmail(event.target.value)} />
                </div> */}
            </div>
            

            { room ?
                <div>
                    <div className="input-container">
                        <p>Input your message</p>
                        <input className="custom-input" onChange={(e) => setMessage(e.target.value)} />
                    </div>

                    <div className="button-container">
                        <button className='beatiful-button' onClick={sendMessage}>Push</button>
                    </div>
                    <div className="message-container">
                        {
                            listMessages.map((val, index) => 
                            <div className="styled-message" key={index}>{val}</div>)
                        }
                    </div>  
                </div>
            : 
            ""}

            <div className="video-container">
                <div className="video-wrapper">
                    <p>Me</p>
                    <video id="localVideo" ref={localVideo} muted autoPlay></video>
                    <button className='mute-button' onClick={muteMe}>Mute me</button>
                </div>
                <div className="video-wrapper">
                    <p>Peer</p>
                    <video id="remoteVideo"ref={remoteVideo} muted autoPlay></video>
                    <button className='mute-button' onClick={mutePeer}>Mute peer</button>
                </div>
            </div>
            <div className="button-container">
                <button className='beatiful-button' onClick={findRoom}>Find room</button>
            </div>

            <button className='stop-button' onClick={leaveHub}>Finish</button>
            <button className='next-button' onClick={nextRoom}>Next</button>
        </div>
    );
}

export default observer(Hub);