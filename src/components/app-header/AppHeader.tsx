import React from 'react';
import './AppHeader.css';
import Link from 'next/link';
import { ProfileIcon } from '../profile-icon';
import { Button } from '../button';


export const AppHeader: React.FC = () => {
  const isAuthenticated = false;

  return (
    <header className='header'>
      <div className='header__logo'>
        <Link href='/' className='header__logo-link'>
          Фильмопоиск
        </Link>
      </div>
      <div className='header__user'>
        {isAuthenticated ? (
          <>
            <ProfileIcon />
            <Button>Выйти</Button>
          </>
        ) : (
          <Button>Войти</Button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
