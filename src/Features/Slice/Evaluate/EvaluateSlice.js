import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createEvaluate,
  listEvaluate,
  listEvaluateByProduct,
  readEvaluate,
  updateEvaluate,
  removeEvaluate
} from 'Services/evaluate';

export const CreateEvaluate = createAsyncThunk('evaluate/create', async (evaluate, thunkApi) => {
  try {
    const { data } = await createEvaluate(evaluate);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const ListEvaluate = createAsyncThunk('evaluate/list', async (thunkApi) => {
  try {
    const { data } = await listEvaluate();
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const ListEvaluateByProduct = createAsyncThunk(
  'evaluate/list-by-product',
  async (id, thunkApi) => {
    try {
      const { data } = await listEvaluateByProduct(id);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const RemoveEvaluate = createAsyncThunk('evaluate/remove', async (id, thunkApi) => {
  try {
    const { data } = await removeEvaluate(id);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const UpdateEvaluate = createAsyncThunk('evaluate/update', async (evaluate, thunkApi) => {
  try {
    const { data } = await updateEvaluate(evaluate._id, evaluate);
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

const evaluateSlice = createSlice({
  name: 'evaluate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateEvaluate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateEvaluate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(CreateEvaluate.fulfilled, (state, action) => {
      state.loading = false;
      state.current.push(action.payload.data);
    });

    builder.addCase(ListEvaluateByProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ListEvaluateByProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(ListEvaluateByProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload.data;
    });

    builder.addCase(RemoveEvaluate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RemoveEvaluate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(RemoveEvaluate.fulfilled, (state, action) => {
      state.loading = false;
      let index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current.splice(index, 1);
    });

    builder.addCase(UpdateEvaluate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateEvaluate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(UpdateEvaluate.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current[index] = {
        ...state.current[index],
        ...action.payload.data
      };
    });
  }
});

export default evaluateSlice.reducer;
