import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { hashHistory } from 'react-router';
import LoadingIndicator from '../components/LoadingIndicator';
import ExpandingButton from '../components/ExpandingButton';
import loadEvents from '../actions/loadEvents';
import setTitle from '../actions/setTitle';
import setNavButton, {
  NAV_BUTTON_LEFT,
  NAV_BUTTON_RIGHT,
} from '../actions/setNavButton';
import '../styles/EventInfo.css';

function mapStateToProps(state, props) {
  const event = state.events.items.find((element) => {
    if (element.id === parseInt(props.params.id, 10)) {
      return element;
    }
    return false;
  });
  return {
    event,
  };
}

function mapDispatchToProps(dispatch, props) {
  return {
    loadEvent: () => dispatch(loadEvents({ id: props.params.id })),
    setTitle: title => dispatch(setTitle(title)),
    setLeftNavButton: content => dispatch(setNavButton(NAV_BUTTON_LEFT, content)),
    setRightNavButton: content => dispatch(setNavButton(NAV_BUTTON_RIGHT, content)),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class EventInfo extends React.Component {

  static propTypes = {
    event: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      facebookCoverSource: PropTypes.string.isRequired,
      club_name: PropTypes.string.isRequired,
      attendingCount: PropTypes.number.isRequired,
      maybeCount: PropTypes.number.isRequired,
      noReplyCount: PropTypes.number.isRequired,
      startTime: PropTypes.string.isRequired,
      location: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      description: PropTypes.string.isRequired,
    }), // if not provided, loadEvent() will be called to get it.
    loadEvent: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setLeftNavButton: PropTypes.func.isRequired,
    setRightNavButton: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const event = this.props.event;
    const name = event ? event.name : '';
    this.props.setTitle(name);
    this.props.setLeftNavButton(
      <button
        className="event-info__back-btn fa fa-chevron-left"
        onClick={() => hashHistory.push('/')}
      />,
    );
    this.props.setRightNavButton(null);
    if (!this.props.event) {
      this.props.loadEvent();
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.event && this.props.event) {
      this.props.setTitle(this.props.event.name);
    }
  }

  render() {
    if (!this.props.event) {
      return <LoadingIndicator />;
    }

    const {
      name,
      description,
      facebookCoverSource,
      attendingCount,
      maybeCount,
      noReplyCount,
      location,
      startTime,
      club_name: clubName,
    } = this.props.event;

    return (
      <div className="event-info">
        <img className="event-info__cover-image" alt="event" src={facebookCoverSource} />
        <div className="event-info__stats">
          <div className="event-info__stats-item">
            <div>{attendingCount}</div>
            <div>Attending</div>
          </div>
          <div className="event-info__stats-spacer" />
          <div className="event-info__stats-item">
            <div>{maybeCount}</div>
            <div>Maybe</div>
          </div>
          <div className="event-info__stats-spacer" />
          <div className="event-info__stats-item">
            <div>
              {attendingCount +
                maybeCount +
                noReplyCount}
            </div>
            <div>Invited</div>
          </div>
        </div>
        <div className="event-info__headers">
          <h2 className="event-info__title">{name}</h2>
          <h3 className="event-info__club">{clubName}</h3>
        </div>
        <hr />
        <div className="event-info__content">
          <div className="event-info__date-section">
            <i className="event-info__date-icon fa fa-clock-o" />
            <div className="event-info__date">
              {moment(startTime).format('h:mmA dddd')}
              <br />
              {moment(startTime).format('do MMMM')}
            </div>
          </div>
          <div className="event-info__location-section">
            <i className="event-info__location-icon fa fa-map-marker" />
            <div className="event-info__location">
              {location.name}
            </div>
          </div>
          <ExpandingButton
            title="Description"
            content={description}
            className="event-info__description"
          />
        </div>
      </div>
    );
  }
}

export default EventInfo;
