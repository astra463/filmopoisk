import React from 'react';
import styles from './Button.module.css';
import classNames from 'classnames';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  isAuth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, isAuth }) => {

  const buttonClass = classNames({
    [styles.button]: true,
    [styles.logout]: !isAuth
  })
  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
};
