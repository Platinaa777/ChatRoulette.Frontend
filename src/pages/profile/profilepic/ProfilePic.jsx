import React, {useState} from 'react';
import Avatar from 'react-avatar-edit';
import profile from '../../../assets/profile.png';
import "./ProfilePic.css"


const ProfilePic = () => {
    const [src, setSrc] = useState(profile);
    const [preview, setPreview] = useState(null);
    const [croppedImg, setCroppedImg] = useState(null);
    const [crop, setCrop] = useState(false);

    return (<div className='profile-pic p-4'>
        <img className="profile-img" src={src} alt="Profile" onClick={() => setCrop(true)}/>
        <div className={crop ? "redact-img active" : "redact-img"}>
            <Avatar
                width={400}
                height={300}
                onCrop={(view) => setCroppedImg(view == null ? profile : view)}
                onClose={() => setPreview(null)}
                src={preview}
            />
            <button className="submit-pic" onClick={() => {
                setSrc(croppedImg);
                setCrop(false);
            }}>
                Submit
            </button>
        </div>
    </div>);
};

export default ProfilePic;