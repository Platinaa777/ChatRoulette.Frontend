import React, { Fragment, useState } from 'react';
import Avatar from 'react-avatar-edit';
import ModalDialog from '../../../components/ModalDialog';



const ProfilePic = ({src, setSrc, updatePic}) => {
    const [preview, setPreview] = useState("");
    const [croppedImg, setCroppedImg] = useState("");
    const [crop, setCrop] = useState(false);

    const onAvatarCrop = (view) => setCroppedImg(view);

    const onAvatarClose = () => setPreview(null);

    const onClose = () => {
        setCrop(false);
        setCroppedImg("");
    }

    function onSubmitPicture() {
        if (croppedImg !== "") {
            setSrc(croppedImg);
        }
        onClose();
        console.log(src)
        updatePic();
    }

    return (<>
        <div className='w-full px-4 mb-4'>
            <img className="w-full aspect-square rounded-[50%] border-4 border-indigo-800" src={src} alt="Profile" onClick={() => setCrop(true)} />
        </div>
        <ModalDialog open={crop} setOpen={setCrop} onSubmit={onSubmitPicture} onClose={onClose} title="Select profile picture">
            <Avatar
                width={400}
                height={300}
                onCrop={onAvatarCrop}
                onClose={onAvatarClose}
                src={preview}
            />
        </ModalDialog>
    </>);
};

export default ProfilePic;