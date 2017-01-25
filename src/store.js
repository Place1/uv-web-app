import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/reducer';

function loggingMiddleware() {
  return next => (action) => {
    console.log(action); // eslint-disable-line no-console
    next(action);
  };
}

function promiseMiddleware(store) {
  return next => (action) => {
    if (action.payload instanceof Promise) {
      store.dispatch({
        type: `${action.type}_PENDING`,
        payload: null,
      });
      action.payload
        .then(data => store.dispatch({
          type: `${action.type}_RESOLVED`,
          payload: data,
        }))
        .catch((error) => {
          console.error(error); // eslint-disable-line no-console
          throw error;
        })
        .catch(error => store.dispatch({
          type: `${action.type}_REJECTED`,
          payload: error,
        }));
    }
    return next(action);
  };
}

const store = createStore(reducer, applyMiddleware(
  loggingMiddleware,
  promiseMiddleware,
));

window.store = store;

export default store;
