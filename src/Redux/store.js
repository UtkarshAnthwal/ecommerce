import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './Reducer/RootReducer/rootReducer';

const store = configureStore({
    reducer: rootReducer
});

export default store;
