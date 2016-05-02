import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
	return {
		userInfo: state.userInfo
	};
}

@connect(mapStateToProps, null)
class Upcoming extends React.Component {

	static propTypes = {
		userInfo: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			events: [],
		};
	}

	componentDidMount() {
		// request real data from UV api
		const xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://localhost:8000/api/v0.2/event/trending/', true);
		xhr.onreadystatechange = () => {
			if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
				const data = JSON.parse(xhr.responseText);
				this.setState({
					events: data.results.sort(function (a, b) {
						return (Date.parse(a.startTime) > Date.parse(b.startTime)) ? 1 : -1;
					})
				});
			}
		};
		xhr.setRequestHeader("Authorization", "Basic " + btoa(this.props.userInfo.username + ":" + this.props.userInfo.password));
		xhr.send(null);
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
			<div className="list">
				{(() => {
					if (this.state.events.length === 0) {
						return <div className="listItem">No events</div>
					}
					else {
						return this.state.events.map((data, index, array) => {
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
									<div className="listItem">
										<img className="thumbnail" src={data.facebookProfileSource} />
										<div className="content">
											<h2 className="title">{data.name}</h2>
											<p className="description">{this.truncateString(data.description)}</p>
										</div>
									</div>
								</div>
							);
						})
					}
				})()}
			</div>
		);
	}
}

export default Upcoming;
