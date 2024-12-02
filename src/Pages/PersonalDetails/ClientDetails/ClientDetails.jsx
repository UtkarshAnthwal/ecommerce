import React from 'react';
import CustomPersonalDetails from '../../../Components/CustomPersonalDetails/CustomPersonalDetails';

const ClientDetails = () => {
    const userName = JSON.parse(localStorage.getItem('client_name'));
    const userEmail = JSON.parse(localStorage.getItem('client_email'));
    const userAddress = JSON.parse(localStorage.getItem('client_address'));
    const userPhoneNumber = JSON.parse(localStorage.getItem('client_phone_number'));
    
    return (
        <CustomPersonalDetails name={userName} email={userEmail} phoneNumber={userPhoneNumber} address={userAddress} />
    );
}
export default ClientDetails;