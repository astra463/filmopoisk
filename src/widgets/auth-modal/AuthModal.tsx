import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './AuthModal.module.css';
import { useDispatch } from '../../app/providers/store';
import { login } from '../../shared/slices/userSlice';
import { Button } from '../../features/button';

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleLogin = () => {
    dispatch(login({ username: loginInput, password: passwordInput }));
    onClose();
  };

  const handleCancel = () => {
    setLoginInput('');
    setPasswordInput('');
    onClose();
  };

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === "Escape" ? onClose() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [onClose]);

  const modalContent = (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>Авторизация</h2>
        <div className={styles.inputGroup}>
          <label htmlFor="loginInput">Логин:</label>
          <input
            type="text"
            id="loginInput"
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="passwordInput">Пароль:</label>
          <input
            type="password"
            id="passwordInput"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            required
          />
        </div>
        <div className={styles.buttonGroup}>
          <Button onClick={handleLogin}>Войти</Button>
          <Button onClick={handleCancel}>Отмена</Button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById('modal-root')!);
};

export default AuthModal;
