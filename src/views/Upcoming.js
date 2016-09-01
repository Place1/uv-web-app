import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/login';
import { Link } from 'react-router';
import { setEvents } from '../actions/SetEvents';

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo,
		events: state.events
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setEvents: () => {
			return dispatch(setEvents());
		}
	};
}

@connect(mapStateToProps, mapDispatchToProps)
class Upcoming extends React.Component {

	static propTypes = {
		userInfo: PropTypes.object.isRequired,
		events: PropTypes.array.isRequired,
		setEvents: PropTypes.func.isRequired
	}

	componentDidMount() {
		this.props.setEvents();
	}

	truncateString(s) {
		let words = s.split(' ');
		let truncated = words.slice(0, 12);
		if (words.length >= 12) {
			truncated[truncated.length - 1] += '...';
		}
		return truncated.join(' ');
	}

	render() {
		return (
			<div>
				<div className="list">
					{(() => {
						if (this.props.events.length === 0) {
							return <div className="listItem">No events</div>
						}
						else {
							return this.props.events.map((data, index, array) => {
								let seperator = null;
								if (index === 0 || (new Date(array[index-1].startTime).getDate() !== (new Date(data.startTime)).getDate())) {
									seperator = (
										<div className="listItem seperator">
											<span className="seperator-date">{(new Date(data.startTime)).toDateString()}</span>
										</div>
									);
								}
								return (
									<div key={data.id}>
										{seperator}
										<Link to={`/event/${data.id}`} className="noUnderline">
											<div className="listItem">
												<img className="thumbnail" src={data.facebookProfileSource} />
												<div className="content">
													<h2 className="title">{data.name}</h2>
													<p className="description">{this.truncateString(data.description || '')}</p>
												</div>
											</div>
										</Link>
									</div>
								);
							})
						}
					})()}
				</div>
			</div>
		);
	}
}

export default Upcoming;
