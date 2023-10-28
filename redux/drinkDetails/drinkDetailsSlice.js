import { createSlice } from '@reduxjs/toolkit';
// import { fetchContacts, deleteContact, addContact } from './operations';

const handlePending = (state) => {
  state.contacts.isLoading = true;
};

const handleRejected = (state, action) => {
  state.contacts.isLoading = false;
  state.contacts.error = action.payload;
};

const initialStateDrinkDetails = {
  drinkDetails: {
    items: [],
    isLoading: false,
    error: null,
  },
};

const drinkDetails = createSlice({
  name: 'drinkDetails',
  initialState: initialStateDrinkDetails,

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = state.contacts.items.filter(
          ({ id }) => id !== action.payload.id,
        );
      })
      .addCase(deleteContact.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, { payload: newContact }) => {
        state.contacts.isLoading = false;
        state.contacts.error = null;
        state.contacts.items = [...state.contacts.items, newContact];
      })
      .addCase(addContact.rejected, handleRejected);
  },
});

export default drinkDetails.reducer;
export const selectDrinkDetails = (state) => state.drinkDetails.drinkDetails;
