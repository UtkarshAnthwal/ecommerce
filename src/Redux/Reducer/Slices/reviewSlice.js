import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosNewRequest from "../../../Services/Axios/axiosNewInstance";

const initialState = {
    reviewData: [],
    isLoading: false,
    isError: false
};


export const displayReview = createAsyncThunk('displayReview', async(args, {isRejectedWithValue}) => {
    try {
        const response  = await axiosNewRequest.post('review/display_review',args);
        const result = response.data;
        return result;
    }
    catch(error) {
        return isRejectedWithValue(error);
    }
});

export const addReviewApi = createAsyncThunk('addReviewApi', async(args, {isRejectedWithValue}) => {
    try {
        const response  = await axiosNewRequest.post('review/add_review',args);
        const result = response.data;
        return result;
    }
    catch(error) {
        return isRejectedWithValue(error);
    }
});

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(displayReview.pending, (state,action) => {
            state.isLoading = true;
        })
        .addCase(displayReview.fulfilled, (state,action) => {
            state.isLoading = false;
            state.reviewData = action.payload;
        })
        .addCase(displayReview.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })
        .addCase(addReviewApi.pending, (state,action) => {
            state.isLoading = true;
        })
        .addCase(addReviewApi.fulfilled, (state,action) => {
            state.isLoading = false;
            state.reviewData = action.payload;
        })
        .addCase(addReviewApi.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })
    }
});
export const reviewDataValue = (state) => state.review.reviewData;
export default reviewSlice.reducer;    