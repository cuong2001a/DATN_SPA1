import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createStaff,
  listStaff,
  updateStaff,
  removeStaff,
  readStaff,
  findStaff
} from 'Services/staff';

export const CreateStaff = createAsyncThunk('staff/create', async (staff, thunkApi) => {
  try {
    const { data } = await createStaff(staff);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const ListStaff = createAsyncThunk('staff/list', async (thunkApi) => {
  try {
    const { data } = await listStaff();
    return data;
  } catch (error) {
    return error;
  }
});

export const FindStaff = createAsyncThunk('staff/find', async (userId, thunkApi) => {
  try {
    const { data } = await findStaff(userId);
    return data;
  } catch (error) {
    return error;
  }
});

export const ReadStaff = createAsyncThunk('staff/read', async (id, thunkApi) => {
  try {
    const { data } = await readStaff(id);
    return data;
  } catch (error) {
    return error;
  }
});

export const UpdateStaff = createAsyncThunk('staff/update', async (staff, thunkApi) => {
  try {
    const { data } = await updateStaff(staff.id, staff);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const RemoveStaff = createAsyncThunk('staff/remove', async (id, thunkApi) => {
  try {
    const { data } = await removeStaff(id);
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

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateStaff.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(CreateStaff.fulfilled, (state, action) => {
      state.loading = false;
      state.current.push(action.payload.data);
    });

    builder.addCase(ListStaff.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ListStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(ListStaff.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload.data;
    });

    builder.addCase(UpdateStaff.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(UpdateStaff.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current[index] = {
        ...state.current[index],
        ...action.payload.data
      };
    });

    builder.addCase(RemoveStaff.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RemoveStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(RemoveStaff.fulfilled, (state, action) => {
      state.loading = false;
      let index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current.splice(index, 1);
    });
  }
});

export default staffSlice.reducer;
