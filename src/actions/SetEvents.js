const SET_EVENTS = "SET_EVENTS";

function setEvents(events) {
	return {
		type: SET_EVENTS,
		payload: events,
	}
}

export { setEvents };
export { SET_EVENTS };
