import React from 'react';

import './Loader.css';

type LoaderProps = {
  height: string;
};

const Loader: React.FC<LoaderProps> = ({ height }) => (
  <div className="loader-container" style={{ height: height }}>
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Loader;
