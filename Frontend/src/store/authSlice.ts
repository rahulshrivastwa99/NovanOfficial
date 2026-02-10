import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  showAuthModal: boolean;
}

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
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      const { email } = action.payload;
      if (email === 'admin@novan.com') {
        state.user = { id: 'admin-1', name: 'Admin', email, role: 'admin' };
      } else {
        state.user = { id: 'user-1', name: email.split('@')[0], email, role: 'user' };
      }
      state.isLoggedIn = true;
      state.showAuthModal = false;
      localStorage.setItem('novan-user', JSON.stringify(state.user));
    },
    signup(state, action: PayloadAction<{ name: string; email: string; password: string }>) {
      const { name, email } = action.payload;
      state.user = { id: 'user-' + Date.now(), name, email, role: 'user' };
      state.isLoggedIn = true;
      state.showAuthModal = false;
      localStorage.setItem('novan-user', JSON.stringify(state.user));
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem('novan-user');
    },
    openAuthModal(state) {
      state.showAuthModal = true;
    },
    closeAuthModal(state) {
      state.showAuthModal = false;
    },
  },
});

export const { login, signup, logout, openAuthModal, closeAuthModal } = authSlice.actions;
export default authSlice.reducer;
