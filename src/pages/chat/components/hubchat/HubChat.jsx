import React, {useEffect, useRef} from 'react';
import {useRoom} from "../../context/RoomContext";
import HubVideo from "../hubvideo/HubVideo";
import HubMessageChat from "../hubmessagechat/HubMessageChat";
import {useConnection} from "../../context/ConnectionContext";
import * as signalR from "@microsoft/signalr";
import "./HubChat.css";
import {useConnectionId} from "../../context/ConnectionIdContext";
import {useEmail} from "../../context/EmailContext";
import {useNavigate} from "react-router-dom";
import {mainPath} from "../../../../static/Paths";
import {addAnswer, addIceCandidate, createAnswer, createOffer, createRTC} from "../../static/RTCActions";
import {MdMic, MdMicOff, MdOutlineHeadset, MdOutlineHeadsetOff} from "react-icons/md";
import {CONNECTION_URL} from "../../../../static/Urls";

const constraints = {
    audio: true, // We want an audio track
    video: true, // And we want a video track
}

const HubChat = () => {
    const navigate = useNavigate()

    const connection = useConnection();
    const {room, setRoom} = useRoom();
    const [connectionId, setConnectionId] = useConnectionId();
    const {email, setEmail} = useEmail();

    const isFirstEstablishment = useRef(false)
    const isLeftPerson = useRef(false)

    const peerConnection = useRef(null) // my RTCPeerConnection
    const myIceCandidates = useRef([])

    const localMediaStream = useRef(null) // my local media stream

    const localVideo = useRef(null) // my video
    const remoteVideo = useRef(new MediaStream()) // peer video

    const messageChatRef = useRef(null);

    useEffect(() => {
        console.log(connection.current)
        connection.current = new signalR.HubConnectionBuilder()
            .withUrl(CONNECTION_URL)
            .withAutomaticReconnect()
            .build();

        const f = async () => {
            await connection.current.start()

            connection.current.on('id', (responseId) => setConnectionId(responseId))
            connection.current.on('onReceiveMessage', (message) => {
                messageChatRef.current.updateMessageList(message);
            });

            await connection.current.invoke('GetId')
        }

        f().then()
        setEmail(localStorage.getItem('email'))
    }, []);

    // type can be ['offer', 'answer', 'candidate', 'relay-ice', '']
    const handleInfoFromPeer = async (roomId, message, type) => {
        if (!room) {
            setRoom(roomId)
        }
        console.log('Type: ', type)

        if (type === 'offer') {
            await createRTC(roomId, peerConnection, localMediaStream, localVideo, remoteVideo, myIceCandidates, constraints)
            await createOffer(roomId, peerConnection, connection)
        }

        if (type === 'answer') {
            await createRTC(roomId, peerConnection, localMediaStream, localVideo, remoteVideo, myIceCandidates, constraints)
            await createAnswer(message, roomId, peerConnection, connection)
        }

        if (type === 'confirmAnswer') {
            await addAnswer(message, roomId, peerConnection, connection)
        }

        if (type === 'relay-ice') {
            // console.log('MyIceCandidates:', myIceCandidates.current.length)
            await connection.current.invoke('OnIceCandidate',
                roomId,
                JSON.stringify(myIceCandidates))
            // console.log('OnIceCandidate was invoked:', myIceCandidates.current, roomId)
        }

        if (type === 'candidate') {
            if (peerConnection.current) {
                await addIceCandidate(message, peerConnection)
            }
        }

        if (type === 'leave-room' || type === 'next-room') {
            if (type === 'leave-room') {
                await stopMyAudioAndVideoTracks();
            }
            messageChatRef.current.clearMessageList();
            await stopAudioAndVideoTracks();
            if (!isLeftPerson.current) {
                await connection.current.invoke('FindRoom', connectionId, email)
            }
        }

        localVideo.current.muted = true;
    }

    const stopMyAudioAndVideoTracks = async () => {
        if (localVideo.current.srcObject) {
            const tracks = localVideo.current.srcObject.getTracks();

            tracks.forEach(track => {
                track.stop();
            });

            // Remove the stream from the video element
            localVideo.current.srcObject = null;
        }
    }

    const stopAudioAndVideoTracks = async () => {
        if (remoteVideo.current.srcObject) {
            const tracks = remoteVideo.current.srcObject.getTracks();

            tracks.forEach(track => {
                track.stop();
            });

            // Remove the stream from the video element
            remoteVideo.current.srcObject = null;
        }
        peerConnection.current = null;
        myIceCandidates.current = [];
    }

    const findRoom = async () => {
        if (!isFirstEstablishment.current) {
            connection.current.on('PeerConnection', handleInfoFromPeer);
            isFirstEstablishment.current = true;
        }
        await connection.current.invoke('FindRoom', connectionId, email);
    }

    const leaveHub = async () => {
        // console.log('Leaving room')
        isLeftPerson.current = true
        await connection.current.invoke('OnLeaveRoom')
        navigate(mainPath)
    }

    const nextRoom = async () => {
        console.log('NextRoom was invoked')
        await connection.current.invoke('OnNextRoom')
    }

    const muteSelf = async () => {
        localVideo.current.srcObject.getTracks()[0].enabled = false;
    }

    const unmuteSelf = async () => {
        localVideo.current.srcObject.getTracks()[0].enabled = true;
    }

    return (<>
        <div className="media-container">
            <div className={room ? "hub-video-container" : "hub-video-container full"}>
                <HubVideo
                    localVideo={localVideo}
                    remoteVideo={remoteVideo}
                    muteSelf={muteSelf}
                    unmuteSelf={unmuteSelf}
                />
                {!room ? <div className="button-container">
                    <button onClick={findRoom}>Find room</button>
                </div> : <div className="button-container">
                    <button onClick={nextRoom}>Next</button>
                    <button onClick={leaveHub}>Finish</button>
                </div>}
            </div>
            {room && <div className="chat-container">
                <HubMessageChat ref={messageChatRef}/>
                <div className="button-container">
                    <button>Fight</button>
                </div>
            </div>}
        </div>
    </>);
};

export default HubChat;