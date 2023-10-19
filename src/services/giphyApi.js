import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrlGiphy, apiKeyGiphy } from "../firebase";

export const giphyApi = createApi({
  reducerPath: "giphyApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrlGiphy }),
  endpoints: (builder) => ({
    getGiphyByCategory: builder.query({
      query: (category) =>
        `gifs/search?q=${category}&api_key=${apiKeyGiphy}&limit=30`,
    }),
    getGiphyBySearchTerm: builder.query({
      query: (searchTerm) =>
        `gifs/search?q=${searchTerm}&api_key=${apiKeyGiphy}&limit=20`,
    }),
  }),
});

export const { useGetGiphyByCategoryQuery, useGetGiphyBySearchTermQuery } =
  giphyApi;
