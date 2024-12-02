import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import html2pdf from 'html2pdf.js';
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../Router/config";
import { purchaseGetApi, purchaseValue } from "../../../Redux/Reducer/Slices/purchaseSlice";
import UnstyledSnackbarIntroduction from "../../../Components/Snackbar/Snackbar";
import { CustomBtn, CustomHeader, Footer, Navbar } from "../../../Components";
import { FaAngleLeft, FaAngleRight, FaRegUserCircle } from "react-icons/fa";
import { displayReview, reviewDataValue } from "../../../Redux/Reducer/Slices/reviewSlice";
import { FaCircleCheck } from "react-icons/fa6";
import { ImCross } from "react-icons/im";

const ConfirmPurchaseDashboard = () => {
    const [open, setOpen] = useState(false);
    const [collapsedProduct, setCollapsedProduct] = useState(null); // Track which product's reviews are visible
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userName = JSON.parse(localStorage.getItem('client_name'));
    const address = JSON.parse(localStorage.getItem('client_address'));
    const purchaseHistory = useSelector(purchaseValue);
    const reviewData = useSelector(reviewDataValue);

    const displayPurchaseHandler = async () => {
        try {
            await dispatch(purchaseGetApi({ user_name: userName })).unwrap();
        } catch (err) {
            console.log(err, 'Error');
        }
    }

    const displayReviewHandler = async (review) => {
        setCollapsedProduct(review); // Set the clicked product's review state
        try {
            await dispatch(displayReview({ review_product_id: review })).unwrap();
        } catch (error) {
            console.log(error, 'Error');
        }
    }

    const pdfHandler = () => {
        const element = document.getElementById('pdf-generator');
        const otp = {
            margin: 1,
            filename: 'generated.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(element).set(otp).save();
        setOpen(true);
    }

    useEffect(() => {
        displayPurchaseHandler();
    }, [purchaseHistory?.length > 0]);

    return (
        <div className='global-background-color'>
            {/* <CustomHeader heading={`Purchase History`} /> */}
            <Navbar/>
            <br /><br />
            {purchaseHistory && purchaseHistory?.length > 0 ?
                <div className='purchase-history'>
                    <div className='row'>
                        <div className='col-md-8'>
                            <div className='purchase-container'>
                                {purchaseHistory?.map((data, index) => {
                                    // Ensure product_details is defined and has at least one item
                                    const productDetails = data?.product_details || [];
                                    const firstProductDetail = productDetails[0] || {};
                                    return (
                                        <div className='d-flex' key={index}>
                                            <div className='d-flex bg-light shadow ms-5 mt-3 mb-3' style={{ width: 500, borderRadius: `15px` }}>
                                                <div className='pruchase-image-conatiner pt-3 pb-3'>
                                                    <img src={productDetails.map((image) => image?.product_image)[0] || ''} height={200} alt="...Images" />
                                                    <div className='ps-2'><b>Purchased On {data?.purchase_date}</b></div>
                                                </div>
                                                <div className='pruchase-detial-conatiner ps-5 pt-4 pb-3'>
                                                    {productDetails.map((image, index) =>
                                                        <div className='d-flex' key={index}>
                                                            <div>
                                                                <p><b>{image?.product_brand}</b></p>
                                                                <p>{image?.product_name}</p>
                                                                <div className='d-flex'>
                                                                    <label><b>Qty</b> : </label><p>{data?.purchase_product_quantity}</p>
                                                                </div>
                                                                <p><b>₹{data?.purchase_product_price}</b></p>
                                                            </div>
                                                            <div className='ms-5 mt-5'>
                                                                {collapsedProduct === image?.product_id
                                                                    ? <FaAngleLeft onClick={() => setCollapsedProduct(null)} size={40} />
                                                                    : <FaAngleRight onClick={() => displayReviewHandler(image?.product_id)} size={40} />}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {collapsedProduct === firstProductDetail?.product_id &&
                                                <div className='shadow shadow ms-5 ps-3 pt-2 mt-3 mb-3' style={{ width: 500, borderRadius: `15px` }}>
                                                    <h3 className='text-center'>Reviews</h3>
                                                    <p><b>Payment Mode : </b> {data?.purchase_product_payment_mode}</p>
                                                    <p><b>Payment Done : </b>
                                                        {data?.purchase_product_payment_mode === 'cash'? <ImCross color={`red`}/> : <FaCircleCheck color={`green`}/>}
                                                    </p> 
                                                    {reviewData?.map((data, index) => (
                                                        <div key={index}>
                                                            <p><FaRegUserCircle className='me-3' size={30} />{data?.user_name}</p>
                                                            <p className='ms-5'>{data?.review_title}</p>
                                                            <p className='ms-5'>{data?.review_description}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            }
                                        </div>
                                    );
                                })}
                                <div className='table-container' style={{ display: 'none' }}>
                                    <h3>Purchase History</h3>
                                    <table className='table table-light table-bordered text-center' id='pdf-generator'>
                                        <thead>
                                            <tr>
                                                <th>Images</th>
                                                <th>Category</th>
                                                <th>Brand</th>
                                                <th>Name</th>
                                                <th>Insurance</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {purchaseHistory?.map((tableData, index) => {
                                                const productDetails = tableData?.product_details || [];
                                                return (
                                                    <tr key={index}>
                                                        <td> <img src={tableData?.purchase_product_image} height={80} alt="...Images" /></td>
                                                        <td className='pt-4'>{productDetails.map((data) => data?.product_category).join(', ')}</td>
                                                        <td className='pt-4'>{productDetails.map((data) => data?.product_brand).join(', ')}</td>
                                                        <td className='pt-4'>{productDetails.map((data) => data?.product_name).join(', ')}</td>
                                                        <td className={tableData?.purchase_product_insurance === false ? 'text-danger pt-4' : 'text-success pt-4'}>
                                                            {tableData?.purchase_product_insurance === false
                                                                ? <p className='text-danger'><b>NO</b></p>
                                                                : <p className='text-success'><b>YES</b></p>}
                                                        </td>
                                                        <td className='pt-4'>₹{tableData?.purchase_product_price}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='mt-5 ms-5 me-5 shadow bg-light ps-3 rounded pt-2 pb-2 text-start'>
                                <label><b>Welcome {userName},</b></label> <br />
                                <label><b>Delivering at : </b></label> {address}<br />
                                <div className='button-container d-flex'>
                                    <CustomBtn className={`btn btn-outline-primary`} customWidth={150} btnName={`Invoice`} onClick={pdfHandler} /> &nbsp;&nbsp;
                                    <CustomBtn className={`btn btn-outline-primary`} customWidth={150} btnName={`Back`} onClick={() => navigate(Routes.AllProductDashboard)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <UnstyledSnackbarIntroduction title={`Pdf Downloaded`} open={open} setOpen={setOpen} />
                </div>
                :
                <div className='text-center'>
                    <br /><br />
                    <h3 className='mt-5'>You haven't purchased anything.....</h3>
                    <CustomBtn btnName={`Show Now`} className={`btn btn-outline-primary btn-lg mb-5 mt-5`} onClick={() => navigate(Routes.AllProductDashboard)} />
                </div>
            }
            <Footer />
        </div>
    );
}
export default ConfirmPurchaseDashboard;