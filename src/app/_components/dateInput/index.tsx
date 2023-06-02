'use client'
import { useState, useEffect } from 'react';

import { styled } from '@mui/system';
import { date_types } from '../../_services/constants';
import { FormControl } from '@mui/material';
import { DateInputProps } from './types';

const StyledInput = styled('input')({
  border: '1px solid rgba(0, 0, 0, 0.23)',
  borderRadius: '4px',
  padding: '8px 12px',
  fontSize: '16px',
  width: '100%',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
  '&:focus': {
    outline: 'none',
    borderColor: '#1976d2',
  },
});

function DateInput({date_type, date_value, handleOnChange}: DateInputProps) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(()=>{
    handleOnChange(formattedDate)
  },[formattedDate, handleOnChange])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    if (key === 'Backspace' || key === 'Delete') {
        event.preventDefault();

        setFormattedDate('');
      } else if (/^[0-9]$/.test(key)) {
      event.preventDefault();
  
      const newValue = formattedDate + key;
    if(newValue.length <= 10){
        
        if (newValue.length === 4 || newValue.length === 7) {
          setFormattedDate(newValue + '-');
        } else {
          setFormattedDate(newValue);
        }
    }
    }
  };

  if (date_type===date_types[1]){
    return (
      <FormControl fullWidth key={`input${date_type}`}>
        <StyledInput 
            data-testid="earth_day_input"
            key={'earth_date_input'}
            placeholder='YYYY-MM-DD'
            type="text" 
            value={formattedDate||date_value}  
            onKeyDown={handleKeyDown}
            onChange={(event) => setFormattedDate(event.target.value)}
        />
      </FormControl>
    );
  } else if (date_type===date_types[2]) {
    return (
      <FormControl fullWidth key={`input${date_type}`}>
        <StyledInput 
          data-testid="sol_input"
          key={'sol_date_input'}
          placeholder='YYYY'
          type="number" 
          value={formattedDate||date_value}  
          onChange={(event) => setFormattedDate(event.target.value)}
        />
      </FormControl>
      )
  } else {return (
    null
  )}



}

export default DateInput;