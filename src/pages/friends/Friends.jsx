import React, { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import { useSession } from '../../http/context/UserContext';
import ReportUser from '../../components/ReportUser';

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
            setRecents(result.data === "No peer history" ? [] : [...result])
        }

        const getFriendRequests = async () => {
            const result = await userSession.getFriendRequests();
            setRequests(result.data === "" ? [] : [...result])
        }

        //setFriends([...userSession.profile.friends])
        getRecentUsers()
        getFriendRequests()
    }, [])

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
                    {[friends, recents, requests].map((data, idx) => <Tab.Panel
                        key={idx}
                        className='rounded-xl bg-white px-2 focus:outline-none'>
                        {(data.length === 0) && <p className='mt-4 p-4 text-lg text-indigo-800'>Wow... empty...</p>}
                        <ul>
                            {data.map((person) => (<li
                                key={person.id}
                                className="w-full flex justify-between flex-row relative rounded-md p-3 border mb-1 hover:bg-gray-100"
                            >
                                <div className="flex">
                                    <img alt="" src={person.img} width={20} height={20} className="rounded-xl overflow-hidden" />
                                    <h3 className="ml-4 text-l font-medium leading-5">
                                        {person.nickName}
                                    </h3>
                                </div>
                                <div className='flex'>
                                    {
                                        idx ? <button className="ml-4 text-l font-medium leading-5">
                                            Add Friend
                                        </button> : <button className="ml-4 text-l font-medium leading-5">
                                            Remove Friend
                                        </button>
                                    }
                                    {
                                        (idx > 0) && <button className="ml-4 text-l font-medium leading-5">
                                            Report
                                        </button>
                                    }
                                </div>
                            </li>))}
                        </ul>
                    </Tab.Panel>)}
                </Tab.Panels>
            </Tab.Group>
        </div>
        <ReportUser
            open={report.open}
            setOpen={() => setReport((prevState) => ({ ...prevState, open: false }))}
            userName={report.username} />
    </div>)
};

export default Friends;