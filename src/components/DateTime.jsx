import * as React from 'react';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { MultiInputDateRangeField } from '@mui/x-date-pickers-pro/MultiInputDateRangeField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Box } from '@mui/material';
import { useEffect } from 'react';

export default function MultiInputDateRangePicker({setEndDate,setStartDate}) {
  const [value, setValue] = useState([null, null]);
const [startDate1, setStartDate1] = React.useState(null);
  const [endDate1, setEndDate1] = React.useState(null);
  console.log("the Start and end date are here  ",  startDate1 ? startDate1.format('YYYY-MM-DDTHH:mm:ss') : '' , "   " ,  endDate1 ? endDate1.format('YYYY-MM-DDTHH:mm:ss') : '')
  useEffect(() => {
    setStartDate(startDate1 ? startDate1.format('YYYY-MM-DDTHH:mm:ss') : '' )
    setEndDate(endDate1 ? endDate1.format('YYYY-MM-DDTHH:mm:ss') : '')
  }, [startDate1,endDate1])
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['MultiInputDateRangeField']}>
       <Box sx={{
        '& .MuiMultiInputDateRangeField-root': {
          flexDirection: 'column',
          alignItems: 'flex-',
          width:"80%",
          gap: 1,
        },
        '& .MuiTextField-root': {
          width: '50%',
        },
      }}>
        <DateRangePicker
          value={[startDate1, endDate1]}
          calendars={1}
          onChange={(newValue) => {
            const [start, end] = newValue || [null, null];
            setStartDate1(start);
            setEndDate1(end);
          }}
          slots={{ field: MultiInputDateRangeField }}
           slotProps={{
    popper: {
      placement: 'left-start', // position popup to the left top corner of the input
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [-63, 33], // adjust the offset if needed (horizontal, vertical)
          },
        },
      ],
    },
  }}
        />
      </Box>
      </DemoContainer>
    </LocalizationProvider>
  );
}
