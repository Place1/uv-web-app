import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/reducer';
import Upcoming from './views/Upcoming';
import Login from './views/Login';
import EventInfo from './views/EventInfo';

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

	render() {
		return (
			<div>
				{(() => {
					if (this.props.isAuthenticated) {
						return (
							<Router history={browserHistory}>
								<Route path="/" component={Upcoming} />
								<Route path="/event/:id" component={EventInfo} />
							</Router>
						);
					}
					else {
						return (
							<Login />
						);
					}
				})()}
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
