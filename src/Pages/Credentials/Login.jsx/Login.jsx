import React, { useEffect, useState } from "react";
import './Login.css';
import {CustomInput, CustomBtn} from "../../../Components";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authenticateUserApi, loginDataValue, signUpApi} from "../../../Redux/Reducer/Slices/loginSlice";
import {Routes} from "../../../Router/config";
import {ToastContainer, toast} from "react-toastify";
import {loginFailureMsg, signUpSuccessfullMsg, signUpfailureMsg} from "../../../Utils/Constants/constants";
import {Divider} from "@mui/material";

const LoginForm = () => {
    const [signUpStatus, setSignUpStatus] = useState(false);
    const [login, setLogin] = useState({
        name: '',
        phoneNumber: '',
        password: '',
        address: '',
        email: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formData = [
        {type: 'text', name: `phoneNumber`, value: login?.phoneNumber, placeholder: `Phone Number`, isHidden: false},
        {type: 'password', name: `password`, value: login?.password, placeholder: `Password`, isHidden: false},
    ]

    const signUpFormData = [
        {type: 'text', name: `name`, value: login?.name, placeholder: `Name`, isHidden: false},
        {type: 'password', name: `password`, value: login?.password, placeholder: `Password`, isHidden: false},
        {type: 'text', name: `phoneNumber`, value: login?.phoneNumber, placeholder: `Phone Number`, isHidden: false},
        {type: 'email', name: `email`, value: login?.email, placeholder: `Email Address`, isHidden: false},
        {type: 'text', name: `phoneNumber`, value: login?.phoneNumber, placeholder: `Phone Number`, isHidden: false},
    ]
    
    const credentialHandler = async () => {
        try {
            const result = await dispatch(authenticateUserApi({user_phone: login?.phoneNumber, user_password: login?.password})).unwrap();
            if(result) {
                localStorage.setItem('client_name', JSON.stringify(result?.user_name));
                localStorage.setItem('client_phone_number', JSON.stringify(result?.user_phone));
                localStorage.setItem('client_email', JSON.stringify(result?.user_email));
                localStorage.setItem('client_address', JSON.stringify(result?.user_address));
                localStorage.setItem('client_password', JSON.stringify(result?.user_password));
                localStorage.setItem('client_role', JSON.stringify(result?.user_role));
                if(result?.user_role === 'client') {
                    navigate(Routes.AllProductDashboard);
                } else {
                    navigate(Routes.Admin);
                }
            } else {
                toast.error(loginFailureMsg);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const signUpHandler = async() => {
        setSignUpStatus(true);
        try {
            const result = await dispatch(signUpApi({user_phone: login?.phoneNumber, user_password: login?.password})).unwrap();
            if(result) {
                toast.success(signUpSuccessfullMsg);
            } else {
                toast.error(signUpfailureMsg);
            }
        } catch(error) {
            console.log(error);
        }
    }

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setLogin((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return(
        <>
            <div className='global-background-color'>
                <ToastContainer position='top-center' theme='dark'/>
                <div className='row'>
                    <div className='col-md-4'></div>
                    <div className='col-md-4'>
                        <div className='login-container bg-light shadow rounded text-center'>
                            <h3 className>{signUpStatus === false ? <>Login</> : <>Sign Up</>}</h3>
                            <Divider/>
                            {signUpStatus === false && formData?.map((form, index) => (
                                <div key={index}>
                                    <CustomInput
                                        type={form?.type}
                                        name={form?.name}
                                        value={form?.value}
                                        onChangeValue={changeHandler}
                                        placeholder={form?.placeholder}
                                        hidden={form?.isHidden}
                                    />
                                </div>
                            ))}
                            {signUpStatus && signUpFormData?.map((form, index) => (
                                <div key={index}>
                                    <CustomInput
                                        key={index}
                                        type={form?.type}
                                        name={form?.name}
                                        value={form?.value}
                                        onChangeValue={changeHandler}
                                        placeholder={form?.placeholder}
                                        hidden={form?.isHidden}
                                    />
                                </div>
                            ))}
                           {signUpStatus === false ? (
                            <>
                                <CustomBtn className={`btn btn-outline-primary mt-3`} onClick={credentialHandler} btnName={`Sign In`}/>
                                <CustomBtn className={`btn btn-outline-primary ms-5 mt-3`} onClick={() => setSignUpStatus(true)} btnName={`Sign Up`}/>
                            </> 
                            ) : (
                                <>
                                    <CustomBtn className={`btn btn-outline-primary mt-3`} onClick={signUpHandler} btnName={`Submit`}/>
                                    <CustomBtn className={`btn btn-outline-primary ms-5 mt-3`} onClick={() => setSignUpStatus(false)} btnName={`Back`}/>
                                </>
                            )}
                            <br/>
                            <br/>
                            {signUpStatus === false && <Link className='text-primary' onClick={() => navigate(Routes.ForgotPassword)}>Forgot Password ?</Link>}    
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default LoginForm;
