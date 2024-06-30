import React from 'react';
import styles from './Button.module.css';
import classNames from 'classnames';

interface ButtonProps {
  children: React.ReactNode;
  isAuth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, isAuth }) => {

  const buttonClass = classNames({
    [styles.button]: true,
    [styles.logout]: !isAuth
  })
  return (
    <button className={buttonClass}>
      {children}
    </button>
  );
};
