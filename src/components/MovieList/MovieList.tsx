import { Movie } from '@/src/utils/types';
import styles from './MovieList.module.css';
import { Loader } from '../loader';
import { MovieItem } from '../movie-item/MovieItem';
import Pagination from '../pagination/Pagination';

interface MovieListProps {
  total_pages: number;
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies, total_pages }) => {

  return (
    <div className={styles.movie_list}>
      {movies.map((movie: Movie) => (
        <MovieItem key={movie.id} {...movie} isLarge={false}/>
      ))}
      <Pagination total_pages={total_pages} />
    </div>
  );
};

export default MovieList;
