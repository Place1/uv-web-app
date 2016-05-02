const AUTH_CHANGED = "AUTH_CHANGED";

function authChanged(status, jwt) {
	return {
		type: AUTH_CHANGED,
		handle: function(state) {
			return Object.assign({}, state, {
				userInfo: {
					isAuthenticated: status,
					jwt: jwt
				}
			});
		}
	}
}

export { authChanged };
export { AUTH_CHANGED };
