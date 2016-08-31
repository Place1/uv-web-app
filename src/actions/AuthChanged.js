const AUTH_CHANGED = "AUTH_CHANGED";

function authChanged(status, jwt) {
	return {
		type: AUTH_CHANGED,
		payload: {
			isAuthenticated: status,
			jwt: jwt
		},
	}
}

export { authChanged };
export { AUTH_CHANGED };
