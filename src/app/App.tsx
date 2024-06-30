import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppHeader } from '../widgets/app-header';
import './styles/App.css';
import './styles/variables.css';
import { HomePage } from '../pages/HomePage';
import { MoviePage } from '../pages/MoviePage';
import AuthModal from '../widgets/auth-modal/AuthModal';
import { useDispatch } from './providers/store';
import { setIsAuthenticated } from '../shared/slices/userSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setIsAuthenticated(true));
    } else {
      dispatch(setIsAuthenticated(false));
    }
  }, [dispatch]);

  return (
    <div className="app">
      <AppHeader openModal={() => setIsModalOpen(true)} />
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="*" element={<div>NOT FOUND</div>} />
      </Routes>
      {isModalOpen && <AuthModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default App;
