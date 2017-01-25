import { SET_EVENTS } from '../actions/SetEvents';
import { LOAD_EVENTS } from '../actions/loadEvents';

const initialState = {
  fetching: false,
  items: [],
};

function orderEventsByTime(a, b) {
  return (Date.parse(a.startTime) > Date.parse(b.startTime)) ? 1 : -1;
}

function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case `${SET_EVENTS}_PENDING`:
      return Object.assign({}, state, { fetching: true });

    case `${SET_EVENTS}_RESOLVED`:
      return {
        items: action.payload.results.sort(orderEventsByTime),
        fetching: false,
      };

    case `${LOAD_EVENTS}_RESOLVED`:
      return Object.assign({}, state, {
        items: state.items.concat(action.payload.results).sort(orderEventsByTime),
      });

    default:
      return state;
  }
}

export default eventsReducer;
