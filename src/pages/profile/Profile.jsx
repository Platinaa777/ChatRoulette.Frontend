import React, { useEffect, useState } from 'react';
import ProfilePic from "./components/ProfilePic";
import UserdataView from "./components/UserdataView";
import RatingView from "./components/RatingView";
import AchievementsView from "./components/AchievementsView";
import { Tab } from '@headlessui/react';
import { useUser } from '../../http/context/UserContext';
import profile from '../../assets/profile.png';

const Profile = () => {
    const { userSession } = useUser();

    const [rating, setRating] = useState({ top: [], me: {} });
    const [username, setUsername] = useState(userSession.IsAuth ? userSession.profile.userName : "Username");
    const [src, setSrc] = useState(profile);

    const changeUsername = async (e) => {
        e.preventDefault()
        await userSession.changeUsername(username)
        getTopUsers()
    }

    const changeAvatar = async (img) => {
        userSession.changeAvatar(img).then( async response => {
            // console.log(response)
            await userSession.getProfile()
            setRating(prevState => ({
                ...prevState,
                me: {
                    ...prevState.me,
                    avatar: userSession.profile.avatar
                }
            }))
        }).then().catch(err => console.log(err))
    }

    const getTopUsers = async () => {
        userSession.getTopUsers().then(result => setRating(prevState => ({
            top: [...result],
            me: {
                ...prevState.me,
                userName: username
            }
        })));
    }

    useEffect(() => {
        if (userSession.IsAuth) {
            let response = userSession.getProfile();
            console.log(response)
            getTopUsers();
        } else {
            console.log("user is not auth");
        }
    }, []);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (<div className='flex flex-col sm:flex-row px-8 py-4 sm:h-full text-indigo-950'>
        <div className='w-full sm:w-[35%]'>
            <div className='flex flex-col px-4 rounded-md'>
                <h1 className='text-3xl mb-4 text-center p-1 text-blue-800'>Profile</h1>
                <ProfilePic src={src} setSrc={setSrc} updatePic={changeAvatar}/>
                <UserdataView username={username} setUsername={setUsername} changeUsername={changeUsername} />
            </div>
        </div>
        <div className='mx-2 sm:ml-4 w-full sm:w-[65%] flex flex-col items-center'>
            <Tab.Group>
                <Tab.List className="flex bg-indigo-200 w-full mb-2 rounded-xl">
                    <Tab
                        key="Leaderboard"
                        className={({ selected }) => classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-blue-800 focus:outline-none text-blue-700', selected ? 'ring-2 bg-white shadow' : 'hover:bg-white/[0.12] hover:text-white')}>
                        Leaderboard
                    </Tab>
                    <Tab
                        key="Achievements"
                        className={({ selected }) => classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-blue-800 focus:outline-none text-blue-700', selected ? 'ring-2 bg-white shadow' : 'hover:bg-white/[0.12] hover:text-white')}>
                        Achievements
                    </Tab>
                </Tab.List>
                <Tab.Panels className="w-full">
                    <Tab.Panel
                        key={"Leaderboard"}
                        className='rounded-xl bg-white px-2 focus:outline-none'
                    >
                        <RatingView rating={rating} username={username} />
                    </Tab.Panel>
                    <Tab.Panel
                        key={"Achievements"}
                        className='rounded-xl bg-white px-2 focus:outline-none'
                    >
                        <AchievementsView />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    </div>);
};

export default Profile;