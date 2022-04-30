import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createInvoice, listInvoice, updateInvoice, removeInvoice } from 'Services/invoice';

export const CreateInvoice = createAsyncThunk('invoice/create', async (invoice, thunkApi) => {
  try {
    const { data } = await createInvoice(invoice);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const ListInvoice = createAsyncThunk('invoice/list', async (thunkApi) => {
  try {
    const { data } = await listInvoice();
    return data;
  } catch (error) {
    return error;
  }
});

export const UpdateInvoice = createAsyncThunk('invoice/update', async (invoice, thunkApi) => {
  try {
    const { data } = await updateInvoice(invoice.id, invoice);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const RemoveInvoice = createAsyncThunk('invoice/remove', async (id, thunkApi) => {
  try {
    const { data } = await removeInvoice(id);
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

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateInvoice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateInvoice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(CreateInvoice.fulfilled, (state, action) => {
      state.loading = false;
      state.current.push(action.payload.data);
    });

    builder.addCase(ListInvoice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ListInvoice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(ListInvoice.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload;
    });

    builder.addCase(UpdateInvoice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateInvoice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(UpdateInvoice.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current[index] = {
        ...state.current[index],
        ...action.payload.data
      };
    });

    builder.addCase(RemoveInvoice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RemoveInvoice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(RemoveInvoice.fulfilled, (state, action) => {
      state.loading = false;
      let index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current.splice(index, 1);
    });
  }
});

export default invoiceSlice.reducer;
