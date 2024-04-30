import React, { useState } from 'react'
import { IoSend } from 'react-icons/io5';
import { useSession } from '../../http/context/UserContext';
import ModalDialog from '../../components/ModalDialog';

const ReportProblem = () => {

  const userSession = useSession();

  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const sendReport = async (e) => {
    e.preventDefault();
    const result = await userSession.sendFeedback(text)
    if (!result.data.isSuccess) {
      setError("Message is too short")
    } else {
      setOpen(true)
      setText('')
    }
  }

  return (
    <div className='w-full h-full flex flex-col items-center'>
      <form
        className='relative my-2 sm:w-[80%] sm:mx-0 mx-2 border-2 border-indigo-600 rounded-md bg-indigo-100 h-full overflow-hidden'
        onSubmit={sendReport}
      >
        <h1 className='text-xl p-3 w-full border-b-2 border-indigo-600 bg-gradient-to-t from-violet-400 to-indigo-400 text-white'>From: {userSession.profile.userName} ({userSession.user.email})</h1>
        <textarea
          name='content'
          value={text}
          className='focus:outline-none w-full h-[calc(100%-54px)] resize-none p-3 bg-indigo-100'
          onChange={(v) => {
            setText(v.target.value)
            setError('')
          }} />
        {(error !== '') && <p className='absolute bottom-0 left-0 p-4 mx-2 text-red-500'>{error}</p>}
        <button className='flex items-center absolute right-0 bottom-0 mx-4 my-2 px-6 py-2 bg-violet-600 rounded-3xl text-white'
          type='submit'>
          Send
          <IoSend className='ml-2' />
        </button>
      </form>
      <ModalDialog open={open} setOpen={setOpen} title="Yor feedback was sent successfully!">
        <div className='mt-4 flex justify-center items-center'>
          <button
            type="button"
            className="mx-1 min-w-[calc(30%-0.5rem)] inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => setOpen(false)}>
            Ok
          </button>
        </div>
      </ModalDialog>
    </div>
  )
}

export default ReportProblem;