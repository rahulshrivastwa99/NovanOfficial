import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./index";

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
  reviews: any[];
  rating: number;
  numReviews: number;
  user?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProductState {
  items: Product[];
  page: number;
  pages: number;
  count: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  reviewStatus: "idle" | "loading" | "succeeded" | "failed";
  reviewError: string | null;
}

const initialState: ProductState = {
  items: [],
  page: 1,
  pages: 1,
  count: 0,
  status: "idle",
  error: null,
  reviewStatus: "idle",
  reviewError: null,
};

// --- ASYNC THUNKS ---

// Interface for Fetch Products Parameters
export interface FetchProductsParams {
  keyword?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  pageNumber?: number;
}

// 1. Fetch All Products (with filters/pagination)
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (
    params: FetchProductsParams = {},
    { rejectWithValue }
  ) => {
    try {
      // Convert object to query string
      // filter out undefined/null/empty strings if needed, but URLSearchParams handles basics
      const queryParams = new URLSearchParams();

      if (params.keyword) queryParams.append("keyword", params.keyword);
      if (params.category && params.category !== 'all') queryParams.append("category", params.category);
      if (params.minPrice) queryParams.append("minPrice", params.minPrice);
      if (params.maxPrice) queryParams.append("maxPrice", params.maxPrice);
      if (params.pageNumber) queryParams.append("pageNumber", params.pageNumber.toString());

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products?${queryParams.toString()}`,
      );
      return response.data; // { products, page, pages, count }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// 2. Create Product (Admin Only)
export const createProduct = createAsyncThunk(
  "products/create",
  async (productData: FormData, { getState, rejectWithValue }) => {
    try {
      // Get the admin token
      const {
        auth: { user },
      } = getState() as RootState;

      const config = {
        headers: {
          "Content-Type": "multipart/form-data", // Required for image upload
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`,
        productData,
        config,
      );
      return data; // Returns the newly created product
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

// 3. Create Product Review
export const createReview = createAsyncThunk(
  "products/createReview",
  async (
    { productId, review }: { productId: string; review: { rating: number; comment: string } },
    { getState, rejectWithValue }
  ) => {
    try {
      const {
        auth: { user },
      } = getState() as RootState;

      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}/reviews`,
        review,
        config
      );
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Optional: Add a reducer to clear errors or reset status if needed
    resetProductStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
    resetReviewStatus: (state) => {
      state.reviewStatus = "idle";
      state.reviewError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // --- Fetch Products Cases ---
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Backend now returns { products, page, pages, count }
        // We use 'items' for products to match existing code usage (mostly)
        // If the backend returns an array (old behavior fallback), handle that
        if (Array.isArray(action.payload)) {
          state.items = action.payload;
          state.page = 1;
          state.pages = 1;
          state.count = action.payload.length;
        } else {
          state.items = action.payload.products;
          state.page = action.payload.page;
          state.pages = action.payload.pages;
          state.count = action.payload.count;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // --- Create Product Cases ---
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // --- Create Review Cases ---
      .addCase(createReview.pending, (state) => {
        state.reviewStatus = "loading";
      })
      .addCase(createReview.fulfilled, (state) => {
        state.reviewStatus = "succeeded";
      })
      .addCase(createReview.rejected, (state, action) => {
        state.reviewStatus = "failed";
        state.reviewError = action.payload as string;
      });
  },
});

export const { resetProductStatus, resetReviewStatus } = productSlice.actions;
export default productSlice.reducer;
