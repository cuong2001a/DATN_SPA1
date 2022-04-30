import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createProduct,
  listProduct,
  updateProduct,
  removeProduct,
  filterCategory,
  readProduct
} from 'Services/product';

export const CreateProduct = createAsyncThunk('product/create', async (product, thunkApi) => {
  try {
    const { data } = await createProduct(product);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const ListProduct = createAsyncThunk('product/list', async (thunkApi) => {
  try {
    const { data } = await listProduct();
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const ReadProduct = createAsyncThunk('product/detail', async (id, thunkApi) => {
  try {
    const { data } = await readProduct(id);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const FilterCategory = createAsyncThunk('product/filter-category', async (id, thunkApi) => {
  try {
    const { data } = await filterCategory(id);
    return data;
  } catch (error) {
    return error;
  }
});

export const UpdateProduct = createAsyncThunk('product/update', async (product, thunkApi) => {
  try {
    const { data } = await updateProduct(product._id, product);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const RemoveProduct = createAsyncThunk('product/remove', async (id, thunkApi) => {
  try {
    const { data } = await removeProduct(id);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const initialState = {
  current: [],
  detail: {},
  error: null,
  loading: false
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(CreateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.current.unshift(action.payload.data);
    });

    builder.addCase(ListProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ListProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(ListProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload.data;
    });

    builder.addCase(ReadProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ReadProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(ReadProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.detail = action.payload;
    });

    builder.addCase(FilterCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(FilterCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(FilterCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload.data;
    });

    builder.addCase(UpdateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(UpdateProduct.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current[index] = {
        ...state.current[index],
        ...action.payload.data
      };
    });

    builder.addCase(RemoveProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RemoveProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(RemoveProduct.fulfilled, (state, action) => {
      state.loading = false;
      let index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current.splice(index, 1);
    });
  }
});

export default productSlice.reducer;
