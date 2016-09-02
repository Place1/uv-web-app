import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
					<ReactCSSTransitionGroup
						transitionName="fade-animation"
						transitionEnterTimeout={300}
						transitionLeaveTimeout={300}
					>
						<div key={this.props.title}>{this.props.title}</div>
					</ReactCSSTransitionGroup>
				</div>
				<div className="top-bar__container top-bar__container--right"></div>
			</div>
		);
	}
}

export default MyComponent
