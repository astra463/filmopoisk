import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type AuthState = {
  isAuthenticated: boolean;
  isPending: boolean;
}

interface LoginData {
  username: string;
  password: string;
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem('token') ? true : false,
  isPending: false
};

export const login = createAsyncThunk(
  'auth/login',
  async (loginData: LoginData) => {
    try {
      const response = await fetch('http://localhost:3030/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      localStorage.setItem('token', data.token); 
      return data.token;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state) => {
      state.isAuthenticated = true;
      state.isPending = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.isAuthenticated = false;
      state.isPending = false;
    });
    builder.addCase(login.pending, (state) => {
      state.isAuthenticated = false;
      state.isPending = true;
    });
  },
});

export const { logout, setIsAuthenticated } = userSlice.actions;
export default userSlice.reducer;
