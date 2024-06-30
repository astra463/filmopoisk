import styles from "./MoviePage.module.css";
import { MovieItem } from "../../../../src/components/movie-item/MovieItem";

async function getData(movieId: string) {
  const res = await fetch(`http://localhost:3030/api/v1/movie/${movieId}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export const MoviePage = async ({params}:any) => {

  const {id, title, description, genre, release_year, rating, poster, total_rates_count, actors} = await getData(params.movieId)
  
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
            {actors.map((actor:any, index:any) => (
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

export default MoviePage;
