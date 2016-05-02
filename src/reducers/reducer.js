import { AUTH_CHANGED } from '../actions/AuthChanged';

const token = window.localStorage.getItem('jwt');

const initialState = {
	userInfo: {
		isAuthenticated: (token !== null),
		jwt: token
	}
};

function reducer(state=initialState, action) {
	switch(action.type) {
		case AUTH_CHANGED:
			return action.handle(state);

		default:
			return state;
	}
}

export default reducer;
