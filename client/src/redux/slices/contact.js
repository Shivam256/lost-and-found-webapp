import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
};

const slice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    getContactsSuccess(state, action) {
      state.contacts = action.payload;
      return state;
    },
  },
});

export const { getContactsSuccess } = slice.actions;

export default slice.reducer;
