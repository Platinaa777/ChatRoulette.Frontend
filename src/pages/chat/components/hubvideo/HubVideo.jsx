import React from 'react';
import './HubVideo.css';

const HubVideo = ({localVideo, remoteVideo}) => {
        const muteMe = async () => {
        localVideo.current.muted = !localVideo.current.muted;
    }

    const mutePeer = async () => {
        remoteVideo.current.muted = !remoteVideo.current.muted;
    }

    return (
            <div className="video-container">
                <p>Peer</p>
                <div className="video-screen">
                    <video id="remote-video" ref={remoteVideo} muted autoPlay></video>
                    <div id="local-video">
                        <p>Me</p>
                        <video ref={localVideo} muted autoPlay></video>
                        <button className='mute-button' onClick={muteMe}>Mute me</button>
                    </div>
                </div>
                <button className='mute-button' onClick={mutePeer}>Mute peer</button>
            </div>
    );
};

export default HubVideo;