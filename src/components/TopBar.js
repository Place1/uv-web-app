import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { NAV_BUTTON_LEFT, NAV_BUTTON_RIGHT } from '../actions/setNavButton';
import '../styles/TopBar.css';

function mapStateToProps(state) {
	return {
		title: state.appmeta.title,
		leftBtn: state.appmeta[NAV_BUTTON_LEFT],
		rightBtn: state.appmeta[NAV_BUTTON_RIGHT],
	};
}

@connect(mapStateToProps, null)
class MyComponent extends React.Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		leftBtn: PropTypes.node,
		rightBtn: PropTypes.node,
	}

	render() {
		const right = this.props.rightBtn ? React.cloneElement(this.props.rightBtn) : null;
		const left = this.props.leftBtn ? React.cloneElement(this.props.leftBtn) : null;

		return (
			<div className="top-bar">
				<div className="top-bar__container top-bar__container--left">
					{left}
				</div>
				<div className="top-bar__container top-bar__container--middle">
					<ReactCSSTransitionGroup
						transitionName="fade-animation"
						transitionEnterTimeout={300}
						transitionLeaveTimeout={300}
					>
						<div key={this.props.title}>{this.props.title}</div>
					</ReactCSSTransitionGroup>
				</div>
				<div className="top-bar__container top-bar__container--right">
					{right}
				</div>
			</div>
		);
	}
}

export default MyComponent
