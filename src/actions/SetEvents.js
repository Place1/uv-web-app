const SET_EVENTS = "SET_EVENTS";

function setEvents(events) {
	return {
		type: SET_EVENTS,
		handle: function(state) {
			return Object.assign({}, state, {
				events: events
			});
		}
	}
}

export { setEvents };
export { SET_EVENTS };
