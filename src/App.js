import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import TabBar from './components/TabBar';
import TopBar from './components/TopBar';
import LoadingIndicator from './components/LoadingIndicator';

function mapStateToProps(state) {
	return {
		isAuthenticated: state.userInfo.isAuthenticated,
		loading: state.appmeta.loading,
	};
}

@connect(mapStateToProps, null)
class App extends React.Component {

	static propTypes = {
		isAuthenticated: PropTypes.bool.isRequired,
		children: PropTypes.node.isRequired,
	}

	constructor(props) {
		super(props);
	}

	render_authenticated() {
		return (
			<div>
				<ReactCSSTransitionGroup
					transitionName="navigation-animation"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
				>
					{React.cloneElement(this.props.children, {
						key: this.props.location.pathname
					})}
				</ReactCSSTransitionGroup>
			</div>
		);
	}

	render_login() {
		return (
			<Login />
		);
	}

	render_loading() {
		return (
			<LoadingIndicator />
		);
	}

	render() {
		if (this.props.loading) {
			return this.render_loading();
		}
		return (
			<div>
				<TopBar />
				{(this.props.isAuthenticated) ?
					this.render_authenticated() :
					this.render_login()
				}
				<TabBar />
			</div>
		);
	}
}

export default App;
