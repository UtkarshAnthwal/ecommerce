import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosNewRequest from '../../../Services/Axios/axiosNewInstance';

const initialState = {
    purchaseData: [],
    isLoading: false,
    isError: false
};

export const purchaseGetApi = createAsyncThunk('purchaseGetApi', async(values, {isRejectedWithValue}) => {
    try {
        const response  = await axiosNewRequest.post('purchase/display_purchase_history', values);
        const result = response.data;
        return result;
    }
    catch(error) {
        return isRejectedWithValue(error);
    }
});

export const purchasePostApi = createAsyncThunk('purchasePostApi', async(values, {isRejectedWithValue}) => {
    try {
        const response  = await axiosNewRequest.post('purchase/confirm_purchase_history',values);
        const result = response.data;
        return result;
    }
    catch(error) {
        return isRejectedWithValue(error);
    }
});

export const purchaseDeleteApi = createAsyncThunk('purchaseDeleteApi', async(id, {isRejectedWithValue}) => {
    try {
        const response  = await axiosNewRequest.delete(`purchase/remove_purchase_history/${id}`);
        const result = response.data;
        return result;
    }
    catch(error) {
        return isRejectedWithValue(error);
    }
});

const purchaseSlice = createSlice({
    name: 'purchase',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(purchaseGetApi.pending, (state,action) => {
            state.isLoading = true;
        })
        .addCase(purchaseGetApi.fulfilled, (state,action) => {
            state.isLoading = false;
            state.purchaseData = action.payload;
        })
        .addCase(purchaseGetApi.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })
        .addCase(purchasePostApi.pending, (state,action) => {
            state.isLoading = true;
        })
        .addCase(purchasePostApi.fulfilled, (state,action) => {
            state.isLoading = false;
            state.purchaseData = action.payload;
        })
        .addCase(purchasePostApi.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })
        .addCase(purchaseDeleteApi.pending, (state,action) => {
            state.isLoading = true;
        })
        .addCase(purchaseDeleteApi.fulfilled, (state,action) => {
            state.isLoading = false;
            const deletedCartData = action.payload;
            state.purchaseData = state.purchaseData?.filter(user => user?.purchase_product_id !== deletedCartData?.purchase_product_id);
        })
        .addCase(purchaseDeleteApi.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })
    }
});
export const purchaseValue = (state) => state.purchase.purchaseData;
export default purchaseSlice.reducer;    