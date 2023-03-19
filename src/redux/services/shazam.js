import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shazamApi = createApi({
  reducerPath: "shazamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "16fe60dcdbmshc6fefd09694bea5p13ed60jsn964e7be4d196"
      );
      headers.set("X-RapidAPI-Host", "shazam.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => "/charts/track" }),
    getTopChartsByCountry: builder.query({
      query: (country) => `/charts/track?listId=ip-country-chart-${country}`,
    }),
    getSongDetails: builder.query({
      query: (songid) => `/songs/get-details?key=${songid}`,
    }),
    getRelatedSongs: builder.query({
      query: (songid) => `/songs/list-recommendations?key=${songid}`,
    }),
    getArtistDetails: builder.query({
      query: (artistid) => `/artists/get-details?id=${artistid}`,
    }),
    getArtistTopSongs: builder.query({
      query: (artistid) => `/artists/get-top-songs?id=${artistid}`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `/search?term=${searchTerm}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetTopChartsByCountryQuery,
  useGetSongDetailsQuery,
  useGetRelatedSongsQuery,
  useGetArtistDetailsQuery,
  useGetArtistTopSongsQuery,
  useGetSongsBySearchQuery,
} = shazamApi;
