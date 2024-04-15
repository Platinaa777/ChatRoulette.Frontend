import React, { useState } from 'react'
import ModalDialog from './ModalDialog';


const BirthdatePicker = ({ className, birthdate, setBirthdate }) => {
  const [dateSelect, setDateSelect] = useState(false);
  const [date, setDate] = useState(new Date());

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear - 16);

  function calculateAge(birthday) {
    var ageDifMs = Date.now() - birthday;
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const onSubmit = () => {
    setBirthdate(date);
  }

  const onClose = () => {
    setDateSelect(false);
  }

  return (<>
    <p className={className} onClick={() => setDateSelect(true)}>{birthdate}</p>
    <ModalDialog open={dateSelect} setOpen={setDateSelect} onSubmit={onSubmit} onClose={onClose} title="Select your date of birth">
      {/*<DayPicker />*/}
    </ModalDialog>
  </>
  )
}

export default BirthdatePicker