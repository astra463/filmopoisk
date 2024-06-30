import React from 'react';
import Filter from '../../../components/Filter/Filter';
import MovieList from '../../../components/MovieList/MovieList';

async function getMoviesByGenre(page: number) {
  const res = await fetch(`http://localhost:3030/api/v1/search?page=${page}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

const HomePage: React.FC = async ({params}: any) => {
  const {search_result, total_pages} = await getMoviesByGenre(params.page)

  return (
    <main className="page">
      <div className="page__left">
        <Filter/>
      </div>
      <div className="page__right">
        {/* <SearchInput searchQuery={currentTitle} setSearchQuery={setCurrentTitle} /> */}
        <MovieList movies={search_result} total_pages={total_pages}/>
      </div>
    </main>
  );
}

export default HomePage;
