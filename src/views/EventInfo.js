import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LoadingIndicator from '../components/LoadingIndicator';
import ExpandingButton from '../components/ExpandingButton';
import loadEvents from '../actions/loadEvents';

function mapStateToProps(state, props) {
	let event = state.events.items.find(element => {
		if (element.id == props.params.id) {
			return element;
		}
	});
	return {
		event: event
	};
}

function mapDispatchToProps(dispatch, props) {
	return {
		loadEvent: () => {
			return dispatch(loadEvents({ id: props.params.id }));
		}
	}
}

@connect(mapStateToProps, mapDispatchToProps)
class EventInfo extends React.Component {

	static propTypes = {
		params: PropTypes.object.isRequired, // includes 'id' property.
		event: PropTypes.object, // if not provided, loadEvent() will be called to get it.
		loadEvent: PropTypes.func.isRequired,
	}

	componentDidMount() {
		if (!this.props.event) {
			this.props.loadEvent();
		}
	}

	render() {
		if (!this.props.event) {
			return <LoadingIndicator />
		}

		return (
			<div className="eventInfo">
				<img className="eventCoverImage" src={this.props.event.facebookCoverSource} />
				<div className="eventStatsBox">
					<div className="eventStatsBoxItem">
						<div>{this.props.event.attendingCount}</div>
						<div>Attending</div>
					</div>
					<div className="eventStatsBoxItem">
						<div>{this.props.event.maybeCount}</div>
						<div>Maybe</div>
					</div>
					<div className="eventStatsBoxItem">
						<div>{this.props.event.attendingCount + this.props.event.maybeCount + this.props.event.noReplyCount}</div>
						<div>Invited</div>
					</div>
				</div>
				<div className="eventContent">
					<h2 className="eventTitle">{this.props.event.name}</h2>
					<span className="eventDate">{new Date(this.props.event.startTime).toDateString()}</span>
						<ExpandingButton
							title="Description"
							content={this.props.event.description}
						/>
				</div>
			</div>
		);
	}
}

export default EventInfo
