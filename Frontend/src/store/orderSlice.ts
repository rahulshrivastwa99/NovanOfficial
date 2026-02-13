import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './index';

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
  status?: string;
  user?: any;
  createdAt?: string;
  trackingInfo?: {
    id: string;
    courier: string;
    status: string;
  };
}

interface OrderState {
  loading: boolean;
  success: boolean;
  order: Order | null;
  orders: Order[]; // For "My Orders" and Admin list
  error: string | null;
}

const initialState: OrderState = {
  loading: false,
  success: false,
  order: null,
  orders: [],
  error: null,
};

// 1. Create Order
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
      // Use ENV variable or localhost fallback
      const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const { data } = await axios.post(`${url}/api/orders`, orderData, config);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 2. Get My Orders
export const getMyOrders = createAsyncThunk(
  'order/getMyOrders',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth: { user } } = getState() as RootState;
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const { data } = await axios.get(`${url}/api/orders/myorders`, config);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// --- ADMIN ACTIONS ---

// 3. Admin: Get All Orders
export const listOrders = createAsyncThunk(
  'order/listOrders',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth: { user } } = getState() as RootState;
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const { data } = await axios.get(`${url}/api/orders`, config);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 4. Admin: Deliver / Ship Order
export const deliverOrder = createAsyncThunk(
  'order/deliverOrder',
  async (
    arg: { id: string; courier?: string; trackingId?: string; status?: string },
    { getState, rejectWithValue }
  ) => {
    try {
      console.log("REDUX THUNK RECEIVED ARG:", arg);
      const { id, courier, trackingId, status } = arg;

      const { auth: { user } } = getState() as RootState;
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

      // Send data to backend
      const { data } = await axios.put(
        `${url}/api/orders/${id}/deliver`,
        { courier, trackingId, status },
        config
      );
      return data; // Return full updated order
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
      .addCase(placeOrder.pending, (state) => { state.loading = true; })
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
      .addCase(getMyOrders.pending, (state) => { state.loading = true; })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Admin List Orders
      .addCase(listOrders.pending, (state) => { state.loading = true; })
      .addCase(listOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(listOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Admin Deliver Order
      .addCase(deliverOrder.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        // Update the specific order in the list without refreshing
        const index = state.orders.findIndex((o) => o._id === updatedOrder._id);
        if (index !== -1) {
          state.orders[index] = updatedOrder;
        }
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;