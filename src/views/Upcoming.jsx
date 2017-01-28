import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import { setEvents } from '../actions/SetEvents';
import setNavButton, {
  NAV_BUTTON_LEFT,
  NAV_BUTTON_RIGHT,
} from '../actions/setNavButton';
import setTitle from '../actions/setTitle';
import LoadingIndicator from '../components/LoadingIndicator';
import RefreshButton from '../components/RefreshButton';
import EventListItem from '../components/EventListItem';
import '../styles/Upcoming.css';

function mapStateToProps(state) {
  return {
    events: state.events.items,
    loading: state.events.fetching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setEvents: () => dispatch(setEvents()),
    setTitle: (title) => {
      dispatch(setTitle(title));
    },
    setLeftNavButton: content => dispatch(setNavButton(NAV_BUTTON_LEFT, content)),
    setRightNavButton: content => dispatch(setNavButton(NAV_BUTTON_RIGHT, content)),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class Upcoming extends React.Component {

  static propTypes = {
    events: PropTypes.arrayOf(PropTypes.object).isRequired,
    setEvents: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    setLeftNavButton: PropTypes.func.isRequired,
    setRightNavButton: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.setEvents();
    this.props.setTitle('Upcoming');
    this.props.setLeftNavButton(null);
    this.props.setRightNavButton(
      <RefreshButton onClick={() => this.props.setEvents()} />,
    );
  }

  renderLoadingState() {
    if (this.props.loading === true) {
      return <LoadingIndicator className="upcoming__loading-indicator" />;
    }
    return null;
  }

  renderEventList() {
    const { events } = this.props;

    if (events.length === 0) {
      return <div className="upcoming__list-item">No events</div>;
    }

    return events.map((data, index, array) => {
      let seperator = null;
      if (index !== 0) {
        const currentItemStartTime = moment(data.startTime);
        const previousItemStartTime = moment(array[index - 1].startTime);
        if (currentItemStartTime.startOf('day') !== previousItemStartTime.startOf('day')) {
          seperator = (
            <div className="upcoming__list-seperator">
              <span className="upcoming__seperator-date">{moment(new Date(data.startTime)).format('dddd do - MMMM')}</span>
            </div>
          );
        }
      }
      return (
        <div key={data.id}>
          {seperator}
          <Link to={`/event/${data.id}`} className="noUnderline">
            <EventListItem {...data} />
          </Link>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="upcoming">
        {this.renderLoadingState()}
        {this.renderEventList()}
      </div>
    );
  }
}

export default Upcoming;
