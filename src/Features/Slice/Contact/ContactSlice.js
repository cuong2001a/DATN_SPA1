import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createContact, listContact, updateContact, removeContact } from 'Services/contact';

export const CreateContact = createAsyncThunk('contact/create', async (contact, thunkApi) => {
  try {
    const { data } = await createContact(contact);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const ListContact = createAsyncThunk('Contact/list', async (thunkApi) => {
  try {
    const { data } = await listContact();
    return data;
  } catch (error) {
    return error;
  }
});

export const UpdateContact = createAsyncThunk('contact/update', async (contact, thunkApi) => {
  try {
    const { data } = await updateContact(contact.id, contact);
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const RemoveContact = createAsyncThunk('contact/remove', async (id, thunkApi) => {
  try {
    const { data } = await removeContact(id);
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

const ContactSlice = createSlice({
  name: 'Contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(CreateContact.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(CreateContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(CreateContact.fulfilled, (state, action) => {
      state.loading = false;
      state.current.push(action.payload.data);
    });

    builder.addCase(ListContact.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ListContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(ListContact.fulfilled, (state, action) => {
      state.loading = false;
      state.current = action.payload.data;
    });

    builder.addCase(UpdateContact.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(UpdateContact.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current[index] = {
        ...state.current[index],
        ...action.payload.data
      };
    });

    builder.addCase(RemoveContact.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(RemoveContact.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    builder.addCase(RemoveContact.fulfilled, (state, action) => {
      state.loading = false;
      let index = state.current.findIndex((tutorial) => {
        return tutorial._id === action.payload.data._id;
      });
      state.current.splice(index, 1);
    });
  }
});

export default ContactSlice.reducer;
