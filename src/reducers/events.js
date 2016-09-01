import { SET_EVENTS } from '../actions/SetEvents';

const initialState = [];

function eventsReducer(state=initialState, action) {
	switch (action.type) {
		case `${SET_EVENTS}_RESOLVED`:
			return action.payload.results.sort(function (a, b) {
					return (Date.parse(a.startTime) > Date.parse(b.startTime)) ? 1 : -1;
			});

		default:
			return state;
	}
}

export default eventsReducer;
