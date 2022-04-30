import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createCart, cartByUser, updateCart, removeAllItem } from 'Services/cart';

export const CreateCart = createAsyncThunk('cart/create', async (cart, thunkApi) => {
  try {
    const { data } = await createCart(cart);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const CartByUser = createAsyncThunk('cart/cartByUser', async (user_id, thunkApi) => {
  try {
    const { data } = await cartByUser(user_id);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const RemoveCartByUser = createAsyncThunk('cart/removeCartByUser', async () => {
  return;
});

export const UpdateCart = createAsyncThunk('cart/update', async (cart, thunkApi) => {
  try {
    const { data } = await updateCart(cart._id, cart);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const RemoveAllItem = createAsyncThunk('cart/removeAllItem', async (id, thunkApi) => {
  try {
    const { data } = await removeAllItem(id);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const initialState = {
  current: {},
  error: null,
  loading: false,
  isAuthenticated: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(CreateCart.fulfilled, (state, action) => {
      state.loading = false;
      // state.current.push(action.payload.data);
    });

    builder.addCase(CartByUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CartByUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(CartByUser.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload.data[0];
      let totalItems = 0;
      let cart = action.payload.data[0].cart_products;
      cart.forEach((element) => {
        totalItems += element.quantity;
      });
      sessionStorage.setItem('cart', JSON.stringify(cart));
      sessionStorage.setItem('cartNumber', totalItems);
    });

    builder.addCase(RemoveCartByUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RemoveCartByUser.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(RemoveCartByUser.fulfilled, (state) => {
      state.loading = false;
      state.current = initialState.current;
    });

    builder.addCase(UpdateCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(UpdateCart.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload.data;
      let totalItems = 0;
      let cart = action.payload.data.cart_products;
      cart.forEach((element) => {
        totalItems += element.quantity;
      });
      sessionStorage.setItem('cart', JSON.stringify(cart));
      sessionStorage.setItem('cartNumber', totalItems);
      // let index = state.current.findIndex((tutorial) => {
      //   return tutorial._id === action.payload.data._id;
      // });
      // state.current[index] = {
      //   ...state.current[index],
      //   ...action.payload.data
      // };
    });

    builder.addCase(RemoveAllItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RemoveAllItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(RemoveAllItem.fulfilled, (state, action) => {
      state.loading = false;
      let index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current[index] = {
        ...state.current[index],
        ...action.payload.data
      };
    });
  }
});

export default cartSlice.reducer;
