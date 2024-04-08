import {servers} from "./Servers";

export const createRTC = async (roomId, peerConnection, localMediaStream, localVideo, remoteVideo, myIceCandidates, constraints) => {
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
};

export const createOffer = async (roomId, peerConnection, connection) => {
    const offer = await peerConnection.current.createOffer()
    await peerConnection.current.setLocalDescription(offer)
    await connection.current.invoke('OnPeerOffer', roomId, JSON.stringify(offer))
    // console.log('Offer: ', offer)
};

export const createAnswer = async (offerJson, roomId, peerConnection, connection) => {
    const offer = JSON.parse(offerJson)
    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer))
    const answer = await peerConnection.current.createAnswer()
    await peerConnection.current.setLocalDescription(answer)
    // console.log('Answer: ', answer)
    await connection.current.invoke('OnPeerAnswer', roomId, JSON.stringify(answer))
};

export const addAnswer = async (answerJson, roomId, peerConnection, connection) => {
    const answer = JSON.parse(answerJson)
    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer))
    await connection.current.invoke('OnStartRelayIce', roomId)
    // console.log('Confirm answer', answer)
};

export const addIceCandidate = async (iceJson, peerConnection) => {
    const ices = JSON.parse(iceJson)
    // console.log('GetIceCandidates', ices.current.length)
    ices.current.forEach(ice => {
        peerConnection.current.addIceCandidate(new RTCIceCandidate(ice))
        // console.log('Ice candidate was added', ice)
    })
};