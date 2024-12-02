import React from 'react';

const CustomBtn = (props) => {
    const {className, onClick, btnName, customWidth} = props;
    return(
        <button style={{width: customWidth}} className={className} onClick={onClick}>{btnName}</button>
    );
}
export default CustomBtn;