import { LOGIN } from '../actions/login';

const token = window.localStorage.getItem('jwt');

const initialState = {
	isAuthenticated: (token !== null),
	jwt: token
};

function userInfoReducer(state=initialState, action) {
	switch (action.type) {
		case `${LOGIN}_RESOLVED`:
			window.localStorage.setItem('jwt', action.payload.token);
			return {
				jwt: action.payload.token,
				isAuthenticated: true,
			};

		case `${LOGIN}_REJECTED`:
			window.localStorage.setItem('jwt', null);
			return {
				jwt: null,
				isAuthenticated: false,
			};

		default:
			return state;
	}
}

export default userInfoReducer;
