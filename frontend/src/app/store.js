import { configureStore } from '@reduxjs/toolkit'
import SignupReducer from "../features/signupSlice"
import LoginReducer from "../features/loginSlice"
import ProductReducer from "../features/ProductSlice"
import cartReducer from "../features/cartSlice"
import UserReducer from "../features/userSlice"

export const store = configureStore({
  reducer: {
    signup : SignupReducer,
    login : LoginReducer,
    product : ProductReducer,
    allcart : cartReducer,
    users : UserReducer
  },
})