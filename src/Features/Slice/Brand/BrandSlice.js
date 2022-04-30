import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createBrand, listBrand, updateBrand, removeBrand } from 'Services/brand';
import { notifyError, notifySuccess } from 'Utils/Utils';
export const CreateBrand = createAsyncThunk('brand/create', async (brand, thunkApi) => {
  try {
    const { data } = await createBrand(brand);
    notifySuccess('Thêm thành công');
    return data;
  } catch (error) {
    notifyError('Thêm thất bại');
    return thunkApi.rejectWithValue(error);
  }
});

export const ListBrand = createAsyncThunk('brand/list', async (thunkApi) => {
  try {
    const { data } = await listBrand();
    return data;
  } catch (error) {
    return error;
  }
});

export const UpdateBrand = createAsyncThunk('brand/update', async (brand, thunkApi) => {
  try {
    const { data } = await updateBrand(brand._id, brand);
    notifySuccess('Sửa thành công');
    return data;
  } catch (error) {
    notifySuccess('Sửa thất bại');
    return thunkApi.rejectWithValue(error);
  }
});

export const RemoveBrand = createAsyncThunk('brand/remove', async (id, thunkApi) => {
  try {
    const { data } = await removeBrand(id);
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
  loading: false,
  isAuthenticated: false
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateBrand.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateBrand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(CreateBrand.fulfilled, (state, action) => {
      state.loading = false;
      state.current.push(action.payload.data);
    });

    builder.addCase(ListBrand.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ListBrand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(ListBrand.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload.data;
    });
    builder.addCase(UpdateBrand.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateBrand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(UpdateBrand.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current[index] = {
        ...state.current[index],
        ...action.payload.data
      };
    });
    builder.addCase(RemoveBrand.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RemoveBrand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(RemoveBrand.fulfilled, (state, action) => {
      state.loading = false;
      let index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current.splice(index, 1);
    });
  }
});

export default brandSlice.reducer;
