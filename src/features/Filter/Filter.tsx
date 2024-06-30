import React from 'react';
import styles from './Filter.module.css';
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

interface FilterProps {
  genre: string;
  setGenre: (genre: string) => void;
  year: string;
  setYear: (year: string) => void;
  setCurrentPage: (page: number) => void;
}

export const Filter: React.FC<FilterProps> = ({
  genre,
  setGenre,
  year,
  setYear,
  setCurrentPage
}) => {
  const handleGenreChange = (value: string) => {
    setGenre(value);
    setCurrentPage(1);
  };

  const handleYearChange = (value: string) => {
    setYear(value);
    setCurrentPage(1);
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
        onChange={handleGenreChange}
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
        onChange={handleYearChange}
      />
    </aside>
  );
};

export default Filter;
