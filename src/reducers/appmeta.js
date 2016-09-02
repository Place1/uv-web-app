import { VERIFY_TOKEN } from '../actions/verifyToken';
import { SET_TITLE } from '../actions/setTitle';
import {
	SET_NAV_BUTTON,
	NAV_BUTTON_LEFT,
	NAV_BUTTON_RIGHT
} from '../actions/setNavButton';

const initialState = {
	loading: true,
	title: 'Univent',
	[NAV_BUTTON_LEFT]: null,
	[NAV_BUTTON_RIGHT]: null,
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

		case SET_NAV_BUTTON:
			return Object.assign({}, state, {
				[NAV_BUTTON_LEFT]: action.payload.side === NAV_BUTTON_LEFT
					? action.payload.content : state[NAV_BUTTON_LEFT],
				[NAV_BUTTON_RIGHT]: action.payload.side === NAV_BUTTON_RIGHT
					? action.payload.content : state[NAV_BUTTON_RIGHT],
			});

		default:
			return state;
	}
}

export default appmetaReducer;
