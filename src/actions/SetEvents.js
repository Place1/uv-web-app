import Api from '../api';

const SET_EVENTS = 'SET_EVENTS';

function setEvents() {
  return {
    type: SET_EVENTS,
    payload: Api.events.upcomingEvents()
      .then(r => r.data),
  };
}

export { setEvents };
export { SET_EVENTS };
