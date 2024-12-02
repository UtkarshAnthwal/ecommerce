import React from "react";
import "./Wishlist.css";
import {useSelector, useDispatch} from 'react-redux';
import {addToCartPostApi} from "../../../Redux/Reducer/Slices/addToCartSlice";
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import {CustomButton, CustomHeader, Footer} from "../../../Components/index";
import {useNavigate} from "react-router-dom";
import {Routes} from "../../../Router/config";
import {ToastContainer, toast} from "react-toastify";
import {cartPrice} from "../../../Redux/Reducer/Slices/nameSlice";
import CustomBackButton from "../../../Components/CustomButton/CustomBackButton";
import { wishlistDeleteApi, wishlistGetApi, wishlistValue } from "../../../Redux/Reducer/Slices/wishlistSlice";
import {cartMsg, wishlisDeletetMsg} from "../../../Utils/Constants/constants";

const WishlistDashboard = () => {
    const [price, setPrice] = React.useState();
    const [gst, setGst] = React.useState();
    const [totalPrice, setTotalPrice] = React.useState();
    const userName = JSON.parse(localStorage.getItem('client_name'));
    const wishlist = useSelector(wishlistValue);
    console.log(wishlist, 'Wishlist Data');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const wishlist = cartData?.filter(data => data?.user_name === userName);
    const image_keys =["product_details[0]?.product_image"];
    const keys = [
        "wishlist_product_description",  
        "wishlist_product_color", 
        "wishlist_product_price", 
        "wishlist_product_size", 
        "wishlist_product_quantity"
    ];

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date();

    const purchaseHandler = () => {
        dispatch(cartPrice(totalPrice));
        navigate(Routes.Purchase);
    }

    const shopNowHandler = () => {
        navigate(Routes.AllProductDashboard);
    }

    const cartDataHandler = async() => {
        try {
           await dispatch(wishlistGetApi({user_name: userName})).unwrap();
        } catch (ex) {
            console.error(ex);
        }
    }

    const deleteWishlistHandler = async(data) => {
        await dispatch(wishlistDeleteApi(data?.wishlist_product_id)).unwrap();
        await dispatch(wishlistGetApi({user_name: userName})).unwrap();
        toast.error(wishlisDeletetMsg);
    }

    const cartHandler = async(cart) => {
        console.log(cart, 'Save To Later');
        if(cart?.product_details[0]?.product_category === 'Electronics' && cart?.product_details[0]?.product_type === 'Laptop') {
            await dispatch(addToCartPostApi({
                product_id: cart?.wishlist_product_id,
                product_description: cart?.wishlist_product_description,
                product_color: cart?.wishlist_product_color,
                product_ram: cart?.wishlist_product_ram_latop,
                product_price: cart?.wishlist_product_price,
                product_quantity: cart?.wishlist_product_quantity,
                product_insurance: cart?.wishlist_product_insurance,
                user_address: cart?.user_address,
                user_role: cart?.user_role,
                user_name: cart?.user_name
            })).unwrap();
            await dispatch(wishlistDeleteApi(cart?.wishlist_product_id)).unwrap();
            await dispatch(wishlistGetApi({user_name: userName})).unwrap();
            toast.success(cartMsg);
        }
        if(cart?.product_details[0]?.product_category === 'Electronics' && cart?.product_details[0]?.product_type === 'Mobile') {
            await dispatch(addToCartPostApi({
                product_id: cart?.wishlist_product_id,
                product_description: cart?.wishlist_product_description,
                product_color:cart?.wishlist_product_color,
                product_ram: cart?.wishlist_product_ram,
                product_internal_memory: cart?.wishlist_product_internal_memory,
                product_price: cart?.wishlist_product_price,
                product_quantity: cart?.wishlist_product_quantity,
                product_insurance: cart?.wishlist_product_insurance,
                user_address: cart?.user_address,
                user_role: cart?.user_role,
                user_name: cart?.user_name
            })).unwrap();
            await dispatch(wishlistDeleteApi(cart?.wishlist_product_id)).unwrap();
            await dispatch(wishlistGetApi({user_name: userName})).unwrap();
            toast.success(cartMsg);
        }
        if(cart?.product_details[0]?.product_category === 'Clothes') {
            await dispatch(addToCartPostApi({
                product_id: cart?.wishlist_product_id,
                product_description: cart?.wishlist_product_description,
                product_color: cart?.wishlist_product_color,
                product_size: cart?.wishlist_size,
                product_price: cart?.wishlist_product_price,
                product_quantity: cart?.wishlist_product_quantity,
                product_insurance: cart?.wishlist_product_insurance,
                user_address: cart?.user_address,
                user_role: cart?.user_role,
                user_name: cart?.user_name,
            })).unwrap();
            await dispatch(wishlistDeleteApi(cart?.wishlist_product_id)).unwrap();
            await dispatch(wishlistGetApi({user_name: userName})).unwrap();
            toast.success(cartMsg);
        }
    }

    React.useEffect(() => {
        cartDataHandler();
        if (wishlist?.length) {
            let sum = 0;
            for (let i = 0; i < wishlist?.length; i++) {
                sum += (wishlist[i]?.wishlist_product_price)*(wishlist[i]?.wishlist_product_quantity);
            }
            setPrice(sum);
            const tempGst = (4.5*(sum))/100;
            setGst(tempGst);
            const tempTotal = price + gst;
            setTotalPrice(tempTotal);
        }
    }, [wishlist?.length > 0, totalPrice, gst, price]);

    return (
        <>
            <div className="global-background-color">
                <CustomHeader heading={`My Wishlist`}/><br/><br/><br/><br/>    
                {wishlist?.length > 0 ? ( 
                    <div className="row">
                        <ToastContainer theme='dark'/>
                        <div className="col-md-1"></div>
                        <div className="col-md-6">
                                {wishlist?.map((wishlist, index) => (
                                <div className="wishlist-container bg-light shadow mb-3">
                                    <div key={index} >
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div>
                                                        <img src={wishlist?.product_details?.map((data) => (data?.product_image))} alt="...Images" height={200} key={index} /><br/>
                                                        <div className="quantity-container pt-2 pb-2">
                                                        {keys?.map((cartKeys, index) => (
                                                            cartKeys==='wishlist_product_quantity' &&
                                                            <p className="ps-3" key={index}><b>Qty : {wishlist?.[cartKeys]}</b></p>
                                                        ))}
                                                        </div>
                                                    </div>   
                                                </div>
                                                <div className="col-md-6">
                                                    <div className='pt-3'>
                                                        {keys?.map((cartKeys, index) => (
                                                            cartKeys!=='wishlist_product_price' && cartKeys!=='wishlist_product_size' && cartKeys!=='wishlist_product_quantity' &&
                                                            <p key={index} className=''>{wishlist?.[cartKeys]}</p>
                                                        ))}
                                                        {keys?.map((cartKeys, index) => (
                                                            cartKeys==='wishlist_product_price' &&
                                                                <p className="fs-5" key={index}><b>₹{wishlist?.[cartKeys]*wishlist?.wishlist_product_quantity}</b></p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                    {/* <span className="ps-2">Delivery on {date?.getDate()}&nbsp;{daysOfWeek[date.getDay()]},&nbsp;{date.getFullYear()}</span> || <span className="text-success">Free Delivery</span> */}
                                    <div className="btn-container d-flex">
                                        <CustomButton btnName={`ADD TO CART`} customColor={`white`} customBorderColor={`#FFBF00`} customHeight={50} customWidth={345} btnHandler={() => cartHandler(wishlist)} customBackgroundColor={`#FFBF00`}/>
                                        <CustomButton btnName={`REMOVE`} customColor={`white`} customBorderColor={`#D10363`} customHeight={50} customWidth={345} btnHandler={() => deleteWishlistHandler(wishlist)} customBackgroundColor={`#D10363`}/>
                                    </div>    
                                </div>
                                ))}
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-3">
                            {wishlist?.length>0 ? (
                                <div>
                                    <table className="table table-light shadow">
                                        <tbody>
                                            <tr>
                                                <th className="text-center" colSpan={2}>Product Details</th>
                                            </tr>
                                            <tr>
                                                <th>Total Products </th>
                                                <td className="text-center">{wishlist?.length}</td>
                                            </tr>
                                            <tr>
                                                <th>Total Price</th>
                                                {/* <td className="text-success text-center">₹{price.toFixed(2)}</td> */}
                                                <td className="text-success text-center">₹{Math.round(price)}</td>
                                            </tr>
                                            <tr>
                                                <th>Dilevery Charges</th>
                                                <td className="text-success text-center">FREE</td>
                                            </tr>
                                            <tr>
                                                <th>GST</th>
                                                {/* <td className="text-center">₹{gst.toFixed(2)}</td> */}
                                                <td className="text-center">₹{Math.round(gst)}</td>
                                            </tr>
                                            <tr>
                                                <th>Total Amount</th>
                                                {/* <th className="text-center text-success">₹{totalPrice.toFixed(2)}</th> */}
                                                <th className="text-center text-success">₹{Math.round(totalPrice)}</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <CustomBackButton customWidth={162} customClassName={`rounded`}/>
                                    <CustomButton customWidth={162} customClassName={`rounded ms-2`} btnName={`Purchase`} btnHandler={purchaseHandler} customBorderColor={`#FFBF00`} customBackgroundColor={`#FFBF00`} customColor={`white`}/>
                                </div>
                            ):(<></>)}
                        </div>
                    </div>
                ) :
                (
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4 text-center">
                            <HeartBrokenIcon sx={{fontSize: 100}} />
                            <p className="text-secondary fs-6">No Favourites !!!</p>
                            <CustomButton customBorderColor={`#4B4BFF`} customBackgroundColor={`#4B4BFF`} btnName={`Show Now`} btnHandler={shopNowHandler}/>
                        </div>
                    </div>
                )}  
            </div>
            <Footer/>
        </>
    );
}
export default WishlistDashboard;