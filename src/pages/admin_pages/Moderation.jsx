import React, { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import { IoClose } from "react-icons/io5";
import ModalDialog from "../../components/ModalDialog"
import { useSession } from '../../http/context/UserContext';

const Moderation = () => {
  const userSession = useSession();

  const [feedback, setFeedback] = useState([]);
  const [complaints, setComplaints] = useState([]);

  const [openView, setOpenView] = useState(false);
  const [currentReport, setCurrentReport] = useState({ type: null, report: {} });

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const acceptComplaint = async (id) => {
    await userSession.acceptComplaint(id).then(() => setOpenView(false))
  }

  const rejectComplaint = async (id) => {
    await userSession.rejectComplaint(id).then(() => setOpenView(false))
  }

  useEffect(() => {
    const getFeedback = async () => {
      const response = await userSession.getFeedback()
      setFeedback([...response])
    }

    const getComplaints = async () => {
      const response = await userSession.getComplaints()
      setComplaints([...response])
    }

    getFeedback()
    getComplaints()
  }, [])

  return (
    <div className="mx-4 p-4 w-full flex flex-col items-center">
      <div className='w-[80%]'>
        <Tab.Group>

          <Tab.List className="flex bg-indigo-200 mb-2 rounded-xl w-full">
            <Tab
              key="App Feedback"
              className={({ selected }) => classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-blue-800 focus:outline-none text-blue-700', selected ? 'ring-2 bg-white shadow' : 'hover:bg-white/[0.12] hover:text-white')}>
              App Feedback
            </Tab>
            <Tab
              key="User Complaints"
              className={({ selected }) => classNames('w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-blue-800 focus:outline-none text-blue-700', selected ? 'ring-2 bg-white shadow' : 'hover:bg-white/[0.12] hover:text-white')}>
              User Complaints
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
                  className="cursor-pointer w-full max-h-40 justify-between flex-row relative rounded-md p-3 border-2 mb-1 bg-violet-50 hover:bg-gray-100"
                  onClick={() => {
                    setCurrentReport({ type: (idx === 0 ? 'Feedback' : 'Complaint'), report: entry })
                    setOpenView(true)
                  }}
                >
                  <h1 className='text-blue-800 text-2xl'>{idx === 1 ? "Complaint on " : "Feedback from "}{entry.email}</h1>
                  {(idx === 1) && <h3 className='text-indigo-950 text-xl'>Type: {entry.complaintType}</h3>}
                  {(idx === 1) && <h3 className='text-indigo-950 text-xl'>From: {entry.senderEmail}</h3>}
                  <p>{entry.content}</p>
                </li>))}
              </ul>
            </Tab.Panel>)}
          </Tab.Panels>
        </Tab.Group>
      </div>

      <ModalDialog
        open={openView}
        setOpen={setOpenView}
        title={currentReport.type === null ? '' : (currentReport.type === 'Feedback' ? 'Feedback from ' : 'Complaint on ') + currentReport.report.email}>
        <div className='min-h-[80vh] w-[80%]'>
          <button className='absolute right-0 top-0 m-2 p-4 text-xl' onClick={() => setOpenView(false)}><IoClose /></button>
          <div className="mt-4 overflow-hidden">
            {(currentReport.type === "Complaint") && <h3 className='text-indigo-950 text-md'>From: {currentReport.report.senderEmail}</h3>}
            {(currentReport.type === "Complaint") && <h3 className='text-indigo-950 text-md'>Type: {currentReport.report.complaintType}</h3>}
            <p className='mt-2'>{currentReport.report.content}</p>
          </div>
          {(currentReport.type === 'Complaint' &&
            < div className="flex justify-between bottom-5 fixed">
              <button
                type="button"
                className="mx-1 min-w-[calc(50%-0.5rem)] inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={() => acceptComplaint(currentReport.report.id)}>
                Accept
              </button>
              <button
                type="button"
                className="mx-1 w-20 inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={() => rejectComplaint(currentReport.report.id)}>
                Reject
              </button>
            </div>
          )}
        </div>
      </ModalDialog>
    </div >
  )
}

export default Moderation