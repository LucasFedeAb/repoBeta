import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../firebase";

export const gifsApi = createApi({
  reducerPath: "gifsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "categories.json",
    }),
    getGifs: builder.query({
      query: () => "gifs.json",
    }),
    getGifsDb: builder.query({
      query: () => "gifsDb.json",
    }),
    getGifsByCategory: builder.query({
      query: (category) => `gifs.json?orderBy="category"&equalTo="${category}"`,
    }),
    getGifsByTitle: builder.query({
      query: (title) => `gifs.json?orderBy="title"&equalTo="${title}"`,
    }),
    /* postOrder: builder.mutation({
      query: ({ ...order }) => ({
        url: 'orders.json',
        method: 'POST',
        body: order,
      }),
    }), */
  }),
});

export const {
  useGetCategoriesQuery,
  useGetGifsQuery,
  useGetGifsDbQuery,
  useGetGifsByCategoryQuery,
  useGetGifsByTitleQuery,
  /* usePostOrderMutation, */
} = gifsApi;
