import React, { useState } from 'react'
import ModalDialog from './ModalDialog'
import { useSession } from '../http/context/UserContext';
import { observer } from 'mobx-react-lite';

const ReportUser = ({open, setOpen, userName, email}) => {

  const userSession = useSession();

  const [content, setContent] = useState('');
  const [type, setType] = useState('InappropriateBehavior')
  const [responseWidget, SetResponseWidget] = useState(false)

  const sendReport = async() => {
    await userSession.sendComplaint(email, type, content)

    onClose()
    SetResponseWidget(true)
  }

  const onClose = () => {
    setOpen(false)
    setContent('')
  }

  return (
    <div>
      <ModalDialog open={open} setOpen={setOpen} onSubmit={sendReport} onClose={onClose} title={`Report user ${userName}`}>
        <div className='h-fit'>
          <p className='text-center font-bold'>Select type of report</p>
          <div className='flex flex-col columns-2'>
            <label>
              <input type="radio" name="abuseType" value="VoiceAbuse" onChange={(e) => setType(e.target.value)} />
              Voice Abuse
            </label>
            <label>
              <input type="radio" name="abuseType" value="VideoAbuse" onChange={(e) => setType(e.target.value)} />
              Video Abuse
            </label>
            <label>
              <input type="radio" name="abuseType" value="TextAbuse" onChange={(e) => setType(e.target.value)} />
              Text Abuse
            </label>
            <label>
              <input type="radio" name="abuseType" value="InappropriateBehavior" onChange={(e) => setType(e.target.value)} defaultChecked/>
              Inappropriate Behaviour
            </label>
          </div>
          <p className="text-center font-bold">Message</p>
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
      <ModalDialog open={responseWidget} setOpen={SetResponseWidget} title="Yor report was sent successfully!">
        <div className='mt-4 flex justify-center items-center'>
          <button
            type="button"
            className="mx-1 min-w-[calc(30%-0.5rem)] inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => SetResponseWidget(false)}>
            Ok
          </button>
        </div>
      </ModalDialog>
    </div>
  )
}

export default observer(ReportUser);