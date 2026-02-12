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

// --- USER ACTIONS ---

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
      const { data } = await axios.post('http://localhost:5000/api/orders', orderData, config);
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
      const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
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
      const { data } = await axios.get('http://localhost:5000/api/orders', config);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// 4. Admin: Mark as Delivered
export const deliverOrder = createAsyncThunk(
  'order/deliverOrder',
  async (id: string, { getState, rejectWithValue }) => {
    try {
      const { auth: { user } } = getState() as RootState;
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      await axios.put(`http://localhost:5000/api/orders/${id}/deliver`, {}, config);
      return id; // Return ID to update local state immediately
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
      // --- Place Order ---
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

      // --- Get My Orders ---
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
      })

      // --- Admin: List Orders ---
      .addCase(listOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(listOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(listOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // --- Admin: Deliver Order ---
      .addCase(deliverOrder.fulfilled, (state, action) => {
        const order = state.orders.find((o) => o._id === action.payload);
        if (order) {
          order.isDelivered = true;
          order.status = 'Delivered';
        }
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;