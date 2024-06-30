// AppHeader.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './AppHeader.css';
import { ProfileIcon } from '../../features/profile-icon/ProfileIcon';
import { Button } from '../../features/button/Button';
import { useDispatch, useSelector } from '../../app/providers/store';
import { logout } from '../../shared/slices/userSlice';

interface AppHeaderProps {
  openModal: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ openModal }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <header className='header'>
      <div className='header__logo'>
        <Link to='/' className='header__logo-link'>
          Фильмопоиск
        </Link>
      </div>
      <div className='header__user'>
        {isAuthenticated ? (
          <>
            <ProfileIcon />
            <Button onClick={() => dispatch(logout())}>Выйти</Button>
          </>
        ) : (
          <Button onClick={openModal}>Войти</Button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
