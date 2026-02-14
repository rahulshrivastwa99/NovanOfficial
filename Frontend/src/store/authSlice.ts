import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// 1. Update User interface to match your Backend Response
export interface User {
  _id: string;        // Backend sends '_id', not 'id'
  name: string;
  email: string;
  isAdmin: boolean;   // Backend sends 'isAdmin', not 'role'
  token: string;      // We need this for protected routes later
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  showAuthModal: boolean;
  initialMode: 'login' | 'signup'; // New state
  isLoading: boolean;
  error: string | null;
  isLoggingOut: boolean;
}

// Helper to load user from storage safely
const loadUser = (): User | null => {
  try {
    const saved = localStorage.getItem('novan-user');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const savedUser = loadUser();

const initialState: AuthState = {
  user: savedUser,
  isLoggedIn: !!savedUser,
  showAuthModal: false,
  initialMode: 'login', // Default
  isLoading: false,
  error: null,
  isLoggingOut: false,
};

// 2. Async Thunk for Login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData: any, thunkAPI) => {
    try {
      // Connects to your real Backend
      const response = await axios.post(`${BACKEND_URL}/api/auth/login`, userData);

      // Save to localStorage so they stay logged in on refresh
      localStorage.setItem('novan-user', JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      // Returns the error message from your backend (e.g., "Invalid email or password")
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

// 3. Async Thunk for Signup
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: any, thunkAPI) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/auth/register`, userData);
      localStorage.setItem('novan-user', JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
      state.isLoggingOut = false;
      localStorage.removeItem('novan-user');
    },
    initiateLogout(state) {
      state.isLoggingOut = true;
    },
    openAuthModal(state, action: PayloadAction<{ mode?: 'login' | 'signup' } | undefined>) {
      state.showAuthModal = true;
      state.initialMode = action.payload?.mode || 'login';
      state.error = null;
    },
    closeAuthModal(state) {
      state.showAuthModal = false;
      // Reset mode after closing (optional, but good for consistency)
      state.initialMode = 'login';
    },
    clearError(state) {
      state.error = null;
    }
  },
  // 4. Handle the API states (Loading, Success, Fail)
  extraReducers: (builder) => {
    builder
      // Login Cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        // state.showAuthModal = false; // Handled in component
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Register Cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
        // state.showAuthModal = false; // Handled in component
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, initiateLogout, openAuthModal, closeAuthModal, clearError } = authSlice.actions;
export default authSlice.reducer;