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
					events: JSON.parse(xhr.responseText).results
				});
			}
		};
		xhr.setRequestHeader("Authorization", "Token 4a8ca0a0436c4b89e99e6cb97bfcc5b15b2888b0");  // testing key only
		xhr.send(null);
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
								<p className="description">{data.description.substring(0, Math.min(150, data.description.length))}</p>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

export default Upcoming
