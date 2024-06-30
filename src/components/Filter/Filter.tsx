'use client';

import React from 'react';
import styles from './Filter.module.css';
import { useRouter, usePathname } from 'next/navigation';
import { CustomSelect } from './custom-select';

const GENRES = {
  '0': 'Не выбран',
  comedy: 'Комедия',
  drama: 'Драма',
  action: 'Боевик',
  thriller: 'Триллер',
  horror: 'Ужасы',
  family: 'Семейный',
  cartoon: 'Анимированный',
  fantasy: 'Фэнтези',
  romance: 'Романтика',
  adventure: 'Приключения',
  musical: 'Мьюзикл',
  war: 'Военный'
};

const YEARS = {
  '0': 'Не выбран',
  '2009': '2009',
  '2008': '2008',
  '2007': '2007',
  '2006': '2006',
  '1990-2005': '1990-2005',
  '1950-1989': '1950-1989'
};

const isGenre = (value: string): value is keyof typeof GENRES => {
  return value in GENRES;
};

const isYear = (value: string): value is keyof typeof YEARS => {
  return value in YEARS;
};

const Filter = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Extract genre and year from URL segments
  const pathSegments = pathname.split('/').filter(Boolean);
  let genre: keyof typeof GENRES = '0';
  let year: keyof typeof YEARS = '0';

  pathSegments.forEach(segment => {
    if (isGenre(segment)) genre = segment;
    if (isYear(segment)) year = segment;
  });

  const handleGenreChange = (value: string) => {
    let newPath = '';
  
    if (value !== '0' && value !== 'Не выбран' && year !== '0') {
      newPath = `/filter/${value}/${year}`;
    } else if (value !== '0' && value !== 'Не выбран') {
      newPath = `/filter/${value}`;
    } else if (year !== '0') {
      newPath = `/filter/${year}`;
    }
  
    // If newPath is empty, go to root '/'
    router.push(newPath || '/');
  };
  
  const handleYearChange = (value: string) => {
    let newPath = '';
  
    if (genre !== '0' && value !== '0') {
      newPath = `/filter/${genre}/${value}`;
    } else if (genre === '0' && value !== '0') {
      newPath = `/filter/${value}`;
    } else if (genre !== '0' && value === '0') {
      newPath = `/filter/${genre}`;
    } else if (genre === '0' && value === '0') {
      newPath = '/';
    }
  
    // If newPath is empty, go to root '/'
    router.push(newPath);
  };
  
  

  return (
    <aside className={styles.filter}>
      <h2 className={styles.title}>Фильтр</h2>
      <label htmlFor='genre' className={styles.label}>
        Жанр
      </label>
      <CustomSelect
        options={Object.entries(GENRES).map(([key, value]) => ({
          value: key,
          label: value
        }))}
        value={genre}
        onChange={(value) => handleGenreChange(value)}
      />
      <label htmlFor='year' className={styles.label}>
        Год выпуска
      </label>
      <CustomSelect
        options={Object.entries(YEARS).map(([key, value]) => ({
          value: key,
          label: value
        }))}
        value={year}
        onChange={(value) => handleYearChange(value)}
      />
    </aside>
  );
};

export default Filter;
