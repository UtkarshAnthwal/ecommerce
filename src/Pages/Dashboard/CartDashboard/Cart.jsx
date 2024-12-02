import React from "react";
import "./Cart.css";
import {useSelector, useDispatch} from 'react-redux';
import {addToCartDataValue, addToCartDeleteApi, addToCartGetApi} from "../../../Redux/Reducer/Slices/addToCartSlice";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {CustomBtn, CustomButton, CustomHeader, Footer} from "../../../Components/index";
import {useNavigate} from "react-router-dom";
import {Routes} from "../../../Router/config";
import {ToastContainer, toast} from "react-toastify";
import {cartPrice} from "../../../Redux/Reducer/Slices/nameSlice";
import CustomBackButton from "../../../Components/CustomButton/CustomBackButton";
import { wishlistPostApi } from "../../../Redux/Reducer/Slices/wishlistSlice";
import { cartDeleteMsg, wishlistMsg } from "../../../Utils/Constants/constants";

const CartDashboard = () => {
    const [price, setPrice] = React.useState();
    const [gst, setGst] = React.useState();
    const [totalPrice, setTotalPrice] = React.useState();
    const userName = JSON.parse(localStorage.getItem('client_name'));
    const cart = useSelector(addToCartDataValue);
    console.log(cart, 'Cart Data');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const image_keys =["product_image"];
    const keys = [
        "product_description", 
        // "product_type", 
        // "product_ram", 
        // "product_internal_memory", 
        "product_color", 
        "product_price", 
        "product_size", 
        "product_quantity"
    ];

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date();

    const purchaseHandler = async() => {
        dispatch(cartPrice(totalPrice));
        navigate(Routes.Purchase);
    }

    const shopNowHandler = () => {
        navigate(Routes.AllProductDashboard);
    }

    const cartDataHandler = async() => {
        try {
           await dispatch(addToCartGetApi({user_name: userName})).unwrap();
        } catch (ex) {
            console.error(ex);
        }
    }

    const deleteCartData = async(data) => {
        try{
            await dispatch(addToCartDeleteApi(data?.product_id)).unwrap();
            await dispatch(addToCartGetApi({user_name: userName})).unwrap();
            toast.error(cartDeleteMsg);
        } catch(error) {
            console.log(error);
        }
    }

    const wishListHandler = async(wishlist) => {
        console.log(wishlist?.product_details[0]?.product_category, 'Save To Later');
        if(wishlist?.product_details[0]?.product_category === 'Electronics' && wishlist?.product_details[0]?.product_type === 'Laptop') {
            await dispatch(wishlistPostApi({
                wishlist_product_id: wishlist?.product_id,
                wishlist_product_description: wishlist?.product_description,
                wishlist_product_color: wishlist?.product_color,
                wishlist_product_ram: wishlist?.product_ram_latop,
                wishlist_product_price: wishlist?.product_price,
                wishlist_product_quantity: wishlist?.product_quantity,
                wishlist_product_insurance: wishlist?.product_insurance,
                user_address: wishlist?.user_address,
                user_role: wishlist?.user_role,
                user_name: wishlist?.user_name
            })).unwrap();
            await dispatch(addToCartDeleteApi(wishlist?.product_id)).unwrap();
            await dispatch(addToCartGetApi({user_name: userName})).unwrap();
            toast.success(wishlistMsg);
        }
        if(wishlist?.product_details[0]?.product_category === 'Electronics' && wishlist?.product_details[0]?.product_type === 'Mobile') {
            await dispatch(wishlistPostApi({
                wishlist_product_id: wishlist?.product_id,
                wishlist_product_description: wishlist?.product_description,
                wishlist_product_color: wishlist?.product_color,
                wishlist_product_ram: wishlist?.product_ram,
                wishlist_product_internal_memory: wishlist?.product_internal_memory,
                wishlist_product_price: wishlist?.product_price,
                wishlist_product_quantity: wishlist?.product_quantity,
                wishlist_product_insurance: wishlist?.product_insurance,
                user_address: wishlist?.user_address,
                user_role: wishlist?.user_role,
                user_name: wishlist?.user_name
            })).unwrap();
            await dispatch(addToCartDeleteApi(wishlist?.product_id)).unwrap();
            await dispatch(addToCartGetApi({user_name: userName})).unwrap();
            toast.success(wishlistMsg);
        }
        if(wishlist?.product_details[0]?.product_category === 'Clothes') {
            await dispatch(wishlistPostApi({
                wishlist_product_id: wishlist?.product_id,
                wishlist_product_description: wishlist?.product_description,
                wishlist_product_color: wishlist?.product_color,
                wishlist_product_price: wishlist?.product_price,
                wishlist_product_quantity: wishlist?.product_quantity,
                wishlist_product_size: wishlist?.product_size,
                wishlist_product_insurance: wishlist?.product_insurance,
                user_address: wishlist?.user_address,
                user_role: wishlist?.user_role,
                user_name: wishlist?.user_name
            })).unwrap();
            await dispatch(addToCartDeleteApi(wishlist?.product_id)).unwrap();
            await dispatch(addToCartGetApi({user_name: userName})).unwrap();
            toast.success(wishlistMsg);
        }
        if(wishlist?.product_details[0]?.product_category === 'Bag') {
            await dispatch(wishlistPostApi({
                wishlist_product_id: wishlist?.product_id,
                wishlist_product_description: wishlist?.product_description,
                wishlist_product_brand: wishlist?.product_brand,
                wishlist_product_category: wishlist?.product_category,
                wishlist_product_type: wishlist?.product_type,
                wishlist_product_color: wishlist?.product_color,
                wishlist_product_price: wishlist?.product_price,
                wishlist_product_quantity: wishlist?.product_quantity,
                wishlist_product_insurance: wishlist?.product_insurance,
                user_name: wishlist?.user_name
            })).unwrap();
            await dispatch(addToCartDeleteApi(wishlist?.product_id)).unwrap();
            await dispatch(addToCartGetApi({user_name: userName})).unwrap();
            toast.success(wishlistMsg);
        }
    }

    React.useEffect(() => {
        cartDataHandler();
        if (cart?.length) {
            let sum = 0;
            for (let i = 0; i < cart?.length; i++) {
                // sum += (cart[i]?.product_price)*(cart[i]?.product_quantity);
                sum += (cart[i]?.product_price);
            }
            setPrice(sum);
            const tempGst = (4.5*(sum))/100;
            setGst(tempGst);
            const tempTotal = price + gst;
            setTotalPrice(tempTotal);
        }
    }, [cart?.length > 0, totalPrice, gst, price]);

    return (
        <>
            <div className="global-background-color">
                <CustomHeader heading={`My Cart`}/><br/><br/><br/><br/>    
                {cart?.length > 0 ? ( 
                    <div className="row">
                        <ToastContainer theme='dark'/>
                        <div className="col-md-1"></div>
                        <div className="col-md-6">
                                {cart?.map((cart, index) => (
                                <div className="cart-container mb-3">
                                    <div key={index} >
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div>
                                                        <img src={cart?.product_details?.map((data) => (data?.product_image))} alt="...Images" height={200} key={index} /><br/>
                                                        <div className="quantity-container pt-2 pb-2">
                                                        {keys?.map((cartKeys, index) => (
                                                            cartKeys==='product_quantity' &&
                                                            <p className="ps-3" key={index}><b>Qty : {cart?.[cartKeys]}</b></p>
                                                        ))}
                                                        </div>
                                                    </div>   
                                                </div>
                                                <div className="col-md-6">
                                                    <div className='pt-3'>
                                                        {keys?.map((cartKeys, index) => (
                                                            cartKeys!=='product_price' && cartKeys!=='product_size' && cartKeys!=='product_quantity' &&
                                                            <p key={index} className=''>{cart?.[cartKeys]}</p>
                                                        ))}
                                                        {keys?.map((cartKeys, index) => (
                                                            cartKeys==='product_price' &&
                                                                <p className="fs-5" key={index}><b>₹{cart?.[cartKeys]}</b></p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                    <span className="ps-2">Delivery on {date?.getDate()}&nbsp;{daysOfWeek[date.getDay()]},&nbsp;{date.getFullYear()}</span> || <span className="text-success">Free Delivery</span>
                                    <div className="btn-container d-flex">
                                        <CustomButton btnName={`SAVE FOR LATER`} customColor={`white`} customBorderColor={`#686D76`} customHeight={50} customWidth={380} btnHandler={() => wishListHandler(cart)} customBackgroundColor={`#686D76`}/>
                                        <CustomButton btnName={`REMOVE`} customColor={`white`} customBorderColor={`#D10363`} customHeight={50} customWidth={380} btnHandler={() => deleteCartData(cart)} customBackgroundColor={`#D10363`}/>
                                    </div>    
                                </div>
                                ))}
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-3">
                            {cart?.length>0 ? (
                                <div>
                                    <table className="table shadow" style={{'padding': 100}}>
                                        <tbody>
                                            <tr>
                                                <th className="text-center" colSpan={2}>Product Details</th>
                                            </tr>
                                            <tr>
                                                <th>Total Products </th>
                                                <td className="text-center">{cart?.length}</td>
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
                                    <div className='d-grid gap-2 mx-auto'>
                                        <CustomBtn btnName={`Purchase`} customWidth={300}  className={`btn btn-outline-success`} onClick={purchaseHandler}/>
                                        <button className='btn' onClick={() => navigate(-1)} style={{'width': 300, 'height': 36, 'borderColor': 'black'}}>Back</button>
                                    </div>
                                </div>
                            ):(<></>)}
                        </div>
                    </div>
                ) :
                (
                    <div className="row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4 text-center">
                            <ShoppingCartIcon sx={{fontSize: 100}} />
                            <p className="text-secondary fs-6">Cart is Empty</p>
                            <CustomBtn className={`btn btn-outline-primary mb-5`} btnName={`Shop Now`} onClick={shopNowHandler} />
                        </div>
                    </div>
                )}  
            </div>
            <Footer/>
        </>
    );
}
export default CartDashboard;