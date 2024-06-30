'use client';

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./MovieItem.module.css";
import classNames from "classnames";
import { MoviesItem } from "@/src/utils/types";
import Image from "next/image";
import { RatingContainer } from "../rating";

export const MovieItem: React.FC<MoviesItem> = ({
  id,
  title,
  description,
  genre,
  release_year,
  rating,
  poster,
  isLarge,
}) => {
  const isAuthenticated = true;
  const router = useRouter();

  const handleItemClick = () => {
    router.push(`/movie/${id}`);
  };

  const imgClass = classNames({
    [styles.large]: isLarge,
    [styles.poster]: true,
  });

  const categoryClass = classNames({
    [styles.bold]: isLarge,
    [styles.category]: true,
  });

  const titleClass = classNames({
    [styles.title_L]: isLarge,
    [styles.title]: true,
  });

  const descriptionClass = classNames({
    [styles.description_L]: isLarge,
    [styles.description]: true,
  });

  return (
    <div className={styles.item} onClick={handleItemClick}>
      <div className={styles.data}>
        {isLarge ? (
          <Image
            src={`http://localhost:3030/static/images/${id}`}
            width={300}
            height={300}
            blurDataURL={poster}
            loading="lazy"
            alt={title}
            className={imgClass}
          />
        ) : (
          <img src={poster} loading="lazy" alt={title} className={imgClass} />
        )}
        <div className={styles.info}>
          <h3 className={titleClass}>{title}</h3>
          <div className={styles.wrapper}>
            <span className={categoryClass}>Жанр</span>
            <p className={descriptionClass}>{genre}</p>
          </div>{" "}
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
