import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';
import { toast } from 'sonner';
import axios from 'axios';
import { RootState } from './index';

interface WishlistState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = (getState() as RootState);
      // Check if user and token exist
      if (!auth || !auth.user || !auth.user.token) {
        return []; // Return empty if not logged in
      }

      const config = {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      };
      const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

      const { data } = await axios.get(`${url}/api/wishlist`, config);
      return data;
    } catch (error) {
       
      const err = error as any;
      return rejectWithValue(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (product: Product, { getState, rejectWithValue }) => {
    try {
      const { auth } = (getState() as RootState);

      if (!auth || !auth.user || !auth.user.token) {
        return rejectWithValue("User not authenticated");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      };
      const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

      const { data } = await axios.post(
        `${url}/api/wishlist/add`,
        { productId: product._id },
        config
      );
      toast.success("Added to Wishlist");
      return data;
    } catch (error) {
       
      const err = error as any;
      toast.error(err.response?.data?.message || "Failed to add to wishlist");
      return rejectWithValue(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (productId: string, { getState, rejectWithValue }) => {
    try {
      const { auth } = (getState() as RootState);

      if (!auth || !auth.user || !auth.user.token) {
        return rejectWithValue("User not authenticated");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      };
      const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

      const { data } = await axios.post(
        `${url}/api/wishlist/remove`,
        { productId },
        config
      );
      toast.success("Removed from Wishlist");
      return data;
    } catch (error) {
       
      const err = error as any;
      toast.error(err.response?.data?.message || "Failed to remove from wishlist");
      return rejectWithValue(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  }
);

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearWishlistLocal: (state) => {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add to Wishlist
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      // Remove from Wishlist
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { clearWishlistLocal } = wishlistSlice.actions;

export default wishlistSlice.reducer;

