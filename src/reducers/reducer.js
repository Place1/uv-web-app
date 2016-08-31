import { combineReducers } from 'redux';
import userInfo from './userinfo';
import events from './events';

const reducer = combineReducers({
	events: events,
	userInfo: userInfo
});

export default reducer;
