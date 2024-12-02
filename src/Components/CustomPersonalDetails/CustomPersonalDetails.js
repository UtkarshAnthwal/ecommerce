import React, {useState} from 'react';
import './CustomPersonalDetails.css';
import CustomBtn from '../CustomButton/CustomBtn';
import {useNavigate} from 'react-router-dom';
import CustomHeader from '../Header/Header';
import {Modal} from 'react-bootstrap';
import {ToastContainer, toast} from 'react-toastify';
import {editProfileMsg, signUpfailureMsg} from '../../Utils/Constants/constants';
import CustomInput from '../FormFields/CustomInput';
import {confirmPasswordApi} from '../../Redux/Reducer/Slices/loginSlice';
import {useDispatch} from 'react-redux';

const CustomPersonalDetails = (props) => {
    const {name, email, phoneNumber, address} = props;
    
    const [editProfile, setEditProfile] = useState({
        name: name,
        password: JSON.parse(localStorage.getItem('client_password')),
        phoneNumber: phoneNumber,
        address: address,
        email: email,
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    // console.log(openModal, 'Modal State');

    const editFormData = [
        {label: 'Phone Number', type: `text`, name: `phoneNumber`, value: editProfile?.phoneNumber, hidden: false, disabled: true},
        {label: 'User Name', type: `text`, name: `name`, value: editProfile?.name, hidden: false, disabled: false},
        {label: 'Password', type: `text`, name: `password`, value: editProfile?.password, hidden: false, disabled: false},
        {label: 'Email Address', type: `text`, name: `email`, value: editProfile?.email, hidden: false, disabled: false},
        {label: 'Address', type: `text`, name: `address`, value: editProfile?.address, hidden: false, disabled: false},
    ];

    const editOnchangeHandler = (e) => {
        const { name, value } = e.target;
        setEditProfile((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleClose = () => {
        setOpenModal(false);
    }

    const profileHandler = async() => {
        try {
            await dispatch(confirmPasswordApi({user_name: editProfile?.name, user_email: editProfile?.email, user_phone: editProfile?.phoneNumber, user_address: editProfile?.address, user_role: JSON.parse(localStorage.getItem('client_role')), user_password: editProfile?.password})).unwrap();
            toast.success(editProfileMsg);
        } catch(error) {
            toast.error(signUpfailureMsg);
            console.log(error);
        }
    }
    
    return(
        <>
        <ToastContainer theme='dark'/>
        <CustomHeader heading={`Client Details`}/><br/><br/><br/>
        <div>
            {openModal && (
                <Modal
                    show={openModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    centered
                >
                    <Modal.Header>
                        <h3 className='text-center'>Change</h3>
                    </Modal.Header>
                    <Modal.Body>
                        {editFormData?.map((formData, index) => (
                            <CustomInput
                                key={index}
                                placeholder={formData?.label}
                                type={formData?.type} 
                                name={formData?.name} 
                                value={formData?.value} 
                                onChangeValue={editOnchangeHandler}
                                hidden={formData?.hidden}
                                disabled={formData?.disabled} 
                            />
                        ))
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <CustomBtn className='btn btn-outline-primary' btnName={`Save`} onClick={profileHandler}/>
                        <CustomBtn className='btn btn-outline-primary' btnName={`Cancel`} onClick={() => setOpenModal(false)}/>
                    </Modal.Footer>

                </Modal>
            ) 
            }
        </div>
        <div className='row'>
            <div className='col-md-4'></div>
            <div className='col-md-4 bg-light shadow pb-3 custom-details mt-5 pe-5'>
                <img className='image-container' src='data:image/png;base64,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' alt='...Images' />
                <br/><br/>
                <h4 className='text-center'>Welcome {name}</h4>
                <h6 className='mt-4'>Address : <span className='text-secondary'>{address}</span></h6>
                <h6>Email : <span className='text-secondary'>{email}</span></h6>
                <h6>Phone Number : <span className='text-secondary'>{phoneNumber}</span></h6>
                <CustomBtn className={`btn btn-outline-primary me-5`} onClick={() => navigate(-1)} btnName={`Back`}/>
                <CustomBtn className={`btn btn-outline-primary ms-5`} onClick={() => setOpenModal(true)} btnName={`Edit`}/>
            </div>
        </div>
        </>
    );
}
export default CustomPersonalDetails;