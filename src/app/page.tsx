import React from 'react';
import MovieList from '../components/MovieList/MovieList';
import Filter from '../components/Filter/Filter';
import "./styles.css";
import { SearchInput } from '../components/search-input';

async function getInitialData() {
  const res = await fetch(`http://localhost:3030/api/v1/search`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

const HomePage: React.FC = async () => {

  const {search_result, total_pages} = await getInitialData()

  return (
    <main className="page">
      <div className="page__left">
        <Filter/>
      </div>
      <div className="page__right">
        <SearchInput searchValue={''}/>
        <MovieList movies={search_result} total_pages={total_pages}/>
      </div>
    </main>
  );
}

export default HomePage;
