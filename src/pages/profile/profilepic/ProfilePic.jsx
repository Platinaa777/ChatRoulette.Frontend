import React, {useEffect, useState} from 'react';
import {Dialog} from 'primereact/dialog';
import Avatar from 'react-avatar-edit';
import profile from '../../../assets/profile.png';
import "./ProfilePic.css"


const ProfilePic = () => {
    const [src, setSrc] = useState(profile);
    const [preview, setPreview] = useState(null);
    const [crop, setCrop] = useState(true);

    const changeCrop = () => setCrop(!crop)

    const onCrop = (view) => {
        setSrc(view)
    }
    const onClose = () => {
        setPreview(null);
    }

    return (<div className='profile-pic p-4'>
        <img className="profile-img" src={src} alt="Profile" onClick={changeCrop}/>
        <Dialog visible={crop} onHide={changeCrop}>
            <Avatar width={400} height={300} onCrop={onCrop} onClose={onClose} src={preview} shadingColor={'#474649'} backgroundColor={'#474649'}/>
        </Dialog>
    </div>);
};

export default ProfilePic;