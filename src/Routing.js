import React from 'react';
import App from './App';
import * as views from './views';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';

function Routing() {
	return (
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={views.Upcoming} />
				<Route path="/event/:id" component={views.EventInfo} />
			</Route>
		</Router>
	)
}

export default Routing;
