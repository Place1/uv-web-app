import React, { PropTypes } from 'react';
import '../styles/LoadingIndicator.css';

function LoadingIndicator(props) {
  const { className, ...otherProps } = props;

  return (
    <div {...otherProps} className={`${className} sk-folding-cube`}>
      <div className="sk-cube1 sk-cube" />
      <div className="sk-cube2 sk-cube" />
      <div className="sk-cube4 sk-cube" />
      <div className="sk-cube3 sk-cube" />
    </div>
  );
}

LoadingIndicator.propTypes = {
  className: PropTypes.string,
};

export default LoadingIndicator;
