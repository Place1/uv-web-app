import { combineReducers } from 'redux';
import userInfo from './userinfo';
import events from './events';
import appmeta from './appmeta';

const reducer = combineReducers({
  events,
  userInfo,
  appmeta,
});

export default reducer;
