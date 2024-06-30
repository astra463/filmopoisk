import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useFetchMovieQuery } from '../../shared/api/moviesApi';
import styles from './MoviePage.module.css';
import { MovieItem } from '../../features/movie-item/MovieItem';
import { Loader } from '../../shared/ui/loader';

export const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <Navigate to="/" />;
  }

  const { data, error, isFetching } = useFetchMovieQuery(id);

  if (isFetching) {
    return <Loader/>;
  }

  if (error) {
    return <div>Error loading movie details</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const { title, description, genre, release_year, actors, rating, total_rates_count, poster } = data;

  return (
    <div className={styles.page}>
      <MovieItem
        id={id}
        title={title}
        description={description}
        genre={genre}
        release_year={release_year}
        rating={rating}
        poster={poster}
        total_rates_count={total_rates_count}
        isLarge={true}
      />
      {actors && actors.length > 0 ? (
        <>
          <h2 className={styles.title}>Actors</h2>
          <ul className={styles.actorsList}>
            {actors.map((actor, index) => (
              <li key={index} className={styles.item}>
                <img src={actor.photo} alt={actor.name} className={styles.actorPhoto} />
                <p className={styles.actorName}>{actor.name}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No actors information available.</p>
      )}
    </div>
  );
};
