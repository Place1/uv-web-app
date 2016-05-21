import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state, props) {
	let event = state.events.find(element => {
		if (element.id == props.params.id) {
			return element;
		}
	});
	return {
		event: event
	};
}

@connect(mapStateToProps, null)
class EventInfo extends React.Component {

	static propTypes = {
		event: PropTypes.object.isRequired,
	}

	render() {
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
					<p className="eventDescription">{this.props.event.description}</p>
				</div>
			</div>
		);
	}
}

export default EventInfo
