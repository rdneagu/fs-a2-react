import React from 'react';
import './Loading.scss';

import CogImage from '../assets/cog.svg';

function Loading() {
  return (
    <div className="loading-wrapper">
      <div className="loading">
        <img className="icon" src={CogImage} width="128" alt="Cog" />
        <span className="status">LOADING</span>
      </div>
    </div>
  );
}

export default Loading;
