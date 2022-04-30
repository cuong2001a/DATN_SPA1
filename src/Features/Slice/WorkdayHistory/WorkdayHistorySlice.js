import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createWorkdayHistory,
  listWorkdayHistory,
  updateWorkdayHistory,
  removeWorkdayHistory,
  findWorkDayHistoryByStaffId
} from 'Services/workdayHistory';

export const CreateWorkdayHistory = createAsyncThunk(
  'workdayHistory/create',
  async (workdayHistory, thunkApi) => {
    try {
      const { data } = await createWorkdayHistory(workdayHistory);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const ListWorkdayHistory = createAsyncThunk('workdayHistory/list', async (thunkApi) => {
  try {
    const { data } = await listWorkdayHistory();
    return data;
  } catch (error) {
    return error;
  }
});

export const UpdateWorkdayHistory = createAsyncThunk(
  'workdayHistory/update',
  async (workdayHistory, thunkApi) => {
    try {
      const { data } = await updateWorkdayHistory(workdayHistory.id, workdayHistory);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const RemoveWorkdayHistory = createAsyncThunk(
  'workdayHistory/remove',
  async (id, thunkApi) => {
    try {
      const { data } = await removeWorkdayHistory(id);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const FindWorkDayHistoryByStaffId = createAsyncThunk(
  'find/workday/history/by/staff',
  async (workdayHistory, thunkApi) => {
    try {
      const { data } = await findWorkDayHistoryByStaffId(
        workdayHistory.staffId,
        workdayHistory.day
      );
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

const workdayHistorySlice = createSlice({
  name: 'workdayHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateWorkdayHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateWorkdayHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(CreateWorkdayHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.current.push(action.payload.data);
    });

    builder.addCase(ListWorkdayHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ListWorkdayHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(ListWorkdayHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload.data;
    });

    builder.addCase(FindWorkDayHistoryByStaffId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(FindWorkDayHistoryByStaffId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(FindWorkDayHistoryByStaffId.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload.data;
    });

    builder.addCase(UpdateWorkdayHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateWorkdayHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(UpdateWorkdayHistory.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current[index] = {
        ...state.current[index],
        ...action.payload.data
      };
    });

    builder.addCase(RemoveWorkdayHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RemoveWorkdayHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(RemoveWorkdayHistory.fulfilled, (state, action) => {
      state.loading = false;
      let index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current.splice(index, 1);
    });
  }
});

export default workdayHistorySlice.reducer;
