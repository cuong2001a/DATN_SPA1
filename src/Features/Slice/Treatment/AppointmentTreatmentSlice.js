import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createAppointmentTreatment,
  listAppointmentTreatment,
  updateAppointmentTreatment,
  removeAppointmentTreatment
} from 'Services/appointmentTreatment';

export const CreateAppointmentTreatment = createAsyncThunk(
  'appointment/treatment/create',
  async (Treatment, thunkApi) => {
    try {
      const { data } = await createAppointmentTreatment(Treatment);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const ListAppointmentTreatment = createAsyncThunk(
  'appointment/treatment/list',
  async (thunkApi) => {
    try {
      const { data } = await listAppointmentTreatment();
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const UpdateAppointmentTreatment = createAsyncThunk(
  'appointment/treatment/update',
  async (treatment, thunkApi) => {
    try {
      const { data } = await updateAppointmentTreatment(treatment.id, treatment);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const RemoveAppointmentTreatment = createAsyncThunk(
  'appointment/treatment/remove',
  async (id, thunkApi) => {
    try {
      const { data } = await removeAppointmentTreatment(id);
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

const appointmentTreatmentSlice = createSlice({
  name: 'appointment/treatment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateAppointmentTreatment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateAppointmentTreatment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(CreateAppointmentTreatment.fulfilled, (state, action) => {
      state.loading = false;
      state.current.unshift(action.payload.data);
    });

    builder.addCase(ListAppointmentTreatment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ListAppointmentTreatment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(ListAppointmentTreatment.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload.data;
    });

    builder.addCase(UpdateAppointmentTreatment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateAppointmentTreatment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(UpdateAppointmentTreatment.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current[index] = {
        ...state.current[index],
        ...action.payload.data
      };
    });

    builder.addCase(RemoveAppointmentTreatment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RemoveAppointmentTreatment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(RemoveAppointmentTreatment.fulfilled, (state, action) => {
      state.loading = false;
      let index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current.splice(index, 1);
    });
  }
});

export default appointmentTreatmentSlice.reducer;
