import React, { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import { useSession } from '../../http/context/UserContext';
import ReportUser from '../../components/ReportUser';
import { IoMdPersonAdd, IoMdClose } from "react-icons/io";
import { MdOutlineReport } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import profile from '../../assets/profile.png'

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
            if (result.length > 0) {
                console.log(result)
                setRecents([...result])
            } else {
                setRecents([])
            }
        }

        const getFriendRequests = async () => {
            const result = await userSession.getFriendRequests();
            setRequests(result.data === "" ? [] : [...result])
        }

        setFriends([...userSession.profile.friends])
        getRecentUsers()
        getFriendRequests()
    }, [])


    const sendFriendRequest = async (email) => {
        await userSession.addFriendRequest(email)
    }

    const [report, setReport] = useState({ open: false, username: null })


    return (<div className="mx-4 p-4 w-full flex flex-col items-center">
        <div className='w-[80%]'>
            <Tab.Group>

                <Tab.List className="flex bg-indigo-200 mb-2 rounded-xl w-full">
                    <Tab
                        key="Friends"
                        className={({ selected }) => classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-blue-800 focus:outline-none text-blue-700', selected ? 'ring-2 bg-white shadow' : 'hover:bg-white/[0.12] hover:text-white')}>
                        Friends
                    </Tab>
                    <Tab
                        key="Recents"
                        className={({ selected }) => classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-blue-800 focus:outline-none text-blue-700', selected ? 'ring-2 bg-white shadow' : 'hover:bg-white/[0.12] hover:text-white')}>
                        Recents
                    </Tab>
                    <Tab
                        key="Requests"
                        className={({ selected }) => classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-blue-800 focus:outline-none text-blue-700', selected ? 'ring-2 bg-white shadow' : 'hover:bg-white/[0.12] hover:text-white')}>
                        Requests
                    </Tab>
                </Tab.List>

                <Tab.Panels className="w-full">
                    {[friends, recents, requests].map(
                        (data, idx) => <Tab.Panel
                            key={idx}
                            className='rounded-xl bg-white px-2 focus:outline-none'>
                            {(data.length === 0) ? <p className='mt-2 p-4 text-lg text-indigo-800'>Wow... empty...</p> :
                                <ul>
                                    {data.map(
                                        (person) => (<li
                                            key={person.id}
                                            className="w-full flex flex-row items-center justify-between relative bg-indigo-50 cursor-pointer rounded-md p-3 border mb-1 hover:bg-gray-100"
                                        >
                                            <div className='flex flex-row items-center'>
                                                <img alt="" src={profile} width={50} height={50} className="rounded-xl overflow-hidden" />
                                                <div className="ml-4 flex flex-col justify-center">
                                                    <h3 className="text-lg font-medium leading-5 text-black">
                                                        {person.userName}
                                                    </h3>
                                                    <p className='float-right'>Rating: {person.rating}</p>
                                                </div>
                                            </div>
                                            <div className='flex'>
                                                {
                                                    (idx === 1) && <div className='flex ml-4 text-xl font-medium leading-5'>
                                                        <button className="p-2" onClick={() => sendFriendRequest(person.email)}>
                                                            <IoMdPersonAdd/>
                                                        </button>
                                                        <button className="p-2" onClick={() => setReport(prevState => ({...prevState, open: true}))}>
                                                            <MdOutlineReport/>
                                                        </button>
                                                    </div>
                                                }
                                                {
                                                    (idx === 2) && <>
                                                        <button className="ml-4 text-lg font-medium leading-5">
                                                            <FaCheck/>
                                                        </button>
                                                        <button className="ml-4 text-lg font-medium leading-5">
                                                            <FaXmark/>
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
            setOpen={() => setReport((prevState) => ({ ...prevState, open: false }))}
            userName={report.username} />
    </div >)
};

export default Friends;