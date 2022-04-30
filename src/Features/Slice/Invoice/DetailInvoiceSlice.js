import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createDetailInvoice,
  listDetailInvoice,
  updateDetailInvoice,
  removeDetailInvoice
} from 'Services/detailInvoice';

export const CreateDetailInvoice = createAsyncThunk(
  'detailInvoice/create',
  async (detailInvoice, thunkApi) => {
    try {
      const { data } = await createDetailInvoice(detailInvoice);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const ListDetailInvoice = createAsyncThunk('detailInvoice/list', async (thunkApi) => {
  try {
    const { data } = await listDetailInvoice();
    return data;
  } catch (error) {
    return error;
  }
});

export const UpdateDetailInvoice = createAsyncThunk(
  'detailInvoice/update',
  async (detailInvoice, thunkApi) => {
    try {
      const { data } = await updateDetailInvoice(detailInvoice.id, detailInvoice);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const RemoveDetailInvoice = createAsyncThunk(
  'detailInvoice/remove',
  async (id, thunkApi) => {
    try {
      const { data } = await removeDetailInvoice(id);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const initialState = {
  current: [],
  error: null,
  loading: false
};

const detailInvoiceSlice = createSlice({
  name: 'detailInvoice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateDetailInvoice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateDetailInvoice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(CreateDetailInvoice.fulfilled, (state, action) => {
      state.loading = false;
      state.current.push(action.payload.data);
    });

    builder.addCase(ListDetailInvoice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ListDetailInvoice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(ListDetailInvoice.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload;
    });

    builder.addCase(UpdateDetailInvoice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateDetailInvoice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(UpdateDetailInvoice.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current[index] = {
        ...state.current[index],
        ...action.payload.data
      };
    });

    builder.addCase(RemoveDetailInvoice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RemoveDetailInvoice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(RemoveDetailInvoice.fulfilled, (state, action) => {
      state.loading = false;
      let index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current.splice(index, 1);
    });
  }
});

export default detailInvoiceSlice.reducer;
