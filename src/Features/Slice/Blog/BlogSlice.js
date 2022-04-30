import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createBlog, listBlog, updateBlog, removeBlog } from 'Services/blog';
import { notifyError, notifySuccess } from 'Utils/Utils';

export const CreateBlog = createAsyncThunk('blog/create', async (blog, thunkApi) => {
  try {
    const { data } = await createBlog(blog);
    notifySuccess('Thêm thành công');
    return data;
  } catch (error) {
    notifyError('Thêm thất bại');
    return thunkApi.rejectWithValue(error);
  }
});

export const ListBlog = createAsyncThunk('blog/list', async (thunkApi) => {
  try {
    const { data } = await listBlog();
    return data;
  } catch (error) {
    return error;
  }
});

export const UpdateBlog = createAsyncThunk('blog/update', async (blog, thunkApi) => {
  try {
    const { data } = await updateBlog(blog._id, blog);
    notifySuccess('Sửa thành công');
    return data;
  } catch (error) {
    notifySuccess('Sửa thất bại');
    return thunkApi.rejectWithValue(error);
  }
});

export const RemoveBlog = createAsyncThunk('blog/remove', async (id, thunkApi) => {
  try {
    const { data } = await removeBlog(id);
    notifySuccess('Xóa thành công');
    return data;
  } catch (error) {
    notifyError('Xóa thất bại');
    return thunkApi.rejectWithValue(error);
  }
});

const initialState = {
  current: [],
  error: null,
  loading: false
};

const blogSlice = createSlice({
  name: 'Blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(CreateBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.current.push(action.payload.data);
    });

    builder.addCase(ListBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ListBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(ListBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload.data;
    });
    builder.addCase(UpdateBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(UpdateBlog.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current[index] = {
        ...state.current[index],
        ...action.payload.data
      };
    });
    builder.addCase(RemoveBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RemoveBlog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(RemoveBlog.fulfilled, (state, action) => {
      state.loading = false;
      let index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current.splice(index, 1);
    });
  }
});

export default blogSlice.reducer;
