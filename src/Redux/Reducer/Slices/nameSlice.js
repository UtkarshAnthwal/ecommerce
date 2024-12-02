import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    userName: [],
    price: [],
    password: [],
    address: [],
    phoneNumber: [],
    email: [],
}

const userName = createSlice({
    name:'userName',
    initialState,
    reducers:{
        nameChange: (state,action) => {
            state.userName = action.payload;
        },
        cartPrice: (state,action) => {
            state.price = action.payload;
        },
        addressChange: (state,action) => {
            state.address = action.payload;
        },
        phoneNumberChange: (state,action) => {
            state.phoneNumber = action.payload;
        },
        emailChange: (state,action) => {
            state.email = action.payload;
        },
        passwordChange: (state,action) => {
            state.password = action.payload;
        },
    }
});

export default userName.reducer;
export const { nameChange, cartPrice, addressChange, phoneNumberChange, emailChange, passwordChange } = userName.actions;
export const userNameValue = state => state.userName.userName;
export const cartPriceValue = state => state.userName.price;
export const passwordValue = state => state.userName.password;
export const emailValue = state => state.userName.email;
export const addressValue = state => state.userName.address;
export const phoneNumberValue = state => state.userName.phoneNumber;