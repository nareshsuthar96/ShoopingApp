import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

const initialState = {
    loading: false,
    error: null,
    username: null,
};

export const login = createAsyncThunk(
    '/login',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/Login", data
            );
            console.log(response);
            return response.data;  
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: (state) => {
            state.loading = true;
            state.username = null;
            state.role = null;
            localStorage.removeItem('loginname');
            localStorage.removeItem('role');
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;  // reset error on pending
            })
            .addCase(login.fulfilled, (state, action) => {
                const { apiData, status } = action.payload || {}; 

                state.loading = false;
                
                if (status === 200 && apiData) {
                    state.username = apiData.username;
                    state.role = apiData.role;
                    localStorage.setItem('loginname', apiData.username);
                    localStorage.setItem('role', apiData.role);
                    toast.success("Login Successful");
                } else {
                    toast.warning("Oops something went wrong");
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Login failed";
                
                toast.error(state.error);
            });
    },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
