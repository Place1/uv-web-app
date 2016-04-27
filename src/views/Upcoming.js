import React, {PropTypes} from 'react';

class Upcoming extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.state.fakeData = [{
			"id": 1,
			"title": "Wired Monash UNIHACK 2016",
			"description": "lorem ipsum lorem ipsum lorem ipsum",
			"thumbnail": "https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150"
		}, {
			"id": 2,
			"title": "Wired Monash UNIHACK 2016",
			"description": "lorem ipsum lorem ipsum lorem ipsum",
			"thumbnail": "https://placeholdit.imgix.net/~text?txtsize=33&txt=150%C3%97150&w=150&h=150"
		}];
	}

	render() {
		return (
			<div>
				{this.state.fakeData.map(data => {
					return (
						<div className="listItem" key={data.id}>
							<img className="thumbnail" src={data.thumbnail} />
							<div className="content">
								<h2 className="title">{data.title}</h2>
								<p className="description">{data.description}</p>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}

export default Upcoming
