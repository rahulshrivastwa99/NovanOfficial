import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './index';

// Interface matching your Mongoose Schema
export interface OrderItem {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: string;
  size?: string;
  color?: string;
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Order {
  _id?: string;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid?: boolean;
  isDelivered?: boolean;
  status?: string;
  user?: User | string; // ID or object
  createdAt?: string;
  paidAt?: string;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
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
    } catch (error) {
       
      const err = error as any;
      return rejectWithValue(err.response?.data?.message || err.message);
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
    } catch (error) {
       
      const err = error as any;
      return rejectWithValue(err.response?.data?.message || err.message);
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
    } catch (error) {
       
      const err = error as any;
      return rejectWithValue(err.response?.data?.message || err.message);
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