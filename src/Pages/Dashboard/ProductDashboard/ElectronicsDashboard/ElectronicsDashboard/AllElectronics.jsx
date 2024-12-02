import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProductApi, allProductDataValue } from "../../../../../Redux/Reducer/Slices/allProductSlice";
import { MediaCard, Navbar, Sidebar } from "../../../../../Components";
import Footer from "../../../../../Components/Footer/Footer";

const AllElectronicsDashboard = () => {
    const [filteredElectronicsData, setFilteredElectronicsData] = useState([]);
    const [brand, setBrand] = useState(null);
    const electronicsValues = useSelector(allProductDataValue);
    const dispatch = useDispatch();

    const filteredElectronics = electronicsValues?.filter((data) => data.product_category==='Electronics');
    // console.log(filteredElectronics, 'ER');

    const productKeys = ['product_image', 'product_category', 'product_description', 'product_price'];
    
    const dispalyElectronics = async() => {
        try {
            await dispatch(allProductApi()).unwrap();
        } catch(error) {
            console.log(error, 'Error');
        }
    }

    const brandHandler = (brandName) => {
        setBrand(brandName);
        const filteredElectronicsByBrand =  filteredElectronics?.filter((data) => data.product_brand===brandName);
        setFilteredElectronicsData(filteredElectronicsByBrand);
    }

    useEffect(() => {
        dispalyElectronics()
    }, [electronicsValues?.length]);

    return(
        <>
         <Navbar/>
          <div className='row'>
            <div className='col-md-2'>
                <Sidebar sidebarBrandValue={`Electronics`} brandHandler={brandHandler} />
            </div>
            <div className='col-md-10'>
                <div className='me-2'>
                {brand===null ? (
                        <MediaCard cardData={filteredElectronics} cartDataKeys={productKeys}/>
                    ):(
                        <MediaCard cardData={filteredElectronicsData} cartDataKeys={productKeys}
                        />
                    )}
                </div>
            </div>
          </div>
          <Footer/>
         
        </>

    );
}
export default AllElectronicsDashboard;