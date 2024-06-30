// import React from 'react';
// import Filter from '../../../components/Filter/Filter';
// import MovieList from '../../../components/MovieList/MovieList';
// import "../../../app/styles.css";

// async function getMoviesByYearAndGenre(genre: string, year: string) {
//   const res = await fetch(`http://localhost:3030/api/v1/search?genre=${genre}&release_year=${year}`);

//   if (!res.ok) {
//     throw new Error('Failed to fetch data');
//   }

//   return res.json();
// }

// const isYearOrYearRange = (value: string) => /^\d{4}$/.test(value) || /^\d{4}-\d{4}$/.test(value);

// const HomePage = async ({ params }: { params: { firstValue: string, secondValue: string } }) => {
//   const { firstValue, secondValue } = params;
//   let genre = '';
//   let year = '';

//   if (isYearOrYearRange(firstValue)) {
//     year = firstValue;
//     genre = secondValue || ''; 
//   } else {
//     genre = firstValue;
//     year = secondValue || ''; 
//   }

//   const { search_result, total_pages } = await getMoviesByYearAndGenre(genre, year);

//   return (
//     <main className="page">
//       <div className="page__left">
//         <Filter />
//       </div>
//       <div className="page__right">
//         <MovieList movies={search_result} total_pages={total_pages} />
//       </div>
//     </main>
//   );
// };

// export default HomePage;
