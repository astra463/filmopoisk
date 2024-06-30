import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Filter } from "../../features/Filter/Filter";
import "./HomePage.css";
import MovieList from "../../widgets/MovieList/MovieList";
import { SearchInput } from '../../features/search-input';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const HomePage: React.FC = () => {
  const query = useQuery();
  const navigate = useNavigate();

  const [genre, setGenre] = useState(query.get('genre') || '0');
  const [year, setYear] = useState(query.get('year') || '0');
  const [title, setTitle] = useState(query.get('title') || '');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams();
    if (genre !== '0') params.set('genre', genre);
    if (year !== '0') params.set('year', year);
    if (title) params.set('title', title);
    navigate({ search: params.toString() });
  }, [genre, year, title, navigate]);

  useEffect(() => {
    setCurrentPage(1); 
  }, [genre, year, title]);

  return (
    <main className="page">
      <div className="page__left">
        <Filter 
          genre={genre}
          setGenre={setGenre}
          year={year}
          setYear={setYear}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <div className="page__right">
        <SearchInput searchQuery={title} setSearchQuery={setTitle} />
        <MovieList 
          genre={genre}
          year={year}
          title={title}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </main>
  );
}

export default HomePage;
