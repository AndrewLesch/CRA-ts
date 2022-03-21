import React from 'react';

import './Loader.css';

const Loader: React.FC = () => (
  <div className="loader-container">
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Loader;
