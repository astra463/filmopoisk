import React from 'react';
import Filter from '../../../components/Filter/Filter';
import MovieList from '../../../components/MovieList/MovieList';
import { SearchInput } from '../../../components/search-input';
import "../../../app/styles.css"
import { useSearchParams } from 'next/navigation';
async function searchMovies(searchParams: string) {
  const res = await fetch(`http://localhost:3030/api/v1/search?title=${searchParams}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

const HomePage: React.FC = async ({params}: any) => {
  const {search_result, total_pages} = await searchMovies(params.searchParams)

  return (
    <main className="page">
      <div className="page__left">
        <Filter/>
      </div>
      <div className="page__right">
        <SearchInput searchValue={params.searchParams}/>
        <MovieList movies={search_result} total_pages={total_pages}/>
      </div>
    </main>
  );
}

export default HomePage;
