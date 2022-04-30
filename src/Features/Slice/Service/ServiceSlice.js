import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createService, listService, updateService, removeService } from 'Services/services';
import { notifyError, notifySuccess } from 'Utils/Utils';

export const CreateService = createAsyncThunk('service/create', async (service, thunkApi) => {
  try {
    const { data } = await createService(service);

    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const ListService = createAsyncThunk('service/list', async (thunkApi) => {
  try {
    const { data } = await listService();
    return data;
  } catch (error) {
    return error;
  }
});

export const UpdateService = createAsyncThunk('service/update', async (service, thunkApi) => {
  try {
    const { data } = await updateService(service.id, service);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const RemoveService = createAsyncThunk('service/remove', async (id, thunkApi) => {
  try {
    const { data } = await removeService(id);
    notifySuccess('Xóa dịch vụ thành công');
    return data;
  } catch (error) {
    notifyError('Xóa dịch vụ thất bại');
    return thunkApi.rejectWithValue(error);
  }
});

const initialState = {
  current: [],
  error: null,
  loading: false
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(CreateService.fulfilled, (state, action) => {
      state.loading = false;
      state.current.push(action.payload.data);
    });

    builder.addCase(ListService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ListService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(ListService.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload.data;
    });

    builder.addCase(UpdateService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(UpdateService.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current[index] = {
        ...state.current[index],
        ...action.payload.data
      };
    });

    builder.addCase(RemoveService.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RemoveService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(RemoveService.fulfilled, (state, action) => {
      state.loading = false;
      let index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data?._id;
      });
      state.current.splice(index, 1);
    });
  }
});

export default serviceSlice.reducer;
