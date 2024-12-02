import React from 'react';
import './Sidebar.css';
import { useSelector } from 'react-redux';
import { allProductDataValue } from '../../Redux/Reducer/Slices/allProductSlice';
import { Divider } from '@mui/material';

const Sidebar = (props) => {
  const { sidebarBrandValue, brandHandler } = props;
  const sidebarValues = useSelector(allProductDataValue);
  // Extract and filter unique brand names
  const uniqueBrands = Array.from(
    new Set(
      sidebarValues
        ?.filter(sidebar => sidebar?.product_category === sidebarBrandValue) // Filter by category
        ?.map(sidebar => sidebar?.product_brand) // Extract brand names
        .filter(brand => brand) // Filter out any undefined or null values
    )
  );
  return (
    <div className='sidebar-container'>
      <p className='text-center fs-5 pt-2'>Filters</p>
      <Divider className='mb-3' />
      {uniqueBrands.map((brand, index) => (
        <p 
          onClick={() => brandHandler(brand)} 
          style={{ marginLeft: 60, cursor: 'pointer' }} 
          key={index}
        >
          {brand}
        </p>
      ))}
    </div>
  );
}
export default Sidebar;