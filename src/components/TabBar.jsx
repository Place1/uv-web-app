import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import '../styles/TabBar.css';

class TabBar extends React.Component {

  static propTypes = {

  }

  render() {
    return (
      <div className="tab-bar">
        <div className="tab-bar__section tab-bar__section--disabled">
          <i className="tab-bar__section__icon fa fa-list-ul" />
          <span className="tab-bar__section__name">soon</span>
        </div>
        <Link to="/" className="tab-bar__section tab-bar__section--active">
          <i className="tab-bar__section__icon fa fa-fire" />
          <span className="tab-bar__section__name">Upcoming</span>
        </Link>
        <div className="tab-bar__section tab-bar__section--disabled">
          <i className="tab-bar__section__icon fa fa-globe" />
          <span className="tab-bar__section__name">soon</span>
        </div>
        <div className="tab-bar__section tab-bar__section--disabled">
          <i className="tab-bar__section__icon fa fa-star" />
          <span className="tab-bar__section__name">soon</span>
        </div>
      </div>
    );
  }
}

export default TabBar;
