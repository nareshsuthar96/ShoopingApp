import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: [],
    totalQuantity: 0,
    totalPrice: 0,
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        AddToCart: (state, action) => {
            let find = state.cart.findIndex(item => item._id === action.payload._id);
            if (find >= 0) {
                state.cart[find].quantity += 1; // Fixing the typo (quantity)
            } else {
                state.cart.push({ ...action.payload, quantity: 1 }); // Default quantity is 1
            }
        },

        getCartTotal: (state) => {
            let { totalQuantity, totalPrice } = state.cart.reduce(
                (cartTotal, cartItem) => {
                    const { PPrice, quantity } = cartItem; // Consistent naming (quantity)
                    const itemTotal = PPrice * quantity;
                    cartTotal.totalPrice += itemTotal;
                    cartTotal.totalQuantity += quantity;
                    return cartTotal;
                },
                {
                    totalQuantity: 0,
                    totalPrice: 0,
                }
            );
            state.totalPrice = parseFloat(totalPrice.toFixed(2)); // More precise totalPrice
            state.totalQuantity = totalQuantity;
        },

        removeItem: (state, action) => {
            state.cart = state.cart.filter(iteam => iteam._id !== action.payload);
        },

        increaseItemQuantity: (state, action) => {
            state.cart = state.cart.map(iteam => {
                if (iteam._id === action.payload) {
                    return { ...iteam, quantity: iteam.quantity + 1 }; // Consistent naming
                }
                return iteam;
            });
        },

        decreaseItemQuantity: (state, action) => {
            state.cart = state.cart.map(item => {
                if (item._id === action.payload && item.quantity > 0) {
                    return { ...item, quantity: item.quantity - 1 }; // Consistent naming
                }
                return item;
            });
        },
    },
});

export const { AddToCart, getCartTotal, removeItem, increaseItemQuantity, decreaseItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
