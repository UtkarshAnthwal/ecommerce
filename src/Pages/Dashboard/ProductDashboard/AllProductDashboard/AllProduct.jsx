import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './AllProduct.css'
import {useSelector, useDispatch} from 'react-redux';
import {allProductApi, allProductDataValue} from '../../../../Redux/Reducer/Slices/allProductSlice';
import {addToCartGetApi, } from '../../../../Redux/Reducer/Slices/addToCartSlice';
import {MediaCard, Navbar} from '../../../../Components/index';
import Footer from '../../../../Components/Footer/Footer';
import background5 from '../../../../Utils/Images/background5.jpg';

const AllProductDashboard = () => {
    const [product, setProduct] = React.useState([]);
    console.log(product, 'Product');
    const userName = JSON.parse(localStorage.getItem('client_name'));
    const allProduct = useSelector(allProductDataValue);
    // console.log(allProduct, '3456789');
    const productKeys = ['product_image', 'product_brand', 'product_description', 'product_price'];
    const dispatch = useDispatch();

    const allProductHandler = async() => {
       try{
        await dispatch(allProductApi()).unwrap();
       } catch(e) {
        console.error(e);
       }
    }

    const displayCartHandler = async() => {
        try{
            await dispatch(addToCartGetApi()).unwrap();
        } catch(ex) {
            console.log(ex);
        }
    }

    React.useEffect(() => {
        allProductHandler();
    }, []);

    React.useEffect(() => {
        setProduct(allProduct);
    }, [allProduct?.length>0, product]);

    React.useEffect(() => {
        displayCartHandler();
    }, [])

    return(
        <>
          <Navbar/>
          <div className='row  global-background-color'>
            <div className='mb-2'>
                {/* <img src={background5} width='100%' /> */}
                <div className='image-cover-container'>
                    <img className='background-image' src={background5} alt='Background' />
                    <div className='centered-text'>
                        {/* Welcome to <b>U-Commerce</b> – Where Your Shopping Journey Begins! Discover exclusive deals, trending products, and exceptional customer service. Happy Shopping!*/}
                        Welcome, {userName}! Discover amazing deals and trending products just for you. Happy Shopping!
                    </div>    
                </div>
            </div>
            <div className='col-md-12'>
               <div className='mx-3'>
                    <MediaCard cardData={product} cartDataKeys={productKeys} />
                </div>
            </div>
            <Footer/>
          </div>
        </>
    );
}
export default AllProductDashboard;