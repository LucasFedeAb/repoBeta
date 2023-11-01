import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  localId: null,
  name: null,
  imageCamera: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        user: action.payload.email,
        token: action.payload.idToken,
        localId: action.payload.localId,
      };
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    clearUser: () => {
      return {
        user: null,
        token: null,
        localId: null,
      };
    },
    setCameraImage: (state, action) => {
      return {
        ...state,
        imageCamera: action.payload,
      };
    },
  },
});

export const { setUser, setName, clearUser, setCameraImage } =
  authSlice.actions;

export default authSlice.reducer;
