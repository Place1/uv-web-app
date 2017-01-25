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
import truncateString from '../util/truncateString';
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

  render() {
    if (this.props.loading) {
      return <LoadingIndicator />;
    }

    return (
      <div>
        <div className="list">
          {(() => {
            if (this.props.events.length === 0) {
              return <div className="listItem">No events</div>;
            }

            return this.props.events.map((data, index, array) => {
              let seperator = null;
              if (index === 0 ||
                (new Date(array[index - 1].startTime).getDate() !==
                (new Date(data.startTime)).getDate())
              ) {
                seperator = (
                  <div className="listItem seperator">
                    <span className="seperator-date">{moment(new Date(data.startTime)).format('dddd do - MMMM')}</span>
                  </div>
                  );
              }
              return (
                <div key={data.id}>
                  {seperator}
                  <Link to={`/event/${data.id}`} className="noUnderline">
                    <div className="listItem">
                      <img className="thumbnail" alt="event thumbnail" src={data.facebookProfileSource} />
                      <div className="content">
                        <h2 className="title">{data.name}</h2>
                        <p className="description">{truncateString(data.description || '')}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            });
          })()}
        </div>
      </div>
    );
  }
}

export default Upcoming;
