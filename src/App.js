import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';
import { Provider, connect } from 'react-redux';
import Upcoming from './views/Upcoming';
import Login from './views/Login';
import EventInfo from './views/EventInfo';
import NavBar from './components/NavBar';
import store from './store';
import './styles/style.css'


function mapStateToProps(state) {
	return {
		isAuthenticated: state.userInfo.isAuthenticated
	};
}

@connect(mapStateToProps, null)
class App extends React.Component {

	static propTypes = {
		isAuthenticated: PropTypes.bool.isRequired,
		children: PropTypes.node.isRequired,
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

	render() {
		return (
			<div>
				{(this.props.isAuthenticated) ?
					this.render_authenticated() :
					this.render_login()
				}
			</div>
		);
	}
}

ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Upcoming} />
				<Route path="/event/:id" component={EventInfo} />
			</Route>
		</Router>
	</Provider>
	, document.getElementById('App')
);
