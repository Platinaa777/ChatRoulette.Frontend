import React, {useEffect, useState} from 'react';
import {Tab} from '@headlessui/react';
import {useSession} from '../../http/context/UserContext';
import ReportUser from '../../components/ReportUser';
import {FaUser, FaUserCheck, FaUserPlus, FaUserTimes} from "react-icons/fa";
import profile from '../../assets/profile.png'
import {FaTriangleExclamation} from "react-icons/fa6";

const Friends = () => {

    const userSession = useSession();

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const [friends, setFriends] = useState([]);
    const [recents, setRecents] = useState([]);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const getRecentUsers = async () => {
            const result = await userSession.getRecentUsers();
            // console.log(result)
            if (result.length > 0) {
                setRecents([...result])
            } else {
                setRecents([])
            }
        }

        const getFriendRequests = async () => {
            const result = await userSession.getInvitationFriendRequests();

            if (result.length > 0) {
                setRequests([...result])
            } else {
                setRequests([])
            }
        }

        if (userSession.profile.friends !== null) {
            setFriends([...userSession.profile.friends])
        }
        getRecentUsers()
        getFriendRequests()
    }, [])


    const sendFriendRequest = async (email) => {
        await userSession.addFriendRequest(email)
    }

    const acceptRequest = async (id) => {
        await userSession.acceptFriendRequest(id)
    }

    const rejectRequest = async (id) => {
        await userSession.acceptFriendRequest(id)
    }

    const [report, setReport] = useState({open: false, username: null, email: null})

    return (<div className="mx-4 p-4 w-full flex flex-col items-center">
        <div className='w-[80%]'>
            <Tab.Group>

                <Tab.List className="flex bg-indigo-200 mb-2 rounded-xl w-full">
                    <Tab
                        key="Friends"
                        className={({selected}) => classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-blue-800 focus:outline-none text-blue-700', selected ? 'ring-2 bg-white shadow' : 'hover:bg-white/[0.12] hover:text-white')}>
                        Friends
                    </Tab>
                    <Tab
                        key="Recents"
                        className={({selected}) => classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-blue-800 focus:outline-none text-blue-700', selected ? 'ring-2 bg-white shadow' : 'hover:bg-white/[0.12] hover:text-white')}>
                        Recents
                    </Tab>
                    <Tab
                        key="Requests"
                        className={({selected}) => classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-blue-800 focus:outline-none text-blue-700', selected ? 'ring-2 bg-white shadow' : 'hover:bg-white/[0.12] hover:text-white')}>
                        Requests
                    </Tab>
                </Tab.List>

                <Tab.Panels className="w-full">
                    {[friends, recents, requests].map(
                        (data, idx) => <Tab.Panel
                            className='rounded-xl bg-white px-2 focus:outline-none'>
                            {(data.length === 0) ? <p className='mt-2 p-4 text-lg text-indigo-800'>Wow... empty...</p> :
                                <ul>
                                    {data.map(
                                        (person, id) => (<li
                                            key={id}
                                            className="w-full flex flex-row items-center justify-between relative bg-indigo-50 cursor-pointer rounded-md p-3 border mb-1 hover:bg-gray-100">
                                            <div className='flex flex-row items-center'>
                                                <img alt="" src={person.avatar === '' ? profile : person.avatar} width={50} height={50}
                                                     className="rounded-xl overflow-hidden"/>
                                                <div className="ml-4 flex flex-col justify-center">
                                                    <h3 className="text-lg font-medium leading-5 text-black">
                                                        {person.userName}
                                                    </h3>
                                                    <p className='float-right'>Rating: {person.rating}</p>
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-medium leading-6 text-black">
                                                Email: {person.email}
                                            </h3>
                                            <div className='flex'>
                                                {
                                                    (idx === 1) &&
                                                    <>
                                                        {!friends.some(friend => friend.email === person.email) && !requests.some(request => request.email === person.email) ?
                                                            <button className="ml-4 text-lg font-medium leading-5"
                                                                    onClick={() => sendFriendRequest(person.email)}>
                                                                <FaUserPlus/>
                                                            </button> : ""}
                                                        <button className="ml-4 text-md font-medium leading-5 mr-1" onClick={() => setReport(_ => ({
                                                            open: true,
                                                            username: person.userName,
                                                            email: person.email
                                                        }))}>
                                                            <FaTriangleExclamation/>
                                                        </button>
                                                    </>
                                                }
                                                {
                                                    (idx === 2) && <>
                                                        <button className="ml-4 text-lg font-medium leading-5"
                                                                onClick={() => acceptRequest(person.email)}>
                                                            <FaUserCheck/>
                                                        </button>
                                                        <button className="ml-4 text-lg font-medium leading-5"
                                                                onClick={() => rejectRequest(person.email)}>
                                                            <FaUserTimes/>
                                                        </button>
                                                    </>
                                                }
                                            </div>
                                        </li>))}
                                </ul>
                            }
                        </Tab.Panel>)}
                </Tab.Panels>
            </Tab.Group>
        </div>
        <ReportUser
            open={report.open}
            setOpen={() => setReport(prevState => ({...prevState, open: false}))}
            userName={report.username}
            email={report.email}/>
    </div>)
};

export default Friends;