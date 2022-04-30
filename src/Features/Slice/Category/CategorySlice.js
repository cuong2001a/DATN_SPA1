import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createCategory, listCategory, removeCategory, updateCategory } from 'Services/category';
import { notifyError, notifySuccess } from 'Utils/Utils';

export const CreateCategory = createAsyncThunk('category/create', async (category, thunkApi) => {
  try {
    const { data } = await createCategory(category);
    notifySuccess('Thêm thành công');
    return data;
  } catch (error) {
    notifyError('Thêm thất bại');
    return thunkApi.rejectWithValue(error);
  }
});

export const ListCategory = createAsyncThunk('category/list', async (thunkApi) => {
  try {
    const { data } = await listCategory();
    return data;
  } catch (error) {
    return error;
  }
});

export const RemoveCategory = createAsyncThunk('category/remove', async (id, thunkApi) => {
  try {
    const { data } = await removeCategory(id);
    notifySuccess('Xóa thành công');
    return data;
  } catch (error) {
    notifyError('Xóa thất bại');
    return thunkApi.rejectWithValue(error);
  }
});

export const UpdateCategory = createAsyncThunk('category/update', async (item, thunkApi) => {
  try {
    const { data } = await updateCategory(item._id, item);
    notifySuccess('Sửa thành công');
    return data;
  } catch (error) {
    notifySuccess('Sửa thất bại');
    return thunkApi.rejectWithValue(error);
  }
});

const initialState = {
  current: [],
  error: null,
  loading: false
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(CreateCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.current.push(action.payload.data);
    });

    builder.addCase(ListCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ListCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(ListCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload.data;
    });
    builder.addCase(UpdateCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(UpdateCategory.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current[index] = {
        ...state.current[index],
        ...action.payload.data
      };
    });
    builder.addCase(RemoveCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RemoveCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(RemoveCategory.fulfilled, (state, action) => {
      state.loading = false;
      let index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current.splice(index, 1);
    });
  }
});

export default categorySlice.reducer;
