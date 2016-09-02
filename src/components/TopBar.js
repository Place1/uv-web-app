import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import '../styles/TopBar.css';

function mapStateToProps(state) {
	return {
		title: state.appmeta.title,
	};
}

@connect(mapStateToProps, null)
class MyComponent extends React.Component {

	static propTypes = {
		title: PropTypes.string.isRequired
	}

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="top-bar">
				<div className="top-bar__container top-bar__container--left"></div>
				<div className="top-bar__container top-bar__container--middle">
					{this.props.title}
				</div>
				<div className="top-bar__container top-bar__container--right"></div>
			</div>
		);
	}
}

export default MyComponent
