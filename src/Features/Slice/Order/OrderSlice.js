import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { listOrder, updateOrder, removeOrder, orderByUser, createOrder } from 'Services/order';
import { notifyError, notifySuccess } from 'Utils/Utils';

export const ListOrder = createAsyncThunk('order/list', async (thunkApi) => {
  try {
    const { data } = await listOrder();
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const OrderByUser = createAsyncThunk('order/orderByUser', async (userId, thunkApi) => {
  try {
    const { data } = await orderByUser(userId);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const CreateOrder = createAsyncThunk('order/create', async (order, thunkApi) => {
  try {
    const { data } = await createOrder(order);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const UpdateOrder = createAsyncThunk('order/update', async (order, thunkApi) => {
  try {
    const { data } = await updateOrder(order._id, order);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const RemoveOrder = createAsyncThunk('order/remove', async (id, thunkApi) => {
  try {
    const { data } = await removeOrder(id);
    notifySuccess('Xóa thành công');
    return data;
  } catch (error) {
    notifyError('Xóa thất bại');
    return thunkApi.rejectWithValue(error);
  }
});

const initialState = {
  current: [],
  orderByUser: [],
  error: null,
  loading: false
};

const orderSlide = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ListOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ListOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(ListOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload;
    });

    builder.addCase(CreateOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(CreateOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.current.push(action.payload.data);
    });

    builder.addCase(OrderByUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(OrderByUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(OrderByUser.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload;
    });

    builder.addCase(UpdateOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(UpdateOrder.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current[index] = {
        ...state.current[index],
        ...action.payload.data
      };
    });

    builder.addCase(RemoveOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RemoveOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(RemoveOrder.fulfilled, (state, action) => {
      state.loading = false;
      let index1 = state.current.findIndex((order) => {
        return order._id === action.payload.data._id;
      });
      state.current.splice(index1, 1);

      // let index2 = state.orderByUser.findIndex((order) => {
      //   return order._id === action.payload.data._id;
      // });
      // state.orderByUser.splice(index2, 1);
    });
  }
});

export default orderSlide.reducer;
