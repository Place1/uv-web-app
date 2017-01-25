import React, { PropTypes } from 'react';
import '../styles/LoadingIndicator.css';

class LoadingIndicator extends React.Component {
  render() {
    const { className, ...props } = this.props;

    return (
      <div {...props} className={`${className} sk-folding-cube`}>
        <div className="sk-cube1 sk-cube" />
        <div className="sk-cube2 sk-cube" />
        <div className="sk-cube4 sk-cube" />
        <div className="sk-cube3 sk-cube" />
      </div>
    );
  }
}

export default LoadingIndicator;
