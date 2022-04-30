import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, listUser, updateUser, removeUser } from 'Services/user';

export const CreateUser = createAsyncThunk('user/create', async (User, thunkApi) => {
  try {
    const { data } = await createUser(User);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const ListUser = createAsyncThunk('user/list', async (thunkApi) => {
  try {
    const { data } = await listUser();
    return data;
  } catch (error) {
    return error;
  }
});

export const UpdateUser = createAsyncThunk('user/update', async (user, thunkApi) => {
  try {
    const { data } = await updateUser(user.id, user);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const RemoveUser = createAsyncThunk('user/remove', async (id, thunkApi) => {
  try {
    const { data } = await removeUser(id);
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(CreateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.current.push(action.payload.data);
    });

    builder.addCase(ListUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ListUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(ListUser.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload.data;
    });

    builder.addCase(UpdateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(UpdateUser.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current[index] = {
        ...state.current[index],
        ...action.payload.data
      };
    });

    builder.addCase(RemoveUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RemoveUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(RemoveUser.fulfilled, (state, action) => {
      state.loading = false;
      let index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current.splice(index, 1);
    });
  }
});

export default userSlice.reducer;
