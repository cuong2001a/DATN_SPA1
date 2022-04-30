import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createAppointment,
  listAppointment,
  updateAppointment,
  removeAppointment,
  listAppointmentByPhone
} from 'Services/appointment';

export const CreateAppointment = createAsyncThunk(
  'appointment/create',
  async (appointment, thunkApi) => {
    try {
      const { data } = await createAppointment(appointment);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const ListAppointment = createAsyncThunk('appointment/list', async (thunkApi) => {
  try {
    const { data } = await listAppointment();
    return data;
  } catch (error) {
    return error;
  }
});

//lịch hẹn theo số điện thoại
export const ListAppointmentByPhone = createAsyncThunk(
  'appointment/list-by-phone',
  async (phone, thunkApi) => {
    try {
      const { data } = await listAppointmentByPhone(phone);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const UpdateAppointment = createAsyncThunk(
  'appointment/update',
  async (appointment, thunkApi) => {
    try {
      const { data } = await updateAppointment(appointment.id, appointment);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const RemoveAppointment = createAsyncThunk('appointment/remove', async (id, thunkApi) => {
  try {
    const { data } = await removeAppointment(id);
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

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateAppointment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateAppointment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(CreateAppointment.fulfilled, (state, action) => {
      state.loading = false;
      state.current.push(action.payload.data);
    });

    builder.addCase(ListAppointment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ListAppointment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(ListAppointment.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload.data;
    });

    // lịch hẹn theo số điện thoại
    builder.addCase(ListAppointmentByPhone.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ListAppointmentByPhone.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(ListAppointmentByPhone.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload.data;
    });

    builder.addCase(UpdateAppointment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateAppointment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(UpdateAppointment.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current[index] = {
        ...state.current[index],
        ...action.payload.data
      };
    });

    builder.addCase(RemoveAppointment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RemoveAppointment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(RemoveAppointment.fulfilled, (state, action) => {
      state.loading = false;
      let index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current.splice(index, 1);
    });
  }
});

export default appointmentSlice.reducer;
