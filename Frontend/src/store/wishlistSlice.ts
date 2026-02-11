import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';
import { toast } from 'sonner';

interface WishlistState {
  items: Product[];
}

// Load initial state from localStorage if available
const loadState = (): WishlistState => {
  try {
    const serializedState = localStorage.getItem('wishlist');
    if (serializedState === null) {
      return { items: [] };
    }
    const state = JSON.parse(serializedState);
    // basic validation to ensure items have _id
    if (state.items && state.items.length > 0 && !state.items[0]._id) {
      return { items: [] }; // Reset if old schema
    }
    return state;
  } catch (err) {
    return { items: [] };
  }
};

const initialState: WishlistState = loadState();

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.some((item) => item._id === action.payload._id);
      if (!exists) {
        state.items.push(action.payload);
        toast.success("Added to Wishlist");
      } else {
        toast.info("Already in Wishlist");
      }
      localStorage.setItem('wishlist', JSON.stringify(state));
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      toast.success("Removed from Wishlist");
      localStorage.setItem('wishlist', JSON.stringify(state));
    },
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex((item) => item._id === action.payload._id);
      if (index >= 0) {
        state.items.splice(index, 1);
        toast.success("Removed from Wishlist");
      } else {
        state.items.push(action.payload);
        toast.success("Added to Wishlist");
      }
      localStorage.setItem('wishlist', JSON.stringify(state));
    }
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
