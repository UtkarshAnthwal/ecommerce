import React, { useState } from 'react';
import './ForgotPassword.css';
import { CustomInput, CustomBtn } from '../../../Components';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';
import { useDispatch } from 'react-redux';
import { authenticatedUserDetails, confirmPasswordApi } from '../../../Redux/Reducer/Slices/loginSlice';
import { ToastContainer, toast } from 'react-toastify';
import { Routes } from '../../../Router/config';

const ForgotPassword = () => {
    const [collapse, setCollapse] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [updatedName, setUpdatedName] = useState();
    const [updatedEmail, setUpdatedEmail] = useState();
    const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState();
    const [updatedAddress, setUpdatedAddress] = useState();
    const [role, setRole] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateUserHandler = async() => {
        try{
            const response = await dispatch(authenticatedUserDetails({user_phone: phoneNumber})).unwrap();
            console.log(response, 'Response');

            if(response?.error) {
                toast.error('Does not exist');
            } else {
                setUpdatedPhoneNumber(response?.user_phone);
                setUpdatedAddress(response?.user_address);
                setUpdatedEmail(response?.user_email);
                setUpdatedName(response?.user_name);
                setRole(response?.user_role);
                setCollapse(true);
            }
        } catch (error) {
            console.log(error, 'Error');
        }
    }

    const confrimPasswordHandler = async() => {
        try {
            await dispatch(confirmPasswordApi({user_name: updatedName, user_email: updatedEmail, user_phone: updatedPhoneNumber, user_address: updatedAddress, user_role: role, user_password: confirmPassword})).unwrap();
            navigate(Routes.Login);
        } catch(error) {
            console.log(error, 'Error');
        }
    }

    // const changeHandler = (e) => {
    //     const { name, value } = e.target;
    //     setLogin((prevState) => ({
    //         ...prevState,
    //         [name]: value,
    //     }));
    //     setErrors((prevState) => ({
    //         ...prevState,
    //         [name]: ''
    //     }));
    // };
    
    return(
        <>
            <ToastContainer theme='dark'/>
            <div className='row'>
                <div className='col-md-4'></div>
                <div className='col-md-4 bg-light shadow text-center' style={{marginTop: '120px'}}>
                    <p className='mt-3 fs-3'>Forgot Password</p>
                    <Divider/>
                    
                    {collapse === true ? (
                            <>
                                <CustomInput type={`text`} name={`confirmPassword`} value={confirmPassword} onChangeValue={(e) => setConfirmPassword(e.target.value)} placeholder={`Confirm Password`}/>  
                                <CustomBtn className={`btn btn-outline-primary mt-3 mb-3 me-2 custom-btn`} btnName={`Submit`} onClick={() => confrimPasswordHandler()}/>    
                            </>
                        ) :
                        (
                            <>
                                <CustomInput type={`text`} name={`phoneNumber`} value={phoneNumber} onChangeValue={(e) => setPhoneNumber(e.target.value)} placeholder={`Phone Number`}/>
                                <CustomBtn className={`btn btn-outline-primary mt-3 mb-3 me-2 custom-btn`} btnName={`Confirm`} onClick={() => validateUserHandler()}/>    
                                <CustomBtn className={`btn btn-outline-primary mt-3 mb-3 ms-2 custom-btn`} btnName={`Back`} onClick={() => navigate(-1)}/>
                            </>
                        )}
                </div>
            </div>
        </>
    );
}
export default ForgotPassword;