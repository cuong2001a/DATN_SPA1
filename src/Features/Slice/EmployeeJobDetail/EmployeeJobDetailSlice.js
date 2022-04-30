import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createEmployeeJobDetail,
  listEmployeeJobDetail,
  updateEmployeeJobDetail,
  removeEmployeeJobDetail,
  updateSchedule,
  readEmployeeJobDetail,
  findStaffId
} from 'Services/employeeJobDetail';

export const CreateEmployeeJobDetail = createAsyncThunk(
  'employeeJobDetail/create',
  async (employeeJobDetail, thunkApi) => {
    try {
      const { data } = await createEmployeeJobDetail(employeeJobDetail);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const ListEmployeeJobDetail = createAsyncThunk(
  'employeeJobDetail/list',
  async (thunkApi) => {
    try {
      const { data } = await listEmployeeJobDetail();
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const FindStaffId = createAsyncThunk(
  'employeeJobDetail/findStaff',
  async (staffId, thunkApi) => {
    try {
      const { data } = await findStaffId(staffId);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const ReadEmployeeJobDetail = createAsyncThunk(
  'employeeJobDetail/read',
  async (id, thunkApi) => {
    try {
      const { data } = await readEmployeeJobDetail(id);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const UpdateEmployeeJobDetail = createAsyncThunk(
  'employeeJobDetail/update',
  async (employeeJobDetail, thunkApi) => {
    try {
      const { data } = await updateEmployeeJobDetail(employeeJobDetail.id, employeeJobDetail);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const UpdateSchedule = createAsyncThunk(
  'employeeJobDetail/update-schedule',
  async (employeeJobDetail, thunkApi) => {
    try {
      const { data } = await updateSchedule(employeeJobDetail.id, employeeJobDetail);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const RemoveEmployeeJobDetail = createAsyncThunk(
  'employeeJobDetail/remove',
  async (id, thunkApi) => {
    try {
      const { data } = await removeEmployeeJobDetail(id);
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

const EmployeeJobDetailSlice = createSlice({
  name: 'employeeJobDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateEmployeeJobDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateEmployeeJobDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(CreateEmployeeJobDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.current.push(action.payload.data);
    });

    builder.addCase(ListEmployeeJobDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ListEmployeeJobDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(ListEmployeeJobDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload.data;
    });

    builder.addCase(FindStaffId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(FindStaffId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(FindStaffId.fulfilled, (state, action) => {
      state.loading = false;
      state.current = [action.payload.data];
    });

    builder.addCase(ReadEmployeeJobDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ReadEmployeeJobDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(ReadEmployeeJobDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload.data;
    });

    builder.addCase(UpdateEmployeeJobDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateEmployeeJobDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(UpdateEmployeeJobDetail.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current[index] = {
        ...state.current[index],
        ...action.payload.data
      };
    });

    builder.addCase(UpdateSchedule.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateSchedule.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(UpdateSchedule.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current[index] = {
        ...state.current[index],
        ...action.payload.data
      };
    });

    builder.addCase(RemoveEmployeeJobDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RemoveEmployeeJobDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(RemoveEmployeeJobDetail.fulfilled, (state, action) => {
      state.loading = false;
      let index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current.splice(index, 1);
    });
  }
});

export default EmployeeJobDetailSlice.reducer;
