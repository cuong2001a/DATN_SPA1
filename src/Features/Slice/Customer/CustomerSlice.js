import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createCustomer,
  listCustomer,
  updateCustomer,
  removeCustomer,
  findCustomer
} from 'Services/customer';

export const CreateCustomer = createAsyncThunk('customer/create', async (customer, thunkApi) => {
  try {
    const { data } = await createCustomer(customer);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const ListCustomer = createAsyncThunk('customer/list', async (thunkApi) => {
  try {
    const { data } = await listCustomer();
    return data;
  } catch (error) {
    return error;
  }
});

export const FindCustomer = createAsyncThunk('customer/find', async (phone, thunkApi) => {
  try {
    const { data } = await findCustomer(phone);
    return data;
  } catch (error) {
    return error;
  }
});

export const UpdateCustomer = createAsyncThunk('customer/update', async (customer, thunkApi) => {
  try {
    const { data } = await updateCustomer(customer.id, customer);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const RemoveCustomer = createAsyncThunk('customer/remove', async (id, thunkApi) => {
  try {
    const { data } = await removeCustomer(id);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const initialState = {
  current: [],
  error: null,
  loading: false
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateCustomer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(CreateCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.current.push(action.payload.data);
    });

    builder.addCase(ListCustomer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ListCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(ListCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload.data;
    });

    builder.addCase(UpdateCustomer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(UpdateCustomer.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current[index] = {
        ...state.current[index],
        ...action.payload.data
      };
    });

    builder.addCase(RemoveCustomer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RemoveCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(RemoveCustomer.fulfilled, (state, action) => {
      state.loading = false;
      let index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current.splice(index, 1);
    });
  }
});

export default customerSlice.reducer;
