import { AUTH_CHANGED } from '../actions/AuthChanged';

const token = window.localStorage.getItem('jwt');

const initialState = {
	isAuthenticated: (token !== null),
	jwt: token
};

function userInfoReducer(state=initialState, action) {
	switch (action.type) {
		case AUTH_CHANGED:
			return action.payload;

		default:
			return state;
	}
}

export default userInfoReducer;
