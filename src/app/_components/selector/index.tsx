import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { FormControl } from '@mui/material';
import { SelectorProps } from './types';

export default function Selector ({value, handleChange, options, label}:SelectorProps) {
    return (
        <FormControl sx={{margin:'0 8px'}} key={`${label}`}>
       
            <InputLabel id={label}>{label}</InputLabel>
            <Select
             
             labelId={label}
             id={label}
             value={value}
             label={label}
             onChange={handleChange} 
                >
                {options && options.map( (option:string) => (
                    <MenuItem key={`${label}${option}${value}`} value={option}> {option} </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}