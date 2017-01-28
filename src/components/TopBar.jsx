import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { NAV_BUTTON_LEFT, NAV_BUTTON_RIGHT } from '../actions/setNavButton';
import '../styles/TopBar.css';

function mapStateToProps(state) {
  return {
    title: state.appmeta.title,
    leftBtn: state.appmeta[NAV_BUTTON_LEFT],
    rightBtn: state.appmeta[NAV_BUTTON_RIGHT],
  };
}

function TopBar(props) {
  const {
    title,
    rightBtn,
    leftBtn,
  } = props;

  const right = rightBtn ? React.cloneElement(rightBtn) : null;
  const left = leftBtn ? React.cloneElement(leftBtn) : null;

  return (
    <div className="top-bar">
      <div className="top-bar__container top-bar__container--left">
        {left}
      </div>
      <div className="top-bar__container top-bar__container--middle">
        <ReactCSSTransitionGroup
          transitionName="fade-animation"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          <div key={title}>{title}</div>
        </ReactCSSTransitionGroup>
      </div>
      <div className="top-bar__container top-bar__container--right">
        {right}
      </div>
    </div>
  );
}

TopBar.propTypes = {
  title: PropTypes.string.isRequired,
  leftBtn: PropTypes.node,
  rightBtn: PropTypes.node,
};

export default connect(mapStateToProps, null)(TopBar);
