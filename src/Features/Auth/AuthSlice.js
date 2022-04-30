import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from 'Services/auth';

export const Login = createAsyncThunk('auth/login', async (userData, thunkApi) => {
  try {
    const { data } = await login(userData);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const UpdateToken = createAsyncThunk('update-token', async (user, thunkApi) => {
  try {
    // call api
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const Logout = createAsyncThunk('auth/logout', async (thunkApi) => {
  sessionStorage.clear();
  return;
});

const initialState = {
  current: {},
  error: null,
  loading: false,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(Login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(Login.fulfilled, (state, action) => {
      state.current = action.payload.user;
      state.loading = false;
    });
    builder.addCase(Login.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });

    builder.addCase(Logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(Logout.fulfilled, (state) => {
      state.current = initialState.current;
      state.loading = false;
    });
    builder.addCase(Logout.rejected, (state) => {
      state.loading = false;
    });
  }
});

export default authSlice.reducer;
