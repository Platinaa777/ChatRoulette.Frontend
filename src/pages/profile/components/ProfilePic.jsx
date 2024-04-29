import React, { useState } from 'react';
import Avatar from 'react-avatar-edit';
import ModalDialog from '../../../components/ModalDialog';
import profile from '../../../assets/profile.png'
import { observer } from 'mobx-react-lite';
import { useSession } from '../../../http/context/UserContext';



const ProfilePic = observer(() => {
    const userSession = useSession();

    const [src, setSrc] = useState(userSession.profile.avatar)
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
        const result = await userSession.changeAvatar(img)
        console.log(result)
        return result
    }

    function onSubmitPicture() {
        console.log(croppedImg)
        if (croppedImg !== "") {
            updatePic(croppedImg).then(() => setSrc(userSession.profile.avatar));
        }
        onClose();
    }

    return (<>
        <div className='w-full px-4 mb-4'>
            <img className="w-full aspect-square rounded-[50%]" src={src} alt="Profile" onClick={() => setCrop(true)} />
        </div>
        <ModalDialog open={crop} setOpen={setCrop} title="Select profile picture">
            <div className="mt-2 overflow-hidden flex justify-center">
                <Avatar
                    width={400}
                    height={300}
                    onCrop={onAvatarCrop}
                    onClose={onAvatarClose}
                    src={preview}
                />
            </div>

            <div className="mt-4 flex justify-between">
                <button
                    type="button"
                    className="mx-1 min-w-[calc(50%-0.5rem)] inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onSubmitPicture}>
                    Submit
                </button>
                <button
                    type="button"
                    className="mx-1 min-w-[calc(50%-0.5rem)] inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}>
                    Cancel
                </button>
            </div>
        </ModalDialog>
    </>);
});

export default ProfilePic;