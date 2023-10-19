import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "userLogged",
  updatedAt: Date.now().toLocaleString(),
  total: 50,
  items: [],
};

export const savedGifsSlice = createSlice({
  name: "savedGifs",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const gifRepeated = state.items.find(
        (item) => item.id === action.payload.id
      );
      /* if (gifRepeated) {
        const itemsUpdated = state.items.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity += action.payload.quantity;
            return item;
          }
          return item;
        });

        return (state = {
          ...state,
          items: itemsUpdated,
          total: 10,
          updatedAt: new Date().toLocaleString(),
        });
      } */
    },
    removeItem: (state, action) => {},
  },
});

export const { addItem, removeItem } = savedGifsSlice.actions;

export default savedGifsSlice.reducer;
