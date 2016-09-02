import { VERIFY_TOKEN } from '../actions/verifyToken';
import { SET_TITLE } from '../actions/setTitle';

const initialState = {
	loading: true,
	title: 'Univent',
};

function appmetaReducer(state=initialState, action) {
	switch (action.type) {
		case `${VERIFY_TOKEN}_PENDING`:
			return Object.assign({}, state, {
				loading: true
			});

		case `${VERIFY_TOKEN}_RESOLVED`:
		case `${VERIFY_TOKEN}_REJECTED`:
			return Object.assign({}, state, {
				loading: false
			});

		case SET_TITLE:
			return Object.assign({}, state, {
				title: action.payload
			});

		default:
			return state;
	}
}

export default appmetaReducer;
