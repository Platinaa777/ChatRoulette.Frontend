import React, { useState } from 'react'
import { IoSend } from 'react-icons/io5';
import { useUser } from '../../http/context/UserContext';
import { AdminService } from '../../http/core/Admin';

const ReportProblem = () => {

  const { userSession } = useUser();

  const [error, setError] = useState('');

  const sendReport = async (e) => {
    e.preventDefault();
    const content = Object.fromEntries(new FormData(e.target).entries()).content;
    try {
      const response = await AdminService.addFeedback(userSession.user.email, content);
      console.log(response)
    } catch (err) {
      console.log(err)
      setError("Message is too short")
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
          className='focus:outline-none w-full h-[calc(100%-54px)] resize-none p-3 bg-indigo-100'
          onChange={() => setError('')} />
          {(error !== '') && <p className='absolute bottom-0 left-0 p-4 mx-2 text-red-500'>{error}</p>}
        <button className='flex items-center absolute right-0 bottom-0 mx-4 my-2 px-6 py-2 bg-violet-600 rounded-3xl text-white'
          type='submit'>
          Send
          <IoSend className='ml-2' />
        </button>
      </form>
    </div>
  )
}

export default ReportProblem;