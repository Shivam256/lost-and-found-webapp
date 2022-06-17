import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
};

const slice = createSlice({
  name: "news",
  initialState,
  reducers: {
    getNewsSuccess(state, action) {
      state.news = action.payload;
      return state;
    },
  },
});

export const { getNewsSuccess } = slice.actions;

export default slice.reducer;
