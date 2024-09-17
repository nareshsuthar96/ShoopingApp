import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';

const initialState = {
    products: [],
  
    items: [],
    error: null,
    loading: false,
};
export const fetchProducts = createAsyncThunk(
    "/fetchproduct",
    async( _ , {rejectWithValue}) => {
        try {
            const res = await axios.get("/api/getallproduct");
            // Return the data field only, not the entire response object
            console.log(res)
            return res.data.apiData; 
        } catch (error) {
            return rejectWithValue(error.response?.data); // Improved error handling
        }
    }
);

export const AddProduct = createAsyncThunk(
    "/addproduct",
    async (Data, { rejectWithValue }) => {
        try {
            const res = await axios.post("/api/adminproductinsertform", Data);
            return res.data; // Return the response data
        } catch (error) {
            // Pass the error response data to the rejected case
            return rejectWithValue(error.response?.data);
        }
    }
);

export const DeleteProduct = createAsyncThunk(
    "/DeleteProduct", async(id,{rejectWithValue})=>{
       try {
        const data = await axios.delete(`/api/adminproductdelete/${id}`,id);
        console.log(data)
        return data
       } catch (error) {
        return rejectWithValue(error)
       }
    }
)

export const SingleProductUpdate = createAsyncThunk(
    "/SingleProductUpdate", async(id,{rejectWithValue})=>{
       try {
        const data = await axios.get(`/api/singleproductupdate/${id}`);
        console.log(data)
        return data.data.apiData
       } catch (error) {
        return rejectWithValue(error)
       }
    }
)

export const adminfinalupdateImage = createAsyncThunk("/adminfinalupdateImage" ,async({Data1,id}, {rejectWithValue})=>{
try {
    const data = await axios.put(`/api/adminupdateImage/${id}`,Data1);
    console.log(data)
    return data
} catch (error) {
   return rejectWithValue(error)
}
})

export const adminfinalupdate = createAsyncThunk(
    "/adminfinalupdate", async ({data,id},{rejectWithValue})=>{
        try {
            const res = await axios.put(`/api/adminupdate/${id}`,data)
            return res
        } catch (error) {
           return rejectWithValue(error)
        }
    }
)

export const ShowUserProduct = createAsyncThunk(
    "/ShowUserProduct" ,async(_,{rejectWithValue})=>{
        try {
            const res = await axios.get("/api/usershowproduct")
            console.log(res)
            return res.data.apiData

        } catch (error) {
            rejectWithValue(error)
        }
    }
)





const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
          })
          .addCase(fetchProducts.fulfilled, (state, action) => {
        
    // console.log(action.payload)
            state.loading = false;
            state.products = action.payload;
          })
          .addCase(fetchProducts.rejected, (state, action) => {
            state.error = action.payload;
            
          })
            .addCase(AddProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(AddProduct.fulfilled, (state, action) => {
                state.loading = false;
                // state.products.push(action.payload);
                console.log(action.payload)
                toast.success("Your Product is Successfully Inserted")
            })
            .addCase(AddProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload?.message || "Something went wrong. Please try again.");
                
            }).addCase(DeleteProduct.pending,(state)=>{
                state.pending = true
            }).addCase(DeleteProduct.fulfilled,(state)=>{
                state.loading= false;
                toast.success("Product SuccessFully Delete")
            }).addCase(DeleteProduct.rejected,(state,action)=>{
                state.pending = false;
                state.error = action.payload
            }).addCase(SingleProductUpdate.pending,(state)=>{
                state.pending = true
            }).addCase(SingleProductUpdate.fulfilled,(state,action)=>{
                state.loading= false;
                state.items = action.payload
                
                
            }).addCase(SingleProductUpdate.rejected,(state,action)=>{
                state.pending = false;
                state.error = action.payload
            }).addCase(adminfinalupdateImage.pending,(state)=>{
                state.pending = true
            }).addCase(adminfinalupdateImage.fulfilled,(state)=>{
                state.loading= false;
                toast.success("Product Successfully Update")

            }).addCase(adminfinalupdateImage.rejected,(state,action)=>{
                state.pending = false;
                state.error = action.payload
            }).addCase(adminfinalupdate.pending,(state)=>{
                state.pending = true
            }).addCase(adminfinalupdate.fulfilled,(state)=>{
                state.loading= false;
                toast.success("Product Successfully Update")

            }).addCase(adminfinalupdate.rejected,(state,action)=>{
                state.pending = false;
                state.error = action.payload
            }).addCase(ShowUserProduct.pending,(state)=>{
                state.pending = true
            }).addCase(ShowUserProduct.fulfilled,(state,action)=>{
                state.loading= false;
                state.products =action.payload
                console.log(action.payload)

            }).addCase(ShowUserProduct.rejected,(state,action)=>{
                state.pending = false;
                state.error = action.payload
            })
    }
});

export default productSlice.reducer;
