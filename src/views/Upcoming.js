import React, {PropTypes} from 'react';

class Upcoming extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			events: []
		};
	}

	componentDidMount() {
		// request real data from UV api
		let xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://localhost:8000/api/v0.2/event/trending/', true);
		xhr.onreadystatechange = () => {
			if (xhr.readyState == XMLHttpRequest.DONE) {
				this.setState({
					events: JSON.parse(xhr.responseText).results.sort(function(a, b) {
						return (Date.parse(a.startTime) > Date.parse(b.startTime)) ? 1 : -1;
					})
				});
			}
		};
		xhr.setRequestHeader("Authorization", "Token 4a8ca0a0436c4b89e99e6cb97bfcc5b15b2888b0");  // testing key only
		xhr.send(null);
	}

	truncateString(s) {
		let words = s.split(" ");
		let truncated = words.slice(0, 12);
		if (words.length >= 12) {
			truncated[truncated.length-1] += "...";
		}
		return truncated.join(" ");
	}

	render() {
		return (
			<div className="list">
				{this.state.events.map(data => {
					return (
						<div className="listItem" key={data.id}>
							<img className="thumbnail" src={data.facebookProfileSource} />
							<div className="content">
								<h2 className="title">{data.name}</h2>
								<p className="date">{(new Date(data.startTime)).toDateString()}</p>
								<p className="description">{this.truncateString(data.description)}</p>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

export default Upcoming
