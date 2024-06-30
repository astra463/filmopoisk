'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SearchInput.module.css';

interface SearchInputProps {
  searchValue: string; // Принимаем значение searchValue из родительского компонента
}

export const SearchInput: React.FC<SearchInputProps> = ({ searchValue }) => {
  const router = useRouter();

  const [search, setSearch] = useState<string>(searchValue); // Используем searchValue для инициализации состояния search
  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    setSearch(searchValue); // Обновляем search при изменении searchValue из props
  }, [searchValue]);

  const handleInputChange = (value: string) => {
    setSearch(value);

    if (timer) {
      clearTimeout(timer);
    }

    setTimer(
      window.setTimeout(() => {
        router.push(`/search/${encodeURIComponent(value)}`);
      }, 300)
    );
  };

  const handleClearClick = () => {
    setSearch('');
    router.push('/search');
  };

  return (
    <div className={styles.container}>
      <img src="/search_icon.svg" alt="search-icon" />
      <input
        type='text'
        value={search}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder='Название фильма'
        className={styles.input}
      />
      {search && (
        <button type="button" className={styles.clearButton} onClick={handleClearClick}></button>
      )}
    </div>
  );
};
