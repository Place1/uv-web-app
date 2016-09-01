import { SET_EVENTS } from '../actions/SetEvents';

const initialState = {
	fetching: false,
	items: [],
};

function eventsReducer(state=initialState, action) {
	switch (action.type) {
		case `${SET_EVENTS}_PENDING`:
			return Object.assign({}, state, { fetching: true });

		case `${SET_EVENTS}_RESOLVED`:
			return {
				items: action.payload.results.sort(function (a, b) {
						return (Date.parse(a.startTime) > Date.parse(b.startTime)) ? 1 : -1;
				}),
				fetching: false,
			};

		default:
			return state;
	}
}

export default eventsReducer;
