import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosNewRequest from "../../../../Services/Axios/axiosNewInstance";

const initialState = {
    adminDashboardData: [],
    isLoading: false,
    isError: false
};

export const displayAdminDashboard = createAsyncThunk('displayAdminDashboard', async(args, {isRejectedWithValue}) => {
    try {
        const response  = await axiosNewRequest.get('/admin/display_dashboard');
        const result = response.data;
        return result;
    }
    catch(error) {
        return isRejectedWithValue(error);
    }
});

const adminDashboardSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(displayAdminDashboard.pending, (state,action) => {
            state.isLoading = true;
        })
        .addCase(displayAdminDashboard.fulfilled, (state,action) => {
            state.isLoading = false;
            state.adminDashboardData = action.payload;
        })
        .addCase(displayAdminDashboard.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })
    }
});
export const adminDashboardDataValue = (state) => state.admin.adminDashboardData;
export default adminDashboardSlice.reducer;    