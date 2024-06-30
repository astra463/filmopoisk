import React, { useEffect } from 'react';
import { MovieItem } from '../../features/movie-item/MovieItem';
import styles from './MovieList.module.css';
import useMovies from '../../shared/hooks/useMovies';
import { Movie } from '../../shared/api/types';
import { Loader } from '../../shared/ui/loader';

interface MovieListProps {
  genre: string;
  year: string;
  title: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const MovieList: React.FC<MovieListProps> = ({ genre, year, title, currentPage, setCurrentPage }) => {
  const { data, isFetching } = useMovies({ page: currentPage, genre, year, title });

  useEffect(() => {
    setCurrentPage(1);
  }, [genre, year, title, setCurrentPage]);

  if (isFetching) {
    return <Loader/>;
  }

  if (!data) {
    return <div>Data is undefined</div>;
  }

  const { search_result, total_pages } = data;

  return (
    <div className={styles.movie_list}>
      {search_result.map((movie: Movie) => (
        <MovieItem key={movie.id} {...movie} isLarge={false}/>
      ))}
      <div className="pagination">
        {Array.from({ length: total_pages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
