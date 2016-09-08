import { LOGIN } from '../actions/login';
import { VERIFY_TOKEN } from '../actions/verifyToken';

const token = window.localStorage.getItem('jwt');

const initialState = {
	isAuthenticated: token ? true : false, // always start false until token is verified.
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

		case `${VERIFY_TOKEN}_RESOLVED`:
			if (action.payload === true) {
				// if valid
				return Object.assign({}, state, {
					isAuthenticated: true
				});
			}
			else {
				// if not valid
				window.localStorage.setItem('jwt', null);
				return {
					isAuthenticated: false,
					jwt: null,
				};
			}

		default:
			return state;
	}
}

export default userInfoReducer;
