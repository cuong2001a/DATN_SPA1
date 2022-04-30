import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createAppointmentTreatmentDetail,
  listAppointmentTreatmentDetail,
  updateAppointmentTreatmentDetail,
  removeAppointmentTreatmentDetail
} from 'Services/appointmentTreatmentDetail';

export const CreateAppointmentTreatmentDetail = createAsyncThunk(
  'appointment/treatment/detail/create',
  async (Treatment, thunkApi) => {
    try {
      const { data } = await createAppointmentTreatmentDetail(Treatment);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const ListAppointmentTreatmentDetail = createAsyncThunk(
  'appointment/treatment/detail/list',
  async (thunkApi) => {
    try {
      const { data } = await listAppointmentTreatmentDetail();
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const UpdateAppointmentTreatmentDetail = createAsyncThunk(
  'appointment/treatment/detail/update',
  async (treatment, thunkApi) => {
    try {
      const { data } = await updateAppointmentTreatmentDetail(treatment.id, treatment);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const RemoveAppointmentTreatmentDetail = createAsyncThunk(
  'appointment/treatment/detail/remove',
  async (id, thunkApi) => {
    try {
      const { data } = await removeAppointmentTreatmentDetail(id);
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

const appointmentTreatmentDetailSlice = createSlice({
  name: 'appointment/treatment/detail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateAppointmentTreatmentDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateAppointmentTreatmentDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(CreateAppointmentTreatmentDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.current.unshift(action.payload.data);
    });

    builder.addCase(ListAppointmentTreatmentDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ListAppointmentTreatmentDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(ListAppointmentTreatmentDetail.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload.data;
    });

    builder.addCase(UpdateAppointmentTreatmentDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateAppointmentTreatmentDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(UpdateAppointmentTreatmentDetail.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current[index] = {
        ...state.current[index],
        ...action.payload.data
      };
    });

    builder.addCase(RemoveAppointmentTreatmentDetail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RemoveAppointmentTreatmentDetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(RemoveAppointmentTreatmentDetail.fulfilled, (state, action) => {
      state.loading = false;
      let index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current.splice(index, 1);
    });
  }
});

export default appointmentTreatmentDetailSlice.reducer;
