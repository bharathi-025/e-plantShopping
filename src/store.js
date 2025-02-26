import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer, // ✅ Manages the cart slice of the state
    },
});

export default store; // ✅ Exporting the store for global use

