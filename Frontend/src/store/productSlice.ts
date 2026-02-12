import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './index';

// You might need to adjust this interface based on your actual Product type
export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  stock: Record<string, number>;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  status: 'idle',
  error: null,
};

// --- ASYNC THUNKS ---

// 1. Fetch All Products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 2. Create Product (Admin Only) - This is the missing piece!
export const createProduct = createAsyncThunk(
  'products/create',
  async (productData: FormData, { getState, rejectWithValue }) => {
    try {
      // Get the admin token
      const { auth: { user } } = getState() as RootState;

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for image upload
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products`, productData, config);
      return data; // Returns the newly created product
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Optional: Add a reducer to clear errors or reset status if needed
    resetProductStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // --- Fetch Products Cases ---
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })

      // --- Create Product Cases ---
      .addCase(createProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add the new product to the local list immediately
        state.items.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { resetProductStatus } = productSlice.actions;
export default productSlice.reducer;