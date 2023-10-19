import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uniqueCategories: [],
  categorySelected: null,
  gifIdSelected: null,
  dataGiphy: [],
};

export const gifsSlice = createSlice({
  name: "gifs",
  initialState,
  reducers: {
    setCategorySelected: (state, action) => {
      state.categorySelected = action.payload;
    },
    setGifIdSelected: (state, action) => {
      state.gifIdSelected = action.payload;
    },
    setUniqueCategories: (state, action) => {
      state.uniqueCategories = action.payload;
    },
    setDataGiphy: (state, action) => {
      state.dataGiphy = action.payload.data;
    },
  },
});

export const {
  setCategorySelected,
  setGifIdSelected,
  setUniqueCategories,
  setDataGiphy,
} = gifsSlice.actions;

export default gifsSlice.reducer;
