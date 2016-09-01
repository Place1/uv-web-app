import { combineReducers } from 'redux';
import userInfo from './userinfo';
import events from './events';
import appmeta from './appmeta';

const reducer = combineReducers({
	events: events,
	userInfo: userInfo,
	appmeta: appmeta,
});

export default reducer;
