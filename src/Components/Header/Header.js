import React from "react";
import './Header.css';
import { IconButton } from "@mui/material";

const CustomHeader = (props) => {
    const {heading} = props;
    return(
        <div className='text-center custom-header '>
            <span className='fs-1'>{heading}</span>
        </div>
    );

}
export default CustomHeader;