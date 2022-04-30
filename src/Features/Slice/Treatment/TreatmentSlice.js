import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createTreatment,
  listTreatment,
  updateTreatment,
  removeTreatment
} from 'Services/treatment';
import { notifyError, notifySuccess } from 'Utils/Utils';

export const CreateTreatment = createAsyncThunk('treatment/create', async (Treatment, thunkApi) => {
  try {
    const { data } = await createTreatment(Treatment);
    notifySuccess('Tạo liệu trình thành công');
    return data;
  } catch (error) {
    notifyError('Tạo liệu trình thất bại ');
    return thunkApi.rejectWithValue(error);
  }
});

export const ListTreatment = createAsyncThunk('treatment/list', async (thunkApi) => {
  try {
    const { data } = await listTreatment();
    return data;
  } catch (error) {
    return error;
  }
});

export const UpdateTreatment = createAsyncThunk('treatment/update', async (treatment, thunkApi) => {
  try {
    const { data } = await updateTreatment(treatment._id, treatment);
    notifySuccess('Cập nhật liệu trình thành công');
    return data;
  } catch (error) {
    notifyError('Cập nhật liệu trình thất bại ');
    return thunkApi.rejectWithValue(error);
  }
});

export const RemoveTreatment = createAsyncThunk('treatment/remove', async (id, thunkApi) => {
  try {
    const { data } = await removeTreatment(id);
    notifySuccess('Xóa liệu trình thành công');
    return data;
  } catch (error) {
    notifyError('Xóa liệu trình thất bại ');
    return thunkApi.rejectWithValue(error);
  }
});

const initialState = {
  current: [],
  error: null,
  loading: false
};

const TreatmentSlice = createSlice({
  name: 'treatment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateTreatment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateTreatment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(CreateTreatment.fulfilled, (state, action) => {
      state.loading = false;
      state.current.unshift(action.payload.data);
    });

    builder.addCase(ListTreatment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ListTreatment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(ListTreatment.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload.data;
    });

    builder.addCase(UpdateTreatment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateTreatment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(UpdateTreatment.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current[index] = {
        ...state.current[index],
        ...action.payload.data
      };
    });

    builder.addCase(RemoveTreatment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RemoveTreatment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(RemoveTreatment.fulfilled, (state, action) => {
      state.loading = false;
      let index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current.splice(index, 1);
    });
  }
});

export default TreatmentSlice.reducer;
