import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import LoadingIndicator from '../components/LoadingIndicator';
import ExpandingButton from '../components/ExpandingButton';
import loadEvents from '../actions/loadEvents';
import setTitle from '../actions/setTitle';
import setNavButton, {
	NAV_BUTTON_LEFT,
	NAV_BUTTON_RIGHT,
} from '../actions/setNavButton';
import { hashHistory } from 'react-router';
import '../styles/EventInfo.css';

function mapStateToProps(state, props) {
  const event = state.events.items.find((element) => {
    if (element.id == props.params.id) {
      return element;
    }
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
    params: PropTypes.object.isRequired, // includes 'id' property.
    event: PropTypes.object, // if not provided, loadEvent() will be called to get it.
    loadEvent: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const event = this.props.event;
    const name = event ? event.name : '';
    this.props.setTitle(name);
    this.props.setLeftNavButton(
      <i
        className="fa fa-chevron-left"
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

    return (
      <div className="eventInfo">
        <img className="eventCoverImage" src={this.props.event.facebookCoverSource} />
        <div className="eventStatsBox">
          <div className="eventStatsBoxItem">
            <div>{this.props.event.attendingCount}</div>
            <div>Attending</div>
          </div>
          <div className="eventStatsBox__item-spacer" />
          <div className="eventStatsBoxItem">
            <div>{this.props.event.maybeCount}</div>
            <div>Maybe</div>
          </div>
          <div className="eventStatsBox__item-spacer" />
          <div className="eventStatsBoxItem">
            <div>{this.props.event.attendingCount + this.props.event.maybeCount + this.props.event.noReplyCount}</div>
            <div>Invited</div>
          </div>
        </div>
        <div className="eventHeaders">
          <h2 className="eventTitle">{this.props.event.name}</h2>
          <h3 className="eventClub">{this.props.event.club_name}</h3>
        </div>
        <hr />
        <div className="eventContent">
          <div className="eventDate">
            <i className="eventDate__icon fa fa-clock-o" />
            <div className="eventDate__text">
              {moment(this.props.event.startTime).format('h:mmA dddd')}
              <br />
              {moment(this.props.event.startTime).format('do MMMM')}
            </div>
          </div>
          <div className="eventLocation">
            <i className="eventLocation__icon fa fa-map-marker" />
            <div className="eventLocation__text">
              {this.props.event.location.name}
            </div>
          </div>
          <ExpandingButton
            title="Description"
            content={this.props.event.description}
            className="eventDescription"
          />
        </div>
      </div>
    );
  }
}

export default EventInfo;
