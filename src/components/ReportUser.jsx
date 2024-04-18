import React from 'react'
import ModalDialog from './ModalDialog'

const ReportUser = ({open, setOpen, userName}) => {

  const sendReport = () => {

  }

  const onClose = () => {
  }

  return (
    <ModalDialog open={open} setOpen={setOpen} onSubmit={sendReport} onClose={onClose} title={`Report user ${userName}`}>
      <div className=''>
        <p>Select type of report</p>
        <div>
          <button>Voice Abuse</button>
          <button>Video Abuse</button>
          <button>Text Abuse</button>
          <button>Inappropriate Abuse</button>
        </div>
        <textarea>

        </textarea>
      </div>
    </ModalDialog>
  )
}

export default ReportUser