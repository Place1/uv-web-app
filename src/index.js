import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import verifyToken from './actions/verifyToken';
import Routing from './Routing';
import 'font-awesome/css/font-awesome.css';
import './styles/style.css';

// using file-loader with webpack to keep the service worker
// script in a seperate JS file.
// The 'ServiceWorker' variable will end up being a url to the file.

// const jwt = store.getState().userInfo.jwt;
// if (jwt) {
// 	store.dispatch(verifyToken(jwt));
// }

if ('serviceWorker' in navigator) {
	// if service workers are supported then register ours!
	navigator.serviceWorker.register('/ServiceWorker.js')
		.then(reg => {
			console.log('Service Worker Registered', reg);
		})
		.catch(err => {
			console.log('Error: Service Worker not registered', err)
		})
}

render(
	<Provider store={store}>
		<Routing />
	</Provider>,
	document.getElementById('App')
);
