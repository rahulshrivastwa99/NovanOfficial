import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './index'; // Ensure this points to your store root

// Interface matching your Mongoose Schema
export interface Order {
  _id?: string;
  orderItems: any[];
  shippingAddress: any;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid?: boolean;
  isDelivered?: boolean;
  status?: string; // e.g., 'Processing'
}

interface OrderState {
  loading: boolean;
  success: boolean;
  order: Order | null;
  orders: Order[]; // For "My Orders" list
  error: string | null;
}

const initialState: OrderState = {
  loading: false,
  success: false,
  order: null,
  orders: [],
  error: null,
};

// 1. Create Order (Send to Backend)
export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (orderData: Order, { getState, rejectWithValue }) => {
    try {
      const { auth: { user } } = getState() as RootState;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.post('http://localhost:5000/api/orders', orderData, config);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// 2. Get My Orders (For Profile/Orders Page)
export const getMyOrders = createAsyncThunk(
  'order/getMyOrders',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth: { user } } = getState() as RootState;
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };

      const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.loading = false;
      state.success = false;
      state.order = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Place Order
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get My Orders
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;