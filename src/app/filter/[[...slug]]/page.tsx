import React from 'react';
import Filter from '../../../components/Filter/Filter';
import MovieList from '../../../components/MovieList/MovieList';
import "../../../app/styles.css";
import { SearchInput } from '../../../components/search-input';

async function getMoviesByYearAndGenre(genre: string, year: string) {
  const res = await fetch(`http://localhost:3030/api/v1/search?genre=${genre}&release_year=${year}`);

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

const HomePage = async ({ params }: { params: { slug: string[] } }) => {
  console.log(params);
  let genre = '';
  let year = '';

  // Проверяем, сколько параметров указано в slug
  if (params.slug.length === 2) {
    // Если указано два параметра, определяем их порядок
    if (!isNaN(Number(params.slug[0]))) {
      year = params.slug[0];
      genre = params.slug[1];
    } else {
      genre = params.slug[0];
      year = params.slug[1];
    }
  } else if (params.slug.length === 1) {
    // Если указан только один параметр, определяем его тип
    if (!isNaN(Number(params.slug[0]))) {
      year = params.slug[0];
    } else {
      genre = params.slug[0];
    }
  }

  console.log(year, genre);

  // Вызываем функцию для получения данных с указанными параметрами
  const { search_result, total_pages } = await getMoviesByYearAndGenre(genre, year);

  return (
    <main className="page">
      <div className="page__left">
        <Filter />
      </div>
      <div className="page__right">
        <SearchInput searchValue={''}/>
        <MovieList movies={search_result} total_pages={total_pages} />
      </div>
    </main>
  );
};

export default HomePage;
