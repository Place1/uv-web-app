import Api from '../api';

export const LOAD_EVENTS = 'LOAD_EVENTS';

function loadEvents(params) {
	return {
		type: LOAD_EVENTS,
		payload: Api.events.get(params).then(r => r.data),
	};
}

export default loadEvents;
