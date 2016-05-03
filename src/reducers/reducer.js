import { AUTH_CHANGED } from '../actions/AuthChanged';

const token = window.localStorage.getItem('jwt');

const initialState = {
	userInfo: {
		isAuthenticated: (token !== null),
		jwt: token
	},
	events: [],
};

function reducer(state=initialState, action) {
	if (action.handle !== undefined) {
		return action.handle(state);
	}
	else {
		return state;
	}
}

export default reducer;
