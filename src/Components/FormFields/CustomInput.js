import React from "react";
import './CustomInput.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const CustomInput = (props) => {
    const {type, name, value, onChangeValue, placeholder, hidden=false,  disabled=false, required=true} = props;
    return(
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
            required={required}
            id='standard-required'
            label={placeholder}
            // defaultValue="Hello World"
            variant='standard'
            type={type} 
            name={name} 
            value={value} 
            onChange={onChangeValue}
            hidden={hidden}
            disabled={disabled}
            />
        </Box>
    );
}
export default CustomInput;