import React from 'react';
import { SignInWithGoogle } from '../../firebase';
import i18next from 'i18next';

import './Authorization.css';

const Authorization: React.FC = () => {
  return (
    <div className="authorization">
      <div className="authorization-container">
        <h1 className="authorization-text">{i18next.t('authorization')}</h1>
        <button className="authorization-button" onClick={SignInWithGoogle}>
          {i18next.t('authorization-button')}
        </button>
      </div>
    </div>
  );
};

export default Authorization;
