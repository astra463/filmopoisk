import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomSelect.module.css';
import classNames from 'classnames';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options.find(option => option.value === value) || null
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  const arrowClass = classNames({
    [styles.arrow]: true,
    [styles.arrowOpen]: isOpen
  })

  return (
    <div className={styles.selectContainer} ref={ref}>
      <div className={styles.selectHeader} onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? selectedOption.label : 'Выберите'}
        <img className={arrowClass} src="../../src/assets/images/arrow.svg"></img>
      </div>
      {isOpen && (
        <ul className={styles.selectList}>
          {options.map((option) => (
            <li
              key={option.value}
              className={styles.selectOption}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
