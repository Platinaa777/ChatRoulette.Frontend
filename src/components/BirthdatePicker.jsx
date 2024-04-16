import React, { useState } from 'react'
import ModalDialog from './ModalDialog';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const BirthdatePicker = ({ className, birthdate, setBirthdate }) => {
  const [date, setDate] = useState(dayjs('2022-04-17'));

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear - 16);

  function calculateAge(birthday) {
    var ageDifMs = Date.now() - birthday;
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  return (<>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker className={className}
          label="Date of birth"
          value={date}
          onChange={(newDate) => setDate(newDate)}
        />
      </LocalizationProvider>
      </>
  )
}

export default BirthdatePicker