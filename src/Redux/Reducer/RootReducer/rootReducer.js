import {combineReducers} from '@reduxjs/toolkit';
import allProductSlice from '../Slices/allProductSlice';
import addToCartSlice from '../Slices/addToCartSlice';
import loginSlice from '../Slices/loginSlice';
import nameSlice from '../Slices/nameSlice';
import wishlistSlice from '../Slices/wishlistSlice';
import purchaseSlice from '../Slices/purchaseSlice';
import reviewSlice from '../Slices/reviewSlice';
import adminDashboardSlice from '../Slices/AdminSlices/adminDashboardSlice';

const rootReducer = combineReducers({
    allProduct: allProductSlice,
    addToCart: addToCartSlice,
    login: loginSlice,
    userName: nameSlice,
    wishlist: wishlistSlice,
    purchase: purchaseSlice,
    review: reviewSlice,
    admin: adminDashboardSlice
});
export default rootReducer;