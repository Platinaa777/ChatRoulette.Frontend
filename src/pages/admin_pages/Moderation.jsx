import React, { useState } from 'react';
import { Tab } from '@headlessui/react';

const Moderation = () => {/*

  const [feedback, setFeedback] = useState([{}]);
  const [complaints, setComplaints] = useState([{}]);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="mx-4 p-4 w-full flex flex-col items-center">
      <div className='w-[80%]'>
        <Tab.Group>

          <Tab.List className="flex bg-indigo-200 mb-2 rounded-xl w-full">
            <Tab
              key="User Complaints"
              className={({ selected }) => classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-blue-800 focus:outline-none text-blue-700', selected ? 'ring-2 bg-white shadow' : 'hover:bg-white/[0.12] hover:text-white')}>
              User Complaints
            </Tab>
            <Tab
              key="App Feedback"
              className={({ selected }) => classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-blue-800 focus:outline-none text-blue-700', selected ? 'ring-2 bg-white shadow' : 'hover:bg-white/[0.12] hover:text-white')}>
              App Feedback
            </Tab>
          </Tab.List>

          <Tab.Panels className="w-full h-full">
            {[feedback, complaints].map((data, idx) => <Tab.Panel
              key={idx}
              className='rounded-xl bg-white px-2 focus:outline-none h-full'>
              {(data.length === 0) && <p className='mt-4 p-4 text-lg text-indigo-800'>Wow... empty...</p>}
              <ul className='flex flex-col'>
                {data.map((entry) => (<li
                  key={entry.id}
                  className="w-full h-40 justify-between flex-row relative rounded-md p-3 border-2 mb-1 bg-violet-50 hover:bg-gray-100"
                >
                  <h1 className='text-blue-800 text-2xl'>{idx === 0 ? "Complaint on " : "Feedback from "}{entry.violatorEmail}</h1>
                  <h3 className='text-indigo-950 text-xl'>Type: {entry.complaintType}</h3>
                  <h3 className='text-indigo-950 text-xl'>From: {entry.senderEmail}</h3>
                  <p>{entry.context}</p>
                </li>))}
              </ul>
            </Tab.Panel>)}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )*/
  return (<div></div>)
}

export default Moderation