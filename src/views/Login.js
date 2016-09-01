import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/login';

function mapDispatchToProps(dispatch) {
	return {
		login: (username, password) => {
			dispatch(login(username, password));
		}
	};
}

@connect(null, mapDispatchToProps)
class LoginView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			helpText: ''
		};
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleLogin(e) {
		e.preventDefault();
		const username = e.target.elements['username'].value;
		const password = e.target.elements['password'].value;
		this.props.login(username, password);
	}

	render() {
		return (
			<div className="loginView">
				<form ref="form" onSubmit={this.handleLogin} className="loginForm">
					<label>username</label>
					<input
						required
						type="text"
						name="username"
					/>
					<label>password</label>
					<input
						required
						type="password"
						name="password"
					/>
					<span className="help-text">{this.state.helpText}</span>
					<button type="submit">Login</button>
				</form>
			</div>
		);
	}
}

export default LoginView;
