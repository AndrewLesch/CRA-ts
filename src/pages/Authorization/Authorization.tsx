import React from 'react';
import { SignInWithGoogle } from '../../firebase';
import './Authorization.css';

const Authorization: React.FC = () => {
  return (
    <div className="container--main">
      <div className="authorization-container">
        <h1 className="authorization-text">
          Авторизация при помощи аккаунта Google
        </h1>
        <button className="authorization-button" onClick={SignInWithGoogle}>
          Войти/Зарегестрироваться
        </button>
      </div>
    </div>
  );
};

export default Authorization;
