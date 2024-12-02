import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosNewRequest from '../../../Services/Axios/axiosNewInstance';

const initialState = {
    allProductData: [],
    allProductDataById: [],
    isLoading: false,
    isError: false
};

export const allProductApi = createAsyncThunk('allProductApi', async(args, {isRejectedWithValue}) => {
    try {
        const response  = await axiosNewRequest.get('product/display_products');
        const result = response.data;
        return result;
    }
    catch(error) {
        return isRejectedWithValue(error);
    }
});

export const allProductGetByIdApi = createAsyncThunk('allProductGetByIdApi', async(id, {isRejectedWithValue}) => {
    try {
        const response  = await axiosNewRequest.get(`product/display_products_by_id/${id}`);
        const result = response.data;
        return result;
    }
    catch(error) {
        return isRejectedWithValue(error);
    }
});

const allProductSlice = createSlice({
    name: 'allProduct',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(allProductApi.pending, (state,action) => {
            state.isLoading = true;
        })
        .addCase(allProductApi.fulfilled, (state,action) => {
            state.isLoading = false;
            state.allProductData = action.payload;
        })
        .addCase(allProductApi.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })
        .addCase(allProductGetByIdApi.pending, (state,action) => {
            state.isLoading = true;
        })
        .addCase(allProductGetByIdApi.fulfilled, (state,action) => {
            state.isLoading = false;
            state.allProductDataById = action.payload;
        })
        .addCase(allProductGetByIdApi.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })
    }
});
export const allProductDataValue = (state) => state?.allProduct?.allProductData;
export const allProductDataByIdValue = (state) => state?.allProduct?.allProductDataById;
export default allProductSlice.reducer;    