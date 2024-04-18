import React, { useState } from 'react';
import './HubVideo.css';
import { MdMic, MdMicOff, MdOutlineHeadset, MdOutlineHeadsetOff } from "react-icons/md";

const HubVideo = ({ localVideo, remoteVideo, muteSelf, unmuteSelf }) => {

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

    return (<div className="relative text-center h-full w-full min-w-full overflow-hidden flex flex-col justify-center items-center">
        <video className='bg-black rounded-[10px] object-cover h-full w-full overflow-hidden' ref={remoteVideo} autoPlay/>
        <div id="local-video">
            <video ref={localVideo} className='object-cover' autoPlay/>
        </div>
        <div id="sound-buttons-container">
            {!meMuted ?
                <button className='text-2xl bg-indigo-600 text-white p-3 rounded-[50%]' onClick={muteMe}><MdMic /></button> :
                <button className='text-2xl bg-indigo-600 text-white p-3 rounded-[50%]' onClick={unmuteMe}><MdMicOff /></button>}
            {!peerMuted ?
                <button className='text-2xl bg-indigo-600 text-white p-3 rounded-[50%]' onClick={mutePeer}><MdOutlineHeadset /></button> :
                <button className='text-2xl bg-indigo-600 text-white p-3 rounded-[50%]' onClick={unmutePeer}><MdOutlineHeadsetOff /></button>}
        </div>
    </div>);
};

export default HubVideo;