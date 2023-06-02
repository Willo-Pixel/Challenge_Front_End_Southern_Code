import { SelectChangeEvent } from "@mui/material";

export interface SelectorProps {
    value:string,
    handleChange: (e:SelectChangeEvent)=>void,
    options: string[],
    label: string,
}