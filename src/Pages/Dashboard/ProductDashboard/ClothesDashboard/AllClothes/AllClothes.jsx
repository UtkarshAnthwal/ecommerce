import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {allProductApi, allProductDataValue} from '../../../../../Redux/Reducer/Slices/allProductSlice';
import {MediaCard, Navbar, Sidebar} from '../../../../../Components/index';
import Footer from '../../../../../Components/Footer/Footer';

const ClothesDashboard = () => {
    const [filteredClothes, setFilteredClothes] = useState([]);
    const [brand, setBrand] = useState(null);
    const dispatch = useDispatch();
    const clothes = useSelector(allProductDataValue);
    // console.log(clothes, '#$%^&*(');
    const productKeys = ['product_image', 'product_category', 'product_description', 'product_price'];

    const displayclothesHandler = async() => {
        await dispatch(allProductApi()).unwrap();
    } 

    const filteredClothesData = clothes?.filter((data) => data?.product_category==='Clothes');

    const brandHandler = (brandData) => {
        setBrand(brandData);
            const filteredBrand = filteredClothesData?.filter((data) => data?.product_brand===brandData);
            // console.log(filteredBrand, '#$%^&*(');
            setFilteredClothes(filteredBrand);
    }

    useEffect(() => {
        displayclothesHandler();
    }, [clothes?.length]);

    return(
        <>  
          <Navbar/>
          <div className='row'>
            <div className='col-md-2'>
                <Sidebar sidebarBrandValue={`Clothes`} brandHandler={brandHandler} />
            </div>
            <div className='col-md-10'>
                <div className='me-2'>
                {brand===null ? (
                    <MediaCard cardData={filteredClothesData} cartDataKeys={productKeys}/>
                    ):(
                    <MediaCard cardData={filteredClothes} cartDataKeys={productKeys}/>
                )}
                </div>
            </div>
          </div>
          <Footer/>
        </>
    );
}
export default ClothesDashboard;