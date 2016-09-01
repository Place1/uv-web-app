import { VERIFY_TOKEN } from '../actions/verifyToken';

const initialState = {
	loading: true,
};

function appmetaReducer(state=initialState, action) {
	switch (action.type) {
		case `${VERIFY_TOKEN}_PENDING`:
			return {
				loading: true
			};

		case `${VERIFY_TOKEN}_RESOLVED`:
		case `${VERIFY_TOKEN}_REJECTED`:
			return {
				loading: false
			};

		default:
			return state;
	}
}

export default appmetaReducer;
