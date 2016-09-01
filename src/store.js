import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/reducer';

function loggingMiddleware(store) {
	return next => action => {
		console.log(action);
		next(action);
	}
}

function promiseMiddleware(store) {
	return next => action => {
		if (action.payload instanceof Promise) {
			store.dispatch({
				type: `${action.type}_PENDING`,
				payload: null,
			});
			action.payload
				.then(data => store.dispatch({
					type: `${action.type}_RESOLVED`,
					payload: data
				}))
				.catch(error => store.dispatch({
					type: `${action.type}_REJECTED`,
					payload: error
				}))
		}
		return next(action);
	}
}

let store = createStore(reducer, applyMiddleware(
	loggingMiddleware,
	promiseMiddleware,
));

window.store = store;

export default store;
