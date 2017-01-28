import React, { PropTypes } from 'react';
import truncateString from '../util/truncateString';
import '../styles/EventListItem.css';

function EventListItem(props) {
  const {
    name,
    description,
    facebookProfileSource,
  } = props;

  return (
    <div className="event-list-item">
      <img className="event-list-item__thumbnail" alt="event thumbnail" src={facebookProfileSource} />
      <div className="event-list-item__content">
        <h2 className="event-list-item__title">{name}</h2>
        <p className="event-list-item__description">{truncateString(description || '')}</p>
      </div>
    </div>
  );
}

EventListItem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  facebookProfileSource: PropTypes.string.isRequired,
};

export default EventListItem;
