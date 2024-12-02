import React, { useEffect, useState } from "react";
import { CustomBtn, CustomHeader, Footer } from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import { purchasePostApi } from "../../Redux/Reducer/Slices/purchaseSlice";
import { addToCartDataValue, addToCartDeleteAllUserApi, addToCartGetApi } from "../../Redux/Reducer/Slices/addToCartSlice";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../Router/config";
import Alert from "../../Components/Alert/Alert";
import ConfirmPurchaseDashboard from "./ConfirmPurchaseDashboard/ConfirmPurchaseDashboard";
import PaymentModal from "../../Components/Modal/PaymentModal/PaymentModal";

const Purchase = () => {
    const [openPaymentModal, setOpenPaymentModal] = useState(false);
    // console.log(openPaymentModal, "Payemtn Modal");
    const [paymentMode, setPaymentMode] = useState();
    // console.log(paymentMode, 'Payment Mode');
    const [openAlert, setOpenAlert] = useState(false);
    const navigate = useNavigate();
    const userName = JSON.parse(localStorage.getItem('client_name'));
    const address = JSON.parse(localStorage.getItem('client_address'));
    const phoneNumber = JSON.parse(localStorage.getItem('client_phone_number'));
    const email = JSON.parse(localStorage.getItem('client_email'));
    const productDetails = useSelector(addToCartDataValue);
    const dispatch = useDispatch();

    const date = new Date();
    // console.log(date.toDateString());

    const displayPurchaseHandler = async () => {
        try {
            await dispatch(addToCartGetApi({ user_name: userName })).unwrap();
        } catch (err) {
            console.log(err, 'Error');
        }
    }

    const openHandler = () => {
        // setOpenAlert(true);
        setOpenPaymentModal(true);
    }

    const purchaseHandler = async () => {
        try {
            const purchase_details = productDetails?.map(product => {
                // productDetails?.map(product => {
                console.log('Product Details');
                let purchaseData = {
                    purchase_product_id: product?.product_id,
                    purchase_product_description: product?.product_description,
                    purchase_product_color: product?.product_color,
                    purchase_product_price: product?.product_price,
                    purchase_product_quantity: product?.product_quantity,
                    user_name: userName,
                    user_address: address,
                    user_phone_number: phoneNumber,
                    user_email: email,
                    purchase_product_payment_mode: paymentMode,
                    purchase_date: date.toDateString()
                };
                if (product?.product_details[0]?.product_category === 'Clothes') {
                    purchaseData = {
                        ...purchaseData,
                        purchase_product_size: product?.product_size,
                        purchase_product_gender: product?.product_details[0]?.product_gender,
                        purchase_product_insurance: false,
                    }
                } else if (product?.product_details[0]?.product_category === 'Electronics') {
                    if (product?.product_details[0]?.product_type === 'Mobile') {
                        purchaseData = {
                            ...purchaseData,
                            purchase_product_ram: product?.product_ram,
                            purchase_product_internal_memory: product?.product_internal_memory,
                            purchase_product_insurance: product?.product_insurance
                        };
                    } else if (product?.product_details[0]?.product_type === 'Laptop') {
                        purchaseData = {
                            ...purchaseData,
                            purchase_product_insurance: product?.product_insurance
                        };
                    }
                }
                return purchaseData;
            });
            await dispatch(purchasePostApi({ purchase_details })).unwrap();
            await dispatch(addToCartDeleteAllUserApi(userName)).unwrap();
        } catch (err) {
            console.log('Error during purchase:', err);
        }
        setOpenAlert(false);
        navigate(Routes.ConfirmPurhaseDashboard);
    }

    const changeDetailsHandler = () => {
        navigate(Routes.ClientDetails);
    }

    useEffect(() => {
        displayPurchaseHandler();
    }, [productDetails?.length > 0]);

    return (
        <div className='global-background-color'>
            <CustomHeader heading={`Purchase History`} />
            <br /><br />
            {openPaymentModal &&
                <PaymentModal openPaymentModal={openPaymentModal} setOpenPaymentModal={setOpenPaymentModal} purchaseHanlder={purchaseHandler} paymentMode={paymentMode} setPaymentMode={setPaymentMode}/>
            }
            {openAlert && 
                <Alert alertBodyMessage={`Are you sure that you want to purchase the products?`} alertHeaderMessage={`Payment Conformation`} alertHanlder={purchaseHandler} openAlert={openAlert} setOpenAlert={setOpenAlert}/>
            }
            <div className='row mt-5'>
                <div className='col-md-4'>
                    <div className='purchase-container'>
                        {productDetails?.map((data, index) => (
                            <div key={index}>
                                <div className='d-flex bg-light shadow ms-5 mt-3 mb-3' style={{ width: 500, borderRadius: `15px` }}>
                                    <div className='purchase-image-container pt-3 pb-3'>
                                        <img src={data?.product_details?.map((data) => data?.product_image)} height={200} alt="Product" />
                                    </div>
                                    <div className='purchase-detail-container ps-5 pt-4 pb-3'>
                                        <p>{data?.product_details?.map((data) => data?.product_brand)}</p>
                                        <p>{data?.product_details?.map((data) => data?.product_name)}</p>
                                        <div className='d-flex'>
                                            <label><b>Qty</b>: </label><p>{data?.product_quantity}</p>
                                        </div>
                                        <p><b>₹{data?.product_price * data?.product_quantity}</b></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <CustomBtn className='btn btn-outline-primary ms-5' btnName={`Confirm Purchase`} onClick={() => openHandler()}/>
                        <CustomBtn className='btn btn-outline-primary ms-5' customWidth={150} btnName={`Back`} onClick={() => navigate(-1)}/>
                    </div>
                </div>
                <div className='col-md-4'></div>
                <div className='col-md-4 bg-light shadow'>
                    <label><b>Deliver to</b></label>: {userName}<br />
                    <label><b>Deliver at</b></label>: {address}<br />
                    <label><b>Deliver at</b></label>: {phoneNumber}<br />
                    <label><b>Deliver at</b></label>: {email}<br />
                    <div className='user-detail-container mt-4'>
                        <CustomBtn className='btn btn-outline-primary ms-5' customWidth={150} btnName={`Edit Profile`} onClick={() => changeDetailsHandler()}/>
                    </div>
                </div>
            </div>
            <br/>
            <Footer />
        </div>
    );
}
export default Purchase;
