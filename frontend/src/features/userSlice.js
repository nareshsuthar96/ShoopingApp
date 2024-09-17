import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  users: [],
  loading: false,
  error: null ,

};


const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    
    const response = await axios.get(`/api/getusers`);
    console.log(response.data.apiData)
    return response.data.apiData;
  } catch (error) {
   
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response.data);
  }
});





const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

      })
  }
});

export default usersSlice.reducer;
export { fetchUsers };