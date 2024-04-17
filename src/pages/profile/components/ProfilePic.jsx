import React, { useState } from 'react';
import Avatar from 'react-avatar-edit';
import ModalDialog from '../../../components/ModalDialog';
import profile from '../../../assets/profile.png'
import { observer } from 'mobx-react-lite';
import { useSession } from '../../../http/context/UserContext';



const ProfilePic = observer(() => {
    const userSession = useSession();

    const [src, setSrc] = useState(profile)
    const [preview, setPreview] = useState("");
    const [croppedImg, setCroppedImg] = useState("");
    const [crop, setCrop] = useState(false);

    const onAvatarCrop = (view) => setCroppedImg(view);

    const onAvatarClose = () => setPreview(null);

    const onClose = () => {
        setCrop(false);
        setCroppedImg("");
    }

    const updatePic = async (img) => {
        await userSession.changeAvatar(img)
    }

    function onSubmitPicture() {
        if (croppedImg !== "") {
            // console.log(croppedImg)
            setSrc(croppedImg);
        }
        onClose();
        // console.log(src)
        updatePic(croppedImg);
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
});

export default ProfilePic;