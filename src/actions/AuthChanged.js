import BaseAction from './BaseAction';

class AuthChanged extends BaseAction {

	static type = 'AUTH_CHANGED'

	constructor(status) {
		super(status);
		this.status = status;
	}

	handle(state) {
		state.isAuthenticated = this.status;
		return state
	}

}

export default AuthChanged;
