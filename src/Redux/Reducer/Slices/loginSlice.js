import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosNewRequest from "../../../Services/Axios/axiosNewInstance";

const initialState = {
    loginData: [],
    isLoading: false,
    isError: false
};


export const authenticatedUserDetails = createAsyncThunk('authenticatedUserDetails', async(args, {isRejectedWithValue}) => {
    try {
        const response  = await axiosNewRequest.post('auth_services/forgot_password',args);
        const result = response.data;
        return result;
    }
    catch(error) {
        return isRejectedWithValue(error);
    }
});

export const confirmPasswordApi = createAsyncThunk('confirmPasswordApi', async(args, {isRejectedWithValue}) => {
    try {
        const response = await axiosNewRequest.post('auth_services/change_password', args);
        const result = response.data;
        return result;
    } catch(error) {
        return isRejectedWithValue(error);
    }
});

export const authenticateUserApi = createAsyncThunk('authenticateUserApi', async(args, {isRejectedWithValue}) => {
    try {
        const response  = await axiosNewRequest.post('auth_services/authenticate_user',args);
        const result = response.data;
        return result;
    }
    catch(error) {
        return isRejectedWithValue(error);
    }
});

export const signUpApi = createAsyncThunk('signUpApi', async(args, {isRejectedWithValue}) => {
    try {
        const response  = await axiosNewRequest.post('auth_services/sign_up',args);
        const result = response.data;
        return result;
    }
    catch(error) {
        return isRejectedWithValue(error);
    }
});

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(authenticatedUserDetails.pending, (state,action) => {
            state.isLoading = true;
        })
        .addCase(authenticatedUserDetails.fulfilled, (state,action) => {
            state.isLoading = false;
            state.loginData = action.payload;
        })
        .addCase(authenticatedUserDetails.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })
        .addCase(authenticateUserApi.pending, (state,action) => {
            state.isLoading = true;
        })
        .addCase(authenticateUserApi.fulfilled, (state,action) => {
            state.isLoading = false;
            state.loginData = action.payload;
        })
        .addCase(authenticateUserApi.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })
        .addCase(signUpApi.pending, (state,action) => {
            state.isLoading = true;
        })
        .addCase(signUpApi.fulfilled, (state,action) => {
            state.isLoading = false;
            state.loginData = action.payload;
        })
        .addCase(signUpApi.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = action.payload;
        })
    }
});
export const loginDataValue = (state) => state.login.loginData;
export default loginSlice.reducer;    