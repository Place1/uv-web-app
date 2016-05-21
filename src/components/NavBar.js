import React, { PropTypes } from 'react';

class NavBar extends React.Component {

	static propTypes = {
	}

	constructor(props) {
		super(props);
		this.navRightClicked = this.navRightClicked.bind(this);
		this.navLeftClicked = this.navLeftClicked.bind(this);
	}

	navLeftClicked() {
		window.history.back();
	}

	navRightClicked() {

	}

	render() {
		return (
			<div className="navBar">
				<button
					className="navLeftBtn"
					onClick={this.navLeftClicked}
				>
					Back
				</button>
				<h1 className="navTitle">title</h1>
				<button
					className="navRightButton"
					onClick={this.navRightClicked}
				>
					x
				</button>
			</div>
		);
	}
}

export default NavBar
