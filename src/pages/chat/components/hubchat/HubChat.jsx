import React, { useEffect, useRef } from 'react';
import { useRoom } from "../../context/RoomContext";
import HubVideo from "../hubvideo/HubVideo";
import HubMessageChat from "../hubmessagechat/HubMessageChat";
import { useConnection } from "../../context/ConnectionContext";
import * as signalR from "@microsoft/signalr";
import { useConnectionId } from "../../context/ConnectionIdContext";
import { useEmail } from "../../context/EmailContext";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../../static/Paths";
import { addAnswer, addIceCandidate, createAnswer, createOffer, createRTC } from "../../static/RTCActions";
import { CONNECTION_URL } from "../../../../static/Urls";

const constraints = {
    audio: true, // We want an audio track
    video: true, // And we want a video track
}

// export const configuration = {
//     iceServers: [{
//         urls: ['stun:stun.1und1.de:3478', 'stun:stun.gmx.net:3478']
//     },], iceCandidatePoolSize: 10
// };
export const configuration = {
    iceServers: [
        // {
        //     urls: 'turn:numb.viagenie.ca',
        //     credential: 'muazkh',
        //     username: 'webrtc@live.com'
        // },
        // {
        //     urls: 'turn:192.158.29.39:3478?transport=udp',
        //     credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        //     username: '28224511:1379330808'
        // },
        {
            urls: 'turn:192.158.29.39:3478?transport=tcp',
            credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            username: '28224511:1379330808'
        },
        // {
        //     urls: 'turn:turn.bistri.com:80',
        //     credential: 'homeo',
        //     username: 'homeo'
        // },
        {
            urls: 'turn:turn.anyfirewall.com:443?transport=tcp',
            credential: 'webrtc',
            username: 'webrtc'
        }
    ],
    iceCandidatePoolSize: 10
};



const HubChat = () => {
    const navigate = useNavigate()

    const connection = useConnection();
    const { room, setRoom } = useRoom();
    const [connectionId, setConnectionId] = useConnectionId();
    const { email, setEmail } = useEmail();

    const isFirstEstablishment = useRef(false)
    const isLeftPerson = useRef(false)

    const peerConnection = useRef(null) // my RTCPeerConnection
    const myIceCandidates = useRef([])

    const localMediaStream = useRef(null) // my local media stream

    const localVideo = useRef(null) // my video
    const remoteVideo = useRef(new MediaStream()) // peer video

    const messageChatRef = useRef(null);

    useEffect(() => {

        connection.current = new signalR.HubConnectionBuilder()
            .withUrl(CONNECTION_URL)
            .withAutomaticReconnect()
            .build();

        // console.log(connection.current)

        const f = async () => {
            await connection.current.start()

            connection.current.on('id', (responseId) => setConnectionId(responseId))
            connection.current.on('onReceiveMessage', (message) => {
                messageChatRef.current.updateMessageList(message);
            });

            await connection.current.invoke('GetId')
        }

        f()
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

    const createRTC = async (roomId, peerConnection, localMediaStream, localVideo, remoteVideo, myIceCandidates, constraints) => {
        // console.log("before")
        peerConnection.current = new RTCPeerConnection(configuration)
        // console.log("after")
        // console.log(peerConnection.current)
        try {
            localMediaStream.current = await navigator.mediaDevices.getUserMedia(constraints)
        } catch (e) {
            console.log(e)
        }
        
        // console.log('LocalMediaStream', localMediaStream)
        localVideo.current.srcObject = localMediaStream.current

        peerConnection.current.ontrack = (event) => {
            // console.log('Remote stream was accepted', event.streams)
            if (event.streams && event.streams[0] && !remoteVideo.current.srcObject) {
                remoteVideo.current.srcObject = event.streams[0];
                // console.log('Remote stream was established')
            }
        }
        // console.log('on track', localMediaStream)

        peerConnection.current.onicecandidate = async (event) => {
            if (event.candidate) {
                myIceCandidates.current.push(event.candidate)
            }
        }
        // console.log('on ice')

        localMediaStream.current.getTracks().forEach(track => {
            console.log('Push my track to another peer:', track)
            peerConnection.current.addTrack(track, localMediaStream.current);
        })
        // console.log('End of create RTC ')
    };

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
        console.log('FindRoom was buttoned')
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
        navigate(paths.mainPath)
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
        <div className="w-full h-full flex flex-col">
            <div className={"h-[90%] relative flex w-full justify-center"}>
                <div className={'flex flex-col h-full mr-2 ' + (room ? "w-[70%]" : "w-full")}>
                    <HubVideo
                        localVideo={localVideo}
                        remoteVideo={remoteVideo}
                        muteSelf={muteSelf}
                        unmuteSelf={unmuteSelf}
                    />
                </div>
                {room && <div className="w-[30%] h-full flex flex-col">
                    <HubMessageChat ref={messageChatRef} />
                </div>}
            </div>
            <div className={`flex h-[10%] ${room ? 'justify-between' : 'justify-center'} w-full items-center`}>
                {/*<div className='w-[70%]'>*/}
                {!room ?
                    <button onClick={findRoom} className='min-w-20 rounded-[20px] bg-indigo-600 text-white p-2 px-4'>Find room</button>
                    : <>
                        <button onClick={nextRoom} className='w-[70%] mr-2 rounded-[10px] bg-indigo-600 text-white p-2 px-4'>Next</button>
                        <button onClick={leaveHub} className='w-[30%] rounded-[10px] bg-indigo-600 text-white p-2 px-4'>Finish</button>
                    </>}
                {/*<div className='w-[30%]'>
                    {room && <div className="button-container">
                        <button>Fight</button>
                    </div>}
                </div>*/}
            </div>
        </div>
    </>);
};

export default HubChat;