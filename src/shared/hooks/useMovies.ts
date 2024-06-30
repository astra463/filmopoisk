import { useFetchMoviesQuery } from '../../shared/api/moviesApi';
import { MoviesServerResponse } from '../../shared/api/types';

interface UseMoviesParams {
  page: number;
  genre: string;
  year: string;
  title: string;
}

interface UseMoviesResult {
  data: MoviesServerResponse | undefined;
  isFetching: boolean;
}

const useMovies = ({ page, genre, year, title }: UseMoviesParams): UseMoviesResult => {
  const { data, isFetching } = useFetchMoviesQuery({ page, genre, year, title });
  return { data, isFetching };
};

export default useMovies;
