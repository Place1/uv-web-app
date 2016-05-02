import { AUTH_CHANGED } from '../actions/AuthChanged';

const initialState = {
	userInfo: {
		isAuthenticated: false,
		username: null,
		password: null
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