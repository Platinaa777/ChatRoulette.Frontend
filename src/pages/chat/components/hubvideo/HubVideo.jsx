import React, {useState} from 'react';
import './HubVideo.css';
import {MdMic, MdMicOff, MdOutlineHeadset, MdOutlineHeadsetOff} from "react-icons/md";

const HubVideo = ({localVideo, remoteVideo, muteSelf, unmuteSelf}) => {

    const [meMuted, setMeMuted] = useState(false);
    const [peerMuted, setPeerMuted] = useState(false);

    const muteMe = async () => {
        //localVideo.current.muted = !localVideo.current.muted;
        muteSelf();
        setMeMuted(true);
    }

    const unmuteMe = async () => {
        //localVideo.current.muted = !localVideo.current.muted;
        unmuteSelf();
        setMeMuted(false);
    }

    const mutePeer = async () => {
        remoteVideo.current.muted = !remoteVideo.current.muted;
        setPeerMuted(true);
    }

    const unmutePeer = async () => {
        remoteVideo.current.muted = !remoteVideo.current.muted;
        setPeerMuted(false);
    }

    return (<div className="video-container">
            <video id="remote-video" ref={remoteVideo} autoPlay/>
            <div id="local-video">
                <video ref={localVideo} autoPlay/>
            </div>
            <div id="sound-buttons-container">
                {!meMuted ?
                    <MdMic className='mute-button' onClick={muteMe}/> :
                    <MdMicOff className='mute-button' onClick={unmuteMe}/>}
                {!peerMuted ?
                    <MdOutlineHeadset className='mute-button' onClick={mutePeer}/> :
                    <MdOutlineHeadsetOff className='mute-button' onClick={unmutePeer}/>}
            </div>
        </div>);
};

export default HubVideo;