import React, { useState } from 'react'
import ModalDialog from './ModalDialog'
import { useSession } from '../http/context/UserContext';

const ReportUser = ({open, setOpen, userName, email}) => {

  const userSession = useSession();

  const [content, setContent] = useState('');
  const [type, setType] = useState('Inappropriate Behaviour')

  const sendReport = async() => {
    await userSession.addComplaint(email, type, content)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <ModalDialog open={open} setOpen={setOpen} onSubmit={sendReport} onClose={onClose} title={`Report user ${userName}`}>
      <div className='h-fit'>
        <p>Select type of report</p>
        <div className='flex flex-col columns-2'>
          <button onClick={() => setType('Voice Abuse')}>Voice Abuse</button>
          <button onClick={() => setType('Video Abuse')}>Video Abuse</button>
          <button onClick={() => setType('Text Abuse')}>Text Abuse</button>
          <button onClick={() => setType('Inappropriate Behaviour')}>Inappropriate Behaviour</button>
        </div>
        <textarea 
        className='mt-2 focus:outline-none w-full h-[calc(100%-54px)] resize-none p-3 bg-indigo-50'
        value={content}
        onChange={(e) => setContent(e.target.value)}>
        </textarea>
        <div className="mt-2 flex justify-between">
                <button
                    type="button"
                    className="mx-1 min-w-[calc(50%-0.5rem)] inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={sendReport}>
                    Submit
                </button>
                <button
                    type="button"
                    className="mx-1 min-w-[calc(50%-0.5rem)] inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onClose}>
                    Cancel
                </button>
            </div>
      </div>
    </ModalDialog>
  )
}

export default ReportUser