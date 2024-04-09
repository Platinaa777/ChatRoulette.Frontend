import React, {useState} from 'react';
import {Tab} from '@headlessui/react';
import "./Friends.css"

const Friends = () => {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    let [categories] = useState({
        Friends: [{
            id: 1, title: 'Friend1'
        }, {
            id: 2, title: "Friend2"
        },], Recent: [{
            id: 1, title: 'User1'
        }, {
            id: 2,
            title: 'User2',
        },]
    })

    return (<div className="friends-container">
        <Tab.Group>
            <Tab.List className="tab-list">
                {Object.keys(categories).map((category) => (<Tab
                    key={category}
                    className={({selected}) => classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5', 'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2', selected ? 'bg-white text-blue-700 shadow' : 'text-gray-500 hover:bg-white/[0.12] hover:text-white')}>
                    {category}
                </Tab>))}
            </Tab.List>
            <Tab.Panels className="tab-panels">
                {Object.values(categories).map((people, idx) => (<Tab.Panel
                    key={idx}
                    className={classNames('rounded-xl bg-white p-3', 'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2')}
                >
                    <ul>
                        {people.map((person) => (<li
                            key={person.id}
                            className="flex relative rounded-md p-3 hover:bg-gray-100"
                        >
                            <img alt="" width={20} height={20} className="rounded-xl overflow-hidden"/>
                            <h3 className="ml-1 text-sm font-medium leading-5">
                                {person.title}
                            </h3>
                        </li>))}
                    </ul>
                </Tab.Panel>))}
            </Tab.Panels>
        </Tab.Group>
    </div>)
};

export default Friends;