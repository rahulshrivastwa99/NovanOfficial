import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
  color: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: OrderItem[];
}

interface OrderState {
  orders: Order[];
}

// Load initial state from localStorage if available
const loadState = (): OrderState => {
  try {
    const serializedState = localStorage.getItem('orders');
    if (serializedState === null) {
      return { orders: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { orders: [] };
  }
};

const initialState: OrderState = loadState();

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    placeOrder: (state, action: PayloadAction<Order>) => {
      state.orders.unshift(action.payload);
      localStorage.setItem('orders', JSON.stringify(state));
    },
    updateOrderStatus: (state, action: PayloadAction<{ id: string; status: Order['status'] }>) => {
      const order = state.orders.find((o) => o.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
        localStorage.setItem('orders', JSON.stringify(state));
      }
    },
  },
});

export const { placeOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
