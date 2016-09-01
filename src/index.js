import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import verifyToken from './actions/verifyToken';
import Routing from './Routing';
import './styles/style.css'

const jwt = store.getState().userInfo.jwt;
if (jwt) {
	store.dispatch(verifyToken(jwt));
}



render(
	<Provider store={store}>
		<Routing />
	</Provider>,
	document.getElementById('App')
);
