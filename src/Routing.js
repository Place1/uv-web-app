import React from 'react';
import App from './App';
import * as views from './views';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';

const Routing = React.createClass({
	render: function() {
		return (
			<Router history={hashHistory}>
				<Route path="/" component={views.App}>
					<IndexRoute component={views.Upcoming} />
					<Route path="/event/:id" component={views.EventInfo} />
				</Route>
			</Router>
		)
	}
});

export default Routing;
