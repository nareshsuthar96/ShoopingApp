import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';

const initialState = {
    loading: false,
    error: null,
    name: [],
};

export const signup = createAsyncThunk(
    "signup",
    async (formData, { rejectWithValue }) => {
        try {
            const data  = await axios.post("/api/signup", formData, {
                
            });
            return data.data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.name = action.payload; // Assuming name is part of the response

                
                console.log(action.payload)
                if(action.payload.status===201){
                    toast.success('signup Successfull');
                }else{
                    toast.warning("*User already exists")
                }
                
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;

                toast.error(action.payload)
            });
    }
});

export default signupSlice.reducer;
