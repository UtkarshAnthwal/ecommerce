import React, { useEffect, useState } from "react";
import './CustomDetail.css';
import {useNavigate, useParams} from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";
import { addToCartPostApi } from "../../Redux/Reducer/Slices/addToCartSlice";
import { cartMsg, reviewSuccessfull } from "../../Utils/Constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { TiTick } from "react-icons/ti"
import { Divider } from "@mui/material";
import Footer from "../Footer/Footer";
import CustomBackButton from "../CustomButton/CustomBackButton";
import { allProductApi, allProductDataByIdValue, allProductDataValue, allProductGetByIdApi } from "../../Redux/Reducer/Slices/allProductSlice";
import CustomBtn from "../CustomButton/CustomBtn";
import { FaAngleRight, FaRegUserCircle } from "react-icons/fa";
import { addReviewApi, displayReview, reviewDataValue } from "../../Redux/Reducer/Slices/reviewSlice";
import { Modal } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";

const CustomDetail = () => {
    const {id} = useParams();
    // console.log(id, 'Product Id');
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [review, setReview] = useState(false);
    // console.log(review, 'Review');
    const navigate = useNavigate(); 
    const [changeColor, setChangeColor] = React.useState(false);
    const [color, setColor] = React.useState('');
    // console.log(color , 'Color');
    const [ram, setRam] = React.useState('');
    // console.log(ram, 'Ram');
    const [internalMemory, setInternalMemory] = React.useState('');
    // console.log(internalMemory, 'InternalMemory');
    const [size, setSize] = React.useState('S');
    console.log(size, 'Size');
    const [quantity, setQuantity] = React.useState(1);
    // console.log(quantity , 'Quantity');
    const [exchange, setExchange] = React.useState();
    console.log(exchange, 'Exchange');
    const [isChecked, setIsChecked] = React.useState(false);
    console.log(isChecked, 'Checked');
    const dispatch = useDispatch();
    const reviewValue = useSelector(reviewDataValue);
    // console.log(reviewValue, '#$%^&');
    const productValue= useSelector(allProductDataValue);
    const userName = JSON.parse(localStorage.getItem('client_name'));
    console.log(userName, 'User Name');
    const userAddress = JSON.parse(localStorage.getItem('client_address'));
    const userRole = JSON.parse(localStorage.getItem('client_role'));
    const productDetails = useSelector(allProductDataByIdValue);
    console.log(productDetails, 'Details');
    const temp_product_id = productDetails?.product_id;
    // console.log(temp_product_id, 'temp_product_id');
    const exchnagePrice = productDetails?.product_price - 15000;
    const sizeArr = ['S', 'M', 'L' , 'XL', 'XXL'];
    const ramArr = ['6GB', '8GB', '12GB', '16GB'];
    const internalMemoryArr = ['64GB', '128GB', '256GB', '1TB'];
    const quantityArr = [1,2,3,4,5,6,7,8,9,10];
    const insurancePrice = (8*(productDetails?.product_price))/100;
    const filteredProductByCategory = productValue?.filter(data => data?.product_type === productDetails?.product_type);
    const filteredBagProduct = productValue?.filter(data => data?.product_type === 'Laptop Bag');
    const displayFilteredProducts = filteredProductByCategory.length > 0 ? filteredProductByCategory.slice(0, 5) : filteredProductByCategory;
    const displayFilteredBagProduct = filteredBagProduct.length > 0 ? filteredBagProduct.slice(0, 2) : filteredBagProduct;

    const keys = [
        {label: '',value: 'product_description'},
        // {label: '',symbol: '₹', value: 'product_price'}, 
    ];
    const mobileKeys = [
        {label:'Brand', value: 'product_brand'},
        {label:'Model Name', value: 'product_name'},
        {label:'Color', value: 'product_color'},
        {label:'Screen', value: 'product_screen'},
        {label:'Operating System', value: 'product_operating_system'},
        {label:'Processor', value: 'product_processor'},
    ];  
    const laptopKeys = [
        {label:'Brand', value: 'product_brand'},
        {label:'Model Name', value: 'product_name'},
        {label:'RAM', value: 'product_ram_latop'}, 
        {label:'Hard Disk', value: 'product_hard_disk'},
        {label:'CPU Model', value: 'product_cpu_model'},
        {label:'Color', value: 'product_color'},
        {label:'Screen Size', value: 'product_screen_size'},
        {label:'Operating System', value: 'product_operating_system'},
        {label:'Graphic Card', value: 'product_graphic_card'},
        {label:'Special Feature', value: 'product_special_feature'},
    ];  
                
    const phoneDetails = `${productDetails?.product_brand} ${productDetails?.product_name} (${ram === '' ? productDetails?.product_ram:ram} RAM ${internalMemory === '' ? productDetails?.product_internal_memory:internalMemory} Storage) | ${productDetails?.product_processor} | ${productDetails?.product_screen}`;
    
    const addToCartHandler = async() => {
        try {
            if(productDetails?.product_type === 'Mobile') {
                await dispatch(addToCartPostApi(
                    {
                        product_id: productDetails?.product_id,
                        product_description: phoneDetails,
                        product_color: color === '' ? productDetails?.product_color : color,
                        product_ram: ram === '' ? productDetails?.product_ram : ram,
                        product_internal_memory: internalMemory === '' ? productDetails?.product_internal_memory : internalMemory,
                        product_price: isChecked===true? productDetails?.product_price+insurancePrice : productDetails?.product_price*quantity,
                        product_quantity: quantity,
                        product_insurance: isChecked,
                        user_address: userAddress,
                        user_role: userRole,
                        user_name: userName
                    }
                )).unwrap();
            }
            if(productDetails?.product_type === 'Laptop') {
                await dispatch(addToCartPostApi(
                    {
                        product_id: productDetails?.product_id,
                        product_description: productDetails?.product_description,
                        product_color: color === '' ? productDetails?.product_color : color,
                        product_ram: productDetails?.product_ram_latop,
                        product_price: isChecked===true? productDetails?.product_price+insurancePrice : productDetails?.product_price*quantity,
                        product_quantity: quantity,
                        product_insurance: isChecked,
                        user_address: userAddress,
                        user_role: userRole,
                        user_name: userName
                    }
                )).unwrap();
            }
            if(productDetails?.product_category === 'Clothes') {
                await dispatch(addToCartPostApi(
                    {
                        product_id: productDetails?.product_id,
                        product_description: productDetails?.product_description,
                        product_color:  color === '' ? productDetails?.product_color : color,
                        product_size: size,
                        product_price: productDetails?.product_price*quantity,
                        product_quantity: quantity,
                        product_insurance: isChecked,
                        user_address: userAddress,
                        user_role: userRole,
                        user_name: userName
                    }
                )).unwrap();
            }
            if(productDetails?.product_category === 'Bag') {
                await dispatch(addToCartPostApi(
                    {
                        product_id: productDetails?.product_id,
                        product_description: productDetails?.product_description,
                        product_color: color === '' ? productDetails?.product_color : color,
                        product_warrenty: productDetails?.product_warrenty,
                        product_quantity: productDetails?.product_quantity,
                        product_price: productDetails?.product_price,
                        product_insurance: isChecked,
                        user_name: userName,
                        user_address: userAddress,
                        user_role: userRole,
                    }
                )).unwrap();
                }
            toast.success(cartMsg);
        } catch(ex) {
            console.log(ex, 'Error');
        }
    }

    const customAddToCartHandler = async(cart) => {
        console.log(cart, 'Cart MSG');
        try{
            console.log(cart?.product_category, '$%^&*(');
            if(cart?.product_category === 'Bag'){
                await dispatch(addToCartPostApi(
                   {
                        product_id: cart?.product_id,
                        product_description: cart?.product_description,
                        product_color: color === '' ? cart?.product_color : color,
                        product_warrenty: cart?.product_warrenty,
                        product_quantity: cart?.product_quantity,
                        product_price: cart?.product_price,
                        product_insurance: isChecked,
                        user_name: userName,
                        user_address: userAddress,
                        user_role: userRole,
                    }
                )).unwrap();
                toast.success(cartMsg);
            }
            if(cart?.product_type === 'Laptop'){
                await dispatch(addToCartPostApi(
                    {
                        product_id: cart?.product_id,
                        product_description: cart?.product_description,
                        product_color: color === '' ? cart?.product_color : color,
                        product_ram: cart?.product_ram_latop,
                        product_price: isChecked===true? cart?.product_price+insurancePrice : cart?.product_price*quantity,
                        product_quantity: quantity,
                        product_insurance: isChecked,
                        user_address: userAddress,
                        user_role: userRole,
                        user_name: userName
                    }
                )).unwrap();
                toast.success(cartMsg);
            }
            if(cart?.product_type === 'Mobile'){
                await dispatch(addToCartPostApi(
                    {
                        product_id: cart?.product_id,
                        product_description: phoneDetails,
                        product_color: color === '' ? cart?.product_color : color,
                        product_ram: ram === '' ? cart?.product_ram : ram,
                        product_internal_memory: internalMemory === '' ? cart?.product_internal_memory : internalMemory,
                        product_price: isChecked===true? cart?.product_price+insurancePrice : cart?.product_price*quantity,
                        product_quantity: quantity,
                        product_insurance: isChecked,
                        user_address: userAddress,
                        user_role: userRole,
                        user_name: userName
                    }
                )).unwrap();
                toast.success(cartMsg);
            }
            if(cart?.product_category === 'Clothes') {
                await dispatch(addToCartPostApi(
                    {
                        product_id: cart?.product_id,
                        product_description: cart?.product_description,
                        product_color:  color === '' ? cart?.product_color : color,
                        product_size: size,
                        product_price: cart?.product_price*quantity,
                        product_quantity: quantity,
                        product_insurance: isChecked,
                        user_address: userAddress,
                        user_role: userRole,
                        user_name: userName
                    }
                )).unwrap();
                toast.success(cartMsg);
            }
        }
        catch(error) {
            console.log(error, 'Error');
        }
    }

    const reviewHandler = async() => {
        // console.log(productDetails?.product_name);
        await dispatch(addReviewApi({user_name: JSON.parse(localStorage.getItem('client_name')), review_title: title, review_description: description, review_product_id: productDetails?.product_id, user_role: JSON.parse(localStorage.getItem('client_role'))})).unwrap();
        toast.success(reviewSuccessfull);
        await getReviewHandler();
        setTitle();
        setDescription();
        setReview(false);
    }

    const allProductHandler = async() => {
        await dispatch(allProductApi()).unwrap();
    }

    const getProductByIdHandler = async() => {
        await dispatch(allProductGetByIdApi(id)).unwrap();
    }

    const getReviewHandler = async() => {
        await dispatch(displayReview({review_product_id: temp_product_id})).unwrap();
    }

    useEffect(() => {
        allProductHandler();
        getProductByIdHandler();
    }, [productValue?.length > 0]);

    useEffect(() => {
        getReviewHandler();
    }, [reviewValue?.length > 0, temp_product_id]);

    return (
        <div className='global-background-color'>
        <ToastContainer theme='dark'/>
        {/* <div>
            <p className='text-center heading-container'>Details</p>
        </div> */}
        <Navbar/>
        <div className='row mt-4'>
            <div className='col-md-1'></div>
            <div className='col-md-3'>
                <div className="bg-light shadow">
                    <img src={productDetails?.product_image} className='' width={300} alt="...Images"/>
                    <div className='mt-3 ms-2'>
                        <span className='text-light bg-secondary pt-2 pb-2 px-2'><>Top Brand</></span><span className='ps-5 fs-5'><b>{productDetails?.product_brand}</b></span>
                        <p className='pt-2'><TiTick color="green" />91% positive ratings from 100K+ customers</p>
                        <p><TiTick color="green"/>100K+ recent orders from this brand</p>
                        <p className='pb-2'><TiTick color="green"/>9+ years on Scoobyzone</p>
                    </div>
                </div>
                {productDetails?.product_type=== 'Laptop' && 
                    <div className='laptop-bag-container '>
                        {displayFilteredBagProduct?.map((laptopBag, index) => (
                            <div className=' mb-2 bg-light shadow' key={index}>
                                <img src={laptopBag?.product_image} alt='...Bag Image' width={150}/><br/>
                                <small className='ps-3'>{laptopBag?.product_brand}</small><br/>
                                <strong className='ps-3 fs-4'>₹{laptopBag?.product_price}</strong><br/>
                                <CustomBtn btnName={`Add To Cart`} className={`btn btn-outline-warning btn-sm ms-3 mt-2 mb-2`} onClick={() => customAddToCartHandler(laptopBag)}/>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <div className='col-md-4'>
                <div className='detail-conatiner ps-2 pt-3 px-2'>
                    {keys?.map((key,index) => (
                        <div key={index}>
                            {(productDetails?.product_category === 'Electronics' && productDetails?.product_type === 'Mobile') ?
                                <>
                                    <p className='ps-2 fs-3'>{key?.symbol}{phoneDetails}</p>
                                    <p className='ps-2 fs-3'>₹{productDetails?.product_price*quantity}</p>
                                </>
                                : 
                                <>
                                    <p className='ps-2 fs-3'>{key?.symbol}{productDetails?.[key?.value]}</p>
                                    <p className='ps-2 fs-3'>₹{productDetails?.product_price*quantity}</p>
                                </>
                                
                            }
                            {/* <Link className='hover-link' to='https://www.apple.com/in/store?afid=p238%7CsdUuvv563-dc_mtid_187079nc38483_pcrid_694334137185_pgrid_109516736379_pntwk_g_pchan__pexid__ptid_kwd-10778630_&cid=aos-IN-kwgo-brand--slid---product-'>
                                Visit Apple Store
                            </Link> */}
                        </div>
                    ))}
                    <div className="emi-container pb-2">
                        <span className='ps-2'>Inclusive of all taxes</span>
                        {productDetails?.product_price>10000 && <p className='ps-2'><b>EMI</b> starts at ₹3,544. No Cost EMI available</p>}
                    </div>
                </div>
                {productDetails?.product_size &&
                    <div className='size-container detail-conatiner mt-3 pb-3'>
                        <h4 className='text-center pt-3 pb-2'>Select Size</h4>
                        <Divider className='mb-3'/>
                        {sizeArr?.map((size, index) => (
                            <button key={index} className={changeColor === false ? `btn btn-dark btn-size rounded-circle ms-4` : `btn btn-primary btn-size rounded-circle ms-4`} style={{height: 50, width: 50}} onClick={() => {setSize(size); setChangeColor(true)}}>{size}</button>
                        ))}
                    </div>
                }
                <div className='mt-3'>
                    <div className='color-container detail-conatiner pb-1'>
                        <h4 className='text-center pt-3 pb-2'>Colors Available</h4>
                        <Divider className='mb-3'/> 
                        <div className='d-flex mb-3 '>
                            {productDetails?.colors_available && productDetails?.colors_available?.map((color, index) => (
                                <div key={index} className='d-flex'>
                                    <div className='text-center rounded-circle' title={color?.label}  onClick={() => {setColor(color?.label)}} style={{border: `2px solid ${color?.color_code}`, marginLeft: 5, height:50, width: 50, backgroundColor: color?.color_code}}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
               {productDetails?.product_type === 'Mobile' &&
                    <div> 
                        <div className='ram-container detail-conatiner ps-2 pb-2 mt-3'>
                            <h4 className='text-center pt-2 pb-2'>Select Varient</h4>
                            <Divider className='mb-3'/>
                            {productDetails?.product_ram && 
                                <table className='table'>
                                    <tr>
                                        <th>Ram</th>
                                        <td>
                                            <select onChange={(e) => {setRam(e.target.value)}}>
                                                {ramArr?.map((ram, index) => (
                                                    <option key={index} value={ram}>{ram}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Internal Memory</th>
                                        <td>
                                            <select onChange={(e) => {setInternalMemory(e.target.value)}}>
                                                {internalMemoryArr?.map((internalMemory, index) => (
                                                    <option key={index} value={internalMemory}>{internalMemory}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                </table>
                            } 
                        </div>
                        <div className="detail-conatiner pb-2 mb-2 mt-3">
                            <h5 className="text-center pt-2 pb-2">Specifications</h5>
                            <Divider/>
                            {mobileKeys?.map((keys,index) => (
                                <div className="row" key={index}>
                                    <div className="col-md-4">
                                        <th className="ps-3">{keys?.label}</th>
                                    </div>
                                    <div className="col-md-8">
                                        <td className="text-start">{productDetails?.[keys?.value]}</td>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='accessories-container text-start bg-light shadow mt-3'>
                            <h5 className="text-center pt-2 pb-2">Accessories</h5>
                            <Divider/>
                            <table className='table'>
                                <tbody>
                                    <tr>
                                        <th>Charger</th>
                                        <td>{productDetails?.product_accessories[0]?.charger}</td>
                                    </tr>
                                    <tr>
                                        <th>Back Cover</th>
                                        <td>{productDetails?.product_accessories[0]?.back_cover}</td>
                                    </tr>
                                    <tr>
                                        <th>Earphones </th>
                                        <td>{productDetails?.product_accessories[0]?.earphones}</td>
                                    </tr>
                                    <tr>
                                        <th>Warrenty</th>
                                        <td>{productDetails?.product_accessories[0]?.warrenty}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> 
                    </div>
               } 
               {productDetails?.product_type === 'Laptop' && ( 
                    <div className="detail-conatiner mt-2 pb-2 mb-2">
                        <h5 className="text-center pt-2 pb-2">Specifications</h5>
                        <Divider/>
                        {laptopKeys?.map((keys,index) => (
                            <div className="row" key={index}>
                                <div className="col-md-4">
                                    <th className="ps-3">{keys?.label}</th>
                                </div>
                                <div className="col-md-8">
                                    <td className="text-start">{productDetails?.[keys?.value]}</td>
                                </div>
                            </div>
                        ))}
                    </div>
               )}
            </div>
            <div className='col-md-3'>
                {(productDetails?.product_category === 'Electronics' || productDetails?.product_category === 'Clothes' || productDetails?.product_category === 'Bag')  &&
                    (<div>
                        <div className='detail-conatiner'>
                            <div className='ps-2 pt-2 pb-2'>
                            {productDetails?.product_category === 'Electronics' && 
                                <div className='exchange-container'>
                                    <div className='without-exchange'>
                                        <b><span>With Exchange</span><br/><span style={{color: 'orange'}}>Up to ₹{exchnagePrice}</span></b>
                                        <br/>
                                        <span><b>Select Product Exchange : </b></span>
                                        <select className='mt-2 mb-2' onChange={(e) => setExchange(e.target.value)}>
                                            <option></option>
                                        </select>
                                    </div>
                                    <Divider className="mt-2 mb-2"/>
                                    <div className='with-exchange'>
                                        <b><span>Without Exchange</span><br/><span style={{color: 'orange'}}>Up to ₹{productDetails?.product_price}</span></b>
                                    </div>
                                    <Divider className='mt-2 mb-2'/>
                                </div>
                            }
                                <div className='quantity-container mt-2'>
                                    <span><b>Qty : </b>
                                     <select onChange={(e) => setQuantity(e.target.value)}>
                                        {quantityArr?.map((quantity,index)=>(
                                            <option key={index} value={quantity}>{quantity}</option>
                                        ))}
                                     </select>
                                    </span>
                                </div>
                                <div className='mt-3 pe-2 d-flex '>
                                    <CustomBackButton customClassName={`rounded text-center`} customWidth={150} customHeight={50}/>
                                    <CustomButton customClassName={`rounded  ms-2`} btnHandler={addToCartHandler} btnName={`ADD TO CART`} customWidth={150} customHeight={50} customBackgroundColor ={`#D10363`} customBorderColor={`#D10363`}/>
                                </div>
                                {productDetails?.product_category === 'Electronics' && 
                                    <>
                                        <Divider className='mt-3 mb-3'/>
                                        <div className='insurance'>
                                            <input type='checkbox' checked={isChecked} onChange={(e)=>{setIsChecked(!isChecked)}}/>&nbsp;
                                            <span><b>Insurance : </b>₹{insurancePrice}</span>
                                            <div className='d-flex'>
                                                <div><b>Note : </b>&nbsp;&nbsp;</div>
                                                <div className='pe-1'>No fees will be charged if your gaget is insured</div>
                                            </div>
                                        </div>
                                        <Divider className='mt-3 mb-3'/>
                                        <div className='other-products'>
                                            <span><b>People also buyed</b></span>
                                            <br/><br/>
                                            {productDetails?.product_type === 'Mobile' &&
                                                <div className='ms-5'>
                                                    <img src='https://m.media-amazon.com/images/I/717eHuUQ4UL._SX679_.jpg' width={100} alt={`...Images`}/><br/>
                                                    <span className=''>Tempered Glass</span><br/>
                                                    <span className=''>OpenTech Tempered Glass Screen Protector Compatible For Iphone 13/13 Pro / 14 With Edge To Edge Coverage And Easy Installation Kit For Smartphone (6.1 Inches)</span><br/>
                                                    <span className='text-start'><b>₹500</b></span><br/>
                                                </div>
                                            }
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
        <div className='related-products-container'>
            <h3 className='text-center mt-2'>You Might Also Like</h3>        
            <div className='row' style={{paddingLeft: '8%'}}>
            {displayFilteredProducts?.map((data, index) => (
                <div className='bg-light shadow ms-2 mt-2 mb-2 pt-1 pb-1 col-md-3 pt-2 rounded' style={{width: '250px'}} key={index}>  
                    <img src={data?.product_image} width={150} height={150} alt='.....Images'/><br/>
                    <small className='ps-3'>{data?.product_brand}</small><br/>
                    <small className='ps-3'>{data?.product_name} {data?.product_ram_latop} {data?.product_hard_disk}</small><br/>
                    <strong className='ps-3 fs-5'>₹{data?.product_price}</strong><br/>
                    <CustomBtn btnName={`Add To Cart`} className={`btn btn-outline-warning btn-sm ms-3 mt-2 mb-2`} onClick={() => customAddToCartHandler(data)}/>
                </div>
            ))}
            </div>
        </div>
        <div className='reviews-container'>
            <h3 className='text-center mt-3 mb-3'>Reviews</h3>
            <div className='shadow ms-5 me-5 mb-3 ps-5 pt-3 pb-3'>
                <div className='d-flex'>
                    <div>
                        <h5>Review this product</h5><br/>
                        <span>Share your thoughts with other customers</span>
                        <div className='box mt-2 text-center ps-5' style={{borderRadius: '25px', width: '250px', height: '40px', paddingTop: '5px'}}>
                            Write a review <FaAngleRight className='ms-5' onClick={() => setReview(true)}/>
                        </div>
                    </div>
                    <div>
                        {reviewValue?.length > 0 ? reviewValue?.map((reviewData, index) => (
                            <div key={index}  className='box ps-3 pt-3 mb-1 me-5' style={{width: '87%', marginLeft: '300px'}}>
                                <p><FaRegUserCircle size={20}/> <b>{reviewData?.user_name.toUpperCase()}</b></p>
                                <p className='ms-4 mb-5'>{reviewData?.review_description}</p>
                            </div>
                        )):<h5 className='text-center mb-3' style={{width: '800px', marginLeft: '300px', marginTop: '5%'}}>No Reviews Found</h5>}
                    </div>
                </div>
                {review &&
                    <Modal
                        show={review}
                        centered
                    >
                        <Modal.Header>
                            <h3 className='text-center'>Reviews</h3>
                        </Modal.Header>
                        <Modal.Body>
                                <div className=''>
                                    {/* <p><b>How would you like to rate it?</b></p> */}
                                    <p className='mt-3'><b>Title your review</b></p>
                                    <input type='text' name='title' value={title} onChange={(e) => setTitle(e.target.value)} className='text-secondary rounded' style={{width: '100%', height: '50px'}} placeholder="What's most important to know?"/>
                                    <p className='mt-3'><b>Write your review</b></p>
                                    <textarea className='text-secondary rounded' name='description' value={description} onChange={(e) => setDescription(e.target.value)} style={{width: '100%', height: '200px'}} placeholder="What did you like or dislike? What did you use this product for?"/>
                                </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <CustomBtn btnName={`Submit`} className='btn btn-outline-primary'onClick={reviewHandler}/>
                            <CustomBtn btnName={`Cancel`} className='btn btn-outline-primary'onClick={() => setReview(false)}/>
                        </Modal.Footer>
                    </Modal>
                }
            </div>
        </div>
        <Footer/>
        </div>
    );

}
export default CustomDetail;