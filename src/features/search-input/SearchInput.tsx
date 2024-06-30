import React, { useState, useEffect, useRef } from 'react';
import styles from './SearchInput.module.css';

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  setSearchQuery
}) => {
  const [inputValue, setInputValue] = useState(searchQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 500); // Задержка в 500 мс

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, setSearchQuery]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleClearClick = () => {
    setInputValue('');
    setSearchQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className={styles.container} onClick={handleContainerClick}>
      <img src="./src/assets/images/search_icon.svg" alt="search-icon" />
      <input
        type='text'
        value={inputValue}
        onChange={handleChange}
        placeholder='Название фильма'
        className={styles.input}
        ref={inputRef}
      />
      {inputValue && (
        <button className={styles.clearButton} onClick={handleClearClick}></button>
      )}
    </div>
  );
};
