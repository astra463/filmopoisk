import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MoviesServerResponse, Movie } from './types';

const API_URL = import.meta.env.VITE_MOVIES_API_URL as string;

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Movie'], // добавляем тип тега
  endpoints: (builder) => ({
    fetchMovies: builder.query<MoviesServerResponse, { page?: number; genre?: string; year?: string; title?: string }>({
      query: ({ page = 1, genre = '0', year = '0', title = '' } = {}) => {
        let queryParams = [];
        if (genre !== '0') queryParams.push(`genre=${genre}`);
        if (year !== '0') queryParams.push(`release_year=${year}`);
        if (title) queryParams.push(`title=${title}`);
        if (page > 1) queryParams.push(`page=${page}`);

        const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
        return `search${queryString}`;
      },
    }),
    fetchMovie: builder.query<Movie, string>({
      query: (id) => `movie/${id}`,
      providesTags: (result, error, id) => [{ type: 'Movie', id }],
    }),
    rateMovie: builder.mutation<{ movieId: string; newAverageRate: string; newTotalRatesCount: number }, { movieId: string; user_rate: string }>({
      query: ({ movieId, user_rate }) => ({
        url: `/rateMovie`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: {
          movieId,
          user_rate,
        },
      }),
      invalidatesTags: (result, error, { movieId }) => [{ type: 'Movie', id: movieId }],
    }),
  }),
});

export const { useFetchMoviesQuery, useFetchMovieQuery, useRateMovieMutation } = moviesApi;
