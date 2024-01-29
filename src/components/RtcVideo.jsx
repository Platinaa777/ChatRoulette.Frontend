

const RtcVideo = ({isHost, offerRemote}) => {
    if (isHost) {
        const localConnection = new RTCPeerConnection()
        localConnection.onicecandidate = e =>  {
            console.log(" NEW ice candidate!! on localconnection reprinting SDP " )
            console.log(JSON.stringify(localConnection.localDescription))
        }


        const sendChannel = localConnection.createDataChannel("sendChannel");
        sendChannel.onmessage =e =>  console.log("messsage received!!!"  + e.data )
        sendChannel.onopen = e => console.log("open!!!!");
        sendChannel.onclose =e => console.log("closed!!!!!!");

        let offer
        localConnection.createOffer().then(o => {
            localConnection.setLocalDescription(o)
            offer = o 
            console.log(offer)
        })
        return offer
    }
    const offer = offerRemote
    const remoteConnection = new RTCPeerConnection()

    remoteConnection.onicecandidate = e =>  {
        console.log(" NEW ice candidnat!! on localconnection reprinting SDP " )
        console.log(JSON.stringify(remoteConnection.localDescription) )
    }

    
    remoteConnection.ondatachannel= e => {
        const receiveChannel = e.channel;
        receiveChannel.onmessage =e =>  console.log("messsage received!!!"  + e.data )
        receiveChannel.onopen = e => console.log("open!!!!");
        receiveChannel.onclose =e => console.log("closed!!!!!!");
        remoteConnection.channel = receiveChannel;
    }


    remoteConnection.setRemoteDescription(offer).then(a=>console.log("done"))

    //create answer
    let answer
    remoteConnection.createAnswer().then(a => {
        remoteConnection.setLocalDescription(a)
        answer = a
        console.log(answer)
    })

    return answer
}

export default RtcVideo