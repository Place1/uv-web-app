import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/reducer';
import Upcoming from './views/Upcoming';
import Login from './views/Login';
import EventInfo from './views/EventInfo';
import NavBar from './components/NavBar';

let store = createStore(reducer);

function mapStateToProps(state) {
	return {
		isAuthenticated: state.userInfo.isAuthenticated
	};
}

@connect(mapStateToProps, null)
class App extends React.Component {

	static propTypes = {
		isAuthenticated: PropTypes.bool.isRequired
	}

	render_authenticated() {
		return (
			<div>
				<NavBar />
				<Router history={browserHistory}>
					<Route path="/" component={Upcoming} />
					<Route path="/event/:id" component={EventInfo} />
				</Router>
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
		<App />
	</Provider>
	, document.getElementById('App')
);
