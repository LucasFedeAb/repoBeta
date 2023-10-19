import { configureStore } from "@reduxjs/toolkit";
import gifsSlice from "../features/gifsSlice/gifsSlice";
import themeSlice from "../features/themeSlice/themeSlice";
import authSlice from "../features/authSlice/authSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { gifsApi } from "../services/gifsApi";
import { authApi } from "../services/authApi";
import { permissionsApi } from "../services/permissionsApi";
import { giphyApi } from "../services/giphyApi";

const store = configureStore({
  reducer: {
    gifs: gifsSlice,
    theme: themeSlice,
    auth: authSlice,
    [gifsApi.reducerPath]: gifsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [permissionsApi.reducerPath]: permissionsApi.reducer,
    [giphyApi.reducerPath]: giphyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      gifsApi.middleware,
      authApi.middleware,
      permissionsApi.middleware,
      giphyApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
