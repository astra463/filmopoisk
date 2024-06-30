import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MovieItem.module.css';
import { MoviesItem } from '../../shared/api/types';
import { RatingContainer } from '../rating';
import { useSelector } from '../../app/providers/store';
import classNames from 'classnames';

export const MovieItem: React.FC<MoviesItem> = ({
  id,
  title,
  description,
  genre,
  release_year,
  rating,
  poster,
  isLarge
}) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  const imgClass = classNames({
    [styles.large]: isLarge,
    [styles.poster]: true
  })

  const categoryClass = classNames({
    [styles.bold]: isLarge,
    [styles.category]: true
  })

  const titleClass = classNames({
    [styles.title_L]: isLarge,
    [styles.title]: true
  })

  const descriptionClass = classNames({
    [styles.description_L]: isLarge,
    [styles.description]: true
  })

  return (
    <div className={styles.item} onClick={handleClick}>
      <div className={styles.data}>
        <img src={poster} alt={title} className={imgClass} />
        <div className={styles.info}>
          <h3 className={titleClass}>{title}</h3>
          <div className={styles.wrapper}>
            <span className={categoryClass}>Жанр</span>
            <p className={descriptionClass}>{genre}</p>
          </div>{' '}
          <div className={styles.wrapper}>
            <span className={categoryClass}>Год выпуска</span>
            <p className={descriptionClass}>{release_year}</p>
          </div>
          {isLarge && (
          <div className={styles.wrapper}>
              <span className={categoryClass}>Рейтинг</span>
              <p className={descriptionClass}>{rating}</p>
            </div>
          )}
          <div className={styles.wrapper}>
          <span className={categoryClass}>Описание</span>
            <p className={descriptionClass}>{description}</p>
          </div>
        </div>
      </div>
      {isAuthenticated && (
        <div className={styles.rating}>
          <RatingContainer filmId={id} maxRating={5} />
        </div>
      )}
    </div>
  );
};
