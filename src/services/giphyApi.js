import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrlGiphy, apiKeyGiphy } from "../firebase";

export const giphyApi = createApi({
  reducerPath: "giphyApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrlGiphy }),
  endpoints: (builder) => ({
    getGiphyBySearch: builder.query({
      query: (category) =>
        `gifs/search?q=${category}&api_key=${apiKeyGiphy}&limit=30`,
    }),
  }),
});

export const { useGetGiphyBySearchQuery } = giphyApi;
