export const createOffer = async (roomId, peerConnection, connection) => {
    console.log('started Offer: ')
    
    const offer = await peerConnection.current.createOffer()
    await peerConnection.current.setLocalDescription(offer)
    await connection.current.invoke('OnPeerOffer', roomId, JSON.stringify(offer))
    console.log('Offer: ', offer)
};

export const createAnswer = async (offerJson, roomId, peerConnection, connection) => {
    console.log('started Answer: ')
    const offer = JSON.parse(offerJson)
    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer))
    const answer = await peerConnection.current.createAnswer()
    await peerConnection.current.setLocalDescription(answer)
    console.log('Answer: ', answer)
    await connection.current.invoke('OnPeerAnswer', roomId, JSON.stringify(answer))
};

export const addAnswer = async (answerJson, roomId, peerConnection, connection) => {
    const answer = JSON.parse(answerJson)
    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer))
    await connection.current.invoke('OnStartRelayIce', roomId)
    console.log('Confirm answer', answer)
};

export const addIceCandidate = async (iceJson, peerConnection) => {
    const ices = JSON.parse(iceJson)
    console.log('GetIceCandidates', ices.current.length)
    ices.current.forEach(ice => {
        peerConnection.current.addIceCandidate(new RTCIceCandidate(ice))
        console.log('Ice candidate was added', ice)
    })
};