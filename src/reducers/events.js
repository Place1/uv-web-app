import { SET_EVENTS } from '../actions/SetEvents';

const initialState = [];

function eventsReducer(state=initialState, action) {
	switch (action.type) {
		case SET_EVENTS:
			return action.payload;

		default:
			return state;
	}
}

export default eventsReducer;
