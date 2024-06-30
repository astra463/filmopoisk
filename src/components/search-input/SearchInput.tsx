'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import styles from './SearchInput.module.css';

interface SearchInputProps {
  searchValue: string; 
}

export const SearchInput: React.FC<SearchInputProps> = ({ searchValue }) => {
  const router = useRouter();

  const [search, setSearch] = useState<string>(searchValue); 
  const [timer, setTimer] = useState<number | null>(null);

  useEffect(() => {
    setSearch(searchValue); 
  }, [searchValue]);

  const handleInputChange = (value: string) => {
    setSearch(value);

    if (timer) {
      clearTimeout(timer);
    }

    setTimer(
      window.setTimeout(() => {
        if (value.trim() !== '') {
          router.push(`/search/${value}`);
        } else {
          router.push('/');
        }
      }, 300)
    );
  };

  const handleClearClick = () => {
    setSearch('');
    router.push('/'); 
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
