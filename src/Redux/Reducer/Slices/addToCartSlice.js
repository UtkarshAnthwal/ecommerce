import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosRequest from '../../../Services/Axios/axiosInstance';
import axiosNewRequest from '../../../Services/Axios/axiosNewInstance';

const initialState = {
    addToCartData: [],
    isLoading: false,
    isError: false
};

export const addToCartGetApi = createAsyncThunk('addToCartGetApi', async(args, {isRejectedWithValue}) => {
    try {
        const response  = await axiosNewRequest.post('add_to_cart/display_cart', args);
        const result = response.data;
        return result;
    }
    catch(error) {
        return isRejectedWithValue(error);
    }
});

export const addToCartPostApi = createAsyncThunk('addToCartPostApi', async(args, {isRejectedWithValue}) => {
    try {
        // const response  = await axiosNewRequest.post('cart/add_to_cart',args);
        const response  = await axiosNewRequest.post('add_to_cart/post_cart',args);
        const result = response.data;
        return result;
    }
    catch(error) {
        return isRejectedWithValue(error);
    }
});

export const addToCartDeleteApi = createAsyncThunk('addToCartDeleteApi', async(id, {isRejectedWithValue}) => {
    try {
        const response  = await axiosNewRequest.delete(`add_to_cart/remove_cart_data/${id}`);
        const result = response.data;
        return result;
    }
    catch(error) {
        return isRejectedWithValue(error);
    }
});

export const  addToCartDeleteAllUserApi = createAsyncThunk('addToCartDeleteAllUserApi', async(values, {isRejectedWithValue}) => {
    try {
        const response = await axiosNewRequest.delete(`add_to_cart/remove_all_cart_data/${values}`);
        const result = response.data;
        return result;
    } 
    catch(error) {
        return isRejectedWithValue(error);
    }
});

export const addToCartPutApi = createAsyncThunk('addToCartPutApi', async(args, {isRejectedWithValue}) => {
    try {
        const response  = await axiosRequest.post(`addToCart/${args?.product_id}`,args);
        const result = response.data;
        return result;
    }
    catch(error) {
        return isRejectedWithValue(error);
    }
});

const addToCartSlice = createSlice({
    name: 'addToCart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addToCartGetApi.pending, (state,action) => {
            state.isLoading = true;
        })
        .addCase(addToCartGetApi.fulfilled, (state,action) => {
            state.isLoading = false;
            state.addToCartData = action.payload;
        })
        .addCase(addToCartGetApi.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })
        .addCase(addToCartPostApi.pending, (state,action) => {
            state.isLoading = true;
        })
        .addCase(addToCartPostApi.fulfilled, (state,action) => {
            state.isLoading = false;
            state.addToCartData = action.payload;
        })
        .addCase(addToCartPostApi.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })
        .addCase(addToCartDeleteApi.pending, (state,action) => {
            state.isLoading = true;
        })
        .addCase(addToCartDeleteApi.fulfilled, (state,action) => {
            state.isLoading = false;
            const deletedCartData = action.payload;
            state.addToCartData = state.addToCartData.filter(user => user?.product_id !== deletedCartData?.product_id);
        })
        .addCase(addToCartDeleteApi.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })
        .addCase(addToCartPutApi.pending, (state,action) => {
            state.isLoading = true;
        })
        .addCase(addToCartPutApi.fulfilled, (state,action) => {
            state.isLoading = false;
            const deletedCartData = action.payload;
            state.addToCartData = state.addToCartData.filter(user => user.product_id !== deletedCartData.product_id);
        })
        .addCase(addToCartPutApi.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })
        .addCase(addToCartDeleteAllUserApi.pending, (state,action) => {
            state.isLoading = true;
        })
        .addCase(addToCartDeleteAllUserApi.fulfilled, (state,action) => {
            state.isLoading = false;
            const deletedCartData = action.payload;
            console.log(deletedCartData, action.payload, 'DDDDDD');
            state.addToCartData = state.addToCartData?.filter(user => user?.user_name !== deletedCartData?.message);
        })
        .addCase(addToCartDeleteAllUserApi.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })
    }
});
export const addToCartDataValue = (state) => state.addToCart.addToCartData;
export default addToCartSlice.reducer;    