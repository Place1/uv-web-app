import AuthChanged from '../actions/AuthChanged';

const initialState = {
	isAuthenticated: false
};

function reducer(state=initialState, action) {
	switch(action.type) {
		case AuthChanged.type:
			return action.handle(state);

		default:
			return state;
	}
}

export default reducer;
