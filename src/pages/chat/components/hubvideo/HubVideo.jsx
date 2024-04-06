import React from 'react';
import './HubVideo.css';
import {MdMic, MdMicOff, MdOutlineHeadset, MdOutlineHeadsetOff} from "react-icons/md";

const HubVideo = ({localVideo, remoteVideo}) => {
    const muteMe = async () => {
        localVideo.current.muted = !localVideo.current.muted;
    }

    const mutePeer = async () => {
        remoteVideo.current.muted = !remoteVideo.current.muted;
    }

    return (<div className="video-container">
            <video id="remote-video" ref={remoteVideo} muted autoPlay/>
            <div id="local-video">
                    <video ref={localVideo} muted autoPlay/>
            </div>
            <div id="sound-buttons-container">
                {localVideo.current == null || localVideo.current.muted ?
                    <MdMic className='mute-button' onClick={muteMe}/> :
                    <MdMicOff className='mute-button' onClick={muteMe}/>}
                {remoteVideo.current == null || remoteVideo.current.muted ?
                    <MdOutlineHeadset className='mute-button' onClick={mutePeer}/> :
                    <MdOutlineHeadsetOff className='mute-button' onClick={mutePeer}/>}
            </div>
        </div>);
};

export default HubVideo;