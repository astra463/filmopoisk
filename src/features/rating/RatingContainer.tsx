import React, { useState, useEffect } from 'react';
import { useRateMovieMutation } from '../../shared/api/moviesApi';
import './RatingContainer.css';

type RatingContainerProps = {
  filmId: string;
  maxRating: number;
  onRatingChange?: (rating: string) => void;
};

export const RatingContainer: React.FC<RatingContainerProps> = ({
  filmId,
  maxRating,
  onRatingChange
}) => {
  const [rateMovie] = useRateMovieMutation();
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  useEffect(() => {
    const savedRating = localStorage.getItem(`rating-${filmId}`);
    if (savedRating) {
      setRating(parseInt(savedRating, 10));
    }
  }, [filmId]);

  const handleRating = async (rate: number) => {
    setRating(rate);
    localStorage.setItem(`rating-${filmId}`, rate.toString());
    await rateMovie({ movieId: filmId, user_rate: rate.toString() }).unwrap();
    if (onRatingChange) {
      onRatingChange(rate.toString());
    }
  };

  return (
    <div className='rating-container' onClick={(e) => e.stopPropagation()}>
      <ul className='star-group'>
        {[...Array(maxRating)].map((_, index) => {
          const starRating: number = index + 1;
          const isActive = rating !== null && starRating <= rating;
          const isHovered = hoverRating !== null && starRating <= hoverRating;
          return (
            <li
              key={index}
              className={`star ${isActive ? 'active' : ''} ${isHovered ? 'hovered' : ''}`}
              onClick={() => handleRating(starRating)}
              onMouseEnter={() => setHoverRating(starRating)}
              onMouseLeave={() => setHoverRating(null)}
            >
              <svg
                width='16'
                height='16'
                viewBox='0 0 30 30'
                xmlns='http://www.w3.org/2000/svg'
                className='star-svg'
              >
                <path d='M22.5467 29.2267C21.84 29.2267 20.9333 29 19.8 28.3333L15.8133 25.9733C15.4 25.7333 14.6 25.7333 14.2 25.9733L10.2 28.3333C7.83999 29.7333 6.45333 29.1733 5.82666 28.72C5.21333 28.2667 4.25333 27.1067 4.87999 24.44L5.82666 20.3467C5.93333 19.92 5.71999 19.1867 5.39999 18.8667L2.09333 15.56C0.439994 13.9067 0.573328 12.4933 0.799994 11.8C1.02666 11.1067 1.74666 9.88001 4.03999 9.49334L8.29333 8.78668C8.69333 8.72001 9.26666 8.29334 9.43999 7.93334L11.8 3.22668C12.8667 1.08001 14.2667 0.76001 15 0.76001C15.7333 0.76001 17.1333 1.08001 18.2 3.22668L20.5467 7.92001C20.7333 8.28001 21.3067 8.70668 21.7067 8.77334L25.96 9.48001C28.2667 9.86668 28.9867 11.0933 29.2 11.7867C29.4133 12.48 29.5467 13.8933 27.9067 15.5467L24.6 18.8667C24.28 19.1867 24.08 19.9067 24.1733 20.3467L25.12 24.44C25.7333 27.1067 24.7867 28.2667 24.1733 28.72C23.84 28.96 23.3067 29.2267 22.5467 29.2267Z' />
              </svg>
              <span className='star-count'>{starRating}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
