import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosNewRequest from '../../../Services/Axios/axiosNewInstance';

const initialState = {
    wishlistData: [],
    isLoading: false,
    isError: false
};

export const wishlistGetApi = createAsyncThunk('wishlistGetApi', async(args, {isRejectedWithValue}) => {
    try {
        const response  = await axiosNewRequest.post('wishlist/display_wishlist', args);
        const result = response.data;
        return result;
    }
    catch(error) {
        return isRejectedWithValue(error);
    }
});

export const wishlistPostApi = createAsyncThunk('wishlistPostApi', async(args, {isRejectedWithValue}) => {
    try {
        const response  = await axiosNewRequest.post('wishlist/add_to_wishlist',args);
        const result = response.data;
        return result;
    }
    catch(error) {
        return isRejectedWithValue(error);
    }
});

export const wishlistDeleteApi = createAsyncThunk('wishlistDeleteApi', async(id, {isRejectedWithValue}) => {
    try {
        const response  = await axiosNewRequest.delete(`wishlist/remove_wishlist/${id}`);
        const result = response.data;
        return result;
    }
    catch(error) {
        return isRejectedWithValue(error);
    }
});

// export const addToCartPutApi = createAsyncThunk('addToCartPutApi', async(args, {isRejectedWithValue}) => {
//     try {
//         const response  = await axiosRequest.post(`addToCart/${args?.product_id}`,args);
//         const result = response.data;
//         return result;
//     }
//     catch(error) {
//         return isRejectedWithValue(error);
//     }
// });

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(wishlistGetApi.pending, (state,action) => {
            state.isLoading = true;
        })
        .addCase(wishlistGetApi.fulfilled, (state,action) => {
            state.isLoading = false;
            state.wishlistData = action.payload;
        })
        .addCase(wishlistGetApi.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })
        .addCase(wishlistPostApi.pending, (state,action) => {
            state.isLoading = true;
        })
        .addCase(wishlistPostApi.fulfilled, (state,action) => {
            state.isLoading = false;
            state.wishlistData = action.payload;
        })
        .addCase(wishlistPostApi.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })
        .addCase(wishlistDeleteApi.pending, (state,action) => {
            state.isLoading = true;
        })
        .addCase(wishlistDeleteApi.fulfilled, (state,action) => {
            state.isLoading = false;
            const deletedCartData = action.payload;
            state.wishlistData = state.wishlistData?.filter(user => user?.wishlist_product_id !== deletedCartData?.wishlist_product_id);
        })
        .addCase(wishlistDeleteApi.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })
        // .addCase(addToCartPutApi.pending, (state,action) => {
        //     state.isLoading = true;
        // })
        // .addCase(addToCartPutApi.fulfilled, (state,action) => {
        //     state.isLoading = false;
        //     const deletedCartData = action.payload;
        //     state.wishlistData = state.wishlistData.filter(user => user.product_id !== deletedCartData.product_id);
        // })
        // .addCase(addToCartPutApi.rejected, (state,action) => {
        //     state.isLoading = false;
        //     state.isError = action.payload;
        // })
    }
});
export const wishlistValue = (state) => state.wishlist.wishlistData;
export default wishlistSlice.reducer;    