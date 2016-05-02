import React from 'react';

class LoginView extends React.Component {

	render() {
		return (
			<div>
				<form>
					<label>username</label>
					<input
						type="text"
						name="username"
					/>
					<label>password</label>
					<input
						type="password"
						name="password"
					/>
				</form>
			</div>
		);
	}
}

export default LoginView;
