import React from "react";
import { useNavigate } from "react-router-dom";

const CustomBackButton = (props) => {
    const {customClassName, customWidth=100, customHeight=40} = props;
    const navigate = useNavigate();

    const backHandler = () => {
        navigate(-1);
    }

    return(
        <button className={customClassName} style={{color: 'black', backgroundColor: 'white', width: customWidth, height: customHeight, borderColor: 'black'}} onClick={backHandler}>BACK</button>
    );
}
export default CustomBackButton;