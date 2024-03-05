import '../styles/hub.css'
import {React, useEffect, useRef, useState } from 'react'
import connection from '../sockets/ChatConnection'

const servers = {
    iceServers:[
        {
            urls:['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
        },
    ],
    iceCandidatePoolSize: 10
}

export const Hub = () => {
    const [email, setEmail] = useState('')
    const [connectionId, updateConnectionId] = useState('')
    const [room, updateRoom] = useState('')
    const [listMessages, updateList] = useState([])
    const [message, setMessage] = useState('')

    const peerConnection = useRef(null) // my RTCPeerConnection
    const localMediaStream = useRef(null) // my local media stream
    const myIceCandidates = useRef([])

    const localVideo = useRef(null) // my video
    const remoteVideo = useRef(null) // peer video

    useEffect(() => {
        connection.on('id', (responseId) => updateConnectionId(responseId))
        connection.on('onReceiveMessage', (message) => {
            updateList(listMessages => [...listMessages, message])
        })

        connection.invoke('GetId')
        
    }, [])

    const findRoom = async () => {
        connection.on('PeerConnection', handleInfoFromPeer);
        await connection.invoke('FindRoom', connectionId, email);
    }

    // type can be ['offer', 'answer', 'candidate', 'relay-ice', '']
    const handleInfoFromPeer = async (roomId, message, type) => {
        // console.log('Type: ', type)
        // console.log("Room: ", roomId)
        if (!room) {
            
            updateRoom(roomId)
        }

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
            // console.log('MyIces: ', myIceCandidates)
            await connection.invoke('OnIceCandidate', roomId, JSON.stringify(myIceCandidates))
        }

        if (type === 'candidate') {
            if (peerConnection.current) {
                await addIceCandidate(message, roomId)
            }
        }
    }

    const createOffer = async (roomId) => {
        const offer = await peerConnection.current.createOffer()
        await peerConnection.current.setLocalDescription(offer)
        await connection.invoke('OnPeerOffer', roomId, JSON.stringify(offer))
        // console.log('Offer: ', offer)
    }

    const createAnswer = async (offerJson, roomId) => {
        const offer = JSON.parse(offerJson)
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer))
        const answer = await peerConnection.current.createAnswer()
        await peerConnection.current.setLocalDescription(answer)
        await connection.invoke('OnPeerAnswer', roomId, JSON.stringify(answer))
        // console.log('Answer: ', answer)
    }

    const addAnswer = async (answerJson, roomId) => {
        if (!peerConnection.current.currentRemoteDescription) {
            const answer = JSON.parse(answerJson)
            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer))
            await connection.invoke('OnStartRelayIce', roomId)
            // console.log('Confirm answer', answer)
        }
    }

    const addIceCandidate = async (candidatesJson, roomId) => {
        const candidates = JSON.parse(candidatesJson)
        // console.log('GetIceCandidates', candidates)

        candidates.current.forEach((iceCandidate) => {
            if (iceCandidate) {
                console.log('NewIceCandidate', iceCandidate)
                peerConnection.current.addIceCandidate(new RTCIceCandidate(iceCandidate))
                // console.log('NewIceCandidate was added')
            }
        })
    }

    const createRTC = async (roomId) => {
        peerConnection.current = new RTCPeerConnection(servers)
        remoteVideo.current = new MediaStream();

        localMediaStream.current = await navigator.mediaDevices.getUserMedia(
            {audio: true,video: true})

        localVideo.current.srcObject = localMediaStream.current

        peerConnection.current.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                // console.log('New TRACK from remote peer:', track)
                remoteVideo.current.addTrack(track)
            })
        }

        peerConnection.current.onicecandidate = async (event) => {
            if (event.candidate && roomId) {
                console.log('Generated ice', event.candidate)
                // console.log('IceCandidate', event.candidate, roomId)
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
            await connection.invoke('SendMessageInRoom', message, room, email);
        }
    }

    const getInfo = async () => {
        console.log(localVideo)
        console.log(remoteVideo)
    }

    return (
        <div key={1}>
            <button onClick={getInfo} style={{width:'100px', height:'60px', backgroundColor:'blue'}}>
                    get info about peerConnection 
            </button>
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
                <video ref={localVideo} autoPlay></video>
                <p>Peer</p>
                <video ref={remoteVideo} autoPlay></video>
            </div>
            <div>
                <button onClick={findRoom} style={{width:'100px', height:'60px', backgroundColor:'green'}}>Find room</button>
            </div>
        </div>
    );
}
