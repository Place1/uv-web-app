const AUTH_CHANGED = "AUTH_CHANGED";

function authChanged(status, username, password) {
	return {
		type: AUTH_CHANGED,
		handle: function(state) {
			return Object.assign({}, state, {
				userInfo: {
					isAuthenticated: status,
					username: username,
					password: password
				}
			});
		}
	}
}

export { authChanged };
export { AUTH_CHANGED };
