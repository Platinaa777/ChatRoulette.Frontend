import React, {Fragment, useState} from 'react';
import Avatar from 'react-avatar-edit';
import profile from '../../../assets/profile.png';
import {Dialog, Transition} from '@headlessui/react'
import "./ProfilePic.css"


const ProfilePic = () => {
    const [src, setSrc] = useState(profile);
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
        // send to server
    }

    return (<>
        <div className='profile-pic'>
            <img className="profile-img" src={src} alt="Profile" onClick={() => setCrop(true)}/>
        </div>
        <Transition appear show={crop} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setCrop(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25"/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Select profile picture
                                </Dialog.Title>
                                <div className="mt-2 overflow-hidden">
                                    <Avatar
                                        width={400}
                                        height={300}
                                        onCrop={onAvatarCrop}
                                        onClose={onAvatarClose}
                                        src={preview}
                                    />
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={onSubmitPicture}>
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={onClose}>
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>

    </>);
};

export default ProfilePic;