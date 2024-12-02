import React from "react";

const CustomButton = (props) => {
    const {btnName, btnHandler, customBorderColor, customBackgroundColor, customColor='white', customWidth=100, customHeight=40, customClassName} = props;
    return(
        <button className={customClassName} style={{color: customColor, backgroundColor: customBackgroundColor, width: customWidth, height: customHeight, borderColor: customBorderColor}} onClick={() => btnHandler()}>{btnName}</button>
    );
}
export default CustomButton;