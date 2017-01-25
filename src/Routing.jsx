import React from 'react';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';
import App from './App';
import * as views from './views';

function Routing() {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={views.Upcoming} />
        <Route path="/event/:id" component={views.EventInfo} />
      </Route>
    </Router>
  );
}

export default Routing;
