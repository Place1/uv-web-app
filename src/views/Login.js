import React from 'react';
import { connect } from 'react-redux';
import { authChanged } from '../actions/AuthChanged';
import Api from '../api';

function mapDispatchToProps(dispatch) {
	return {
		setAuthStatus: (status, username, password) => {
			dispatch(authChanged(status, username, password));
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
		Api.getWebToken(username, password)
			.then(res => {
				const token = res.token;
				this.props.setAuthStatus(true, token);
				window.localStorage.setItem('jwt', token);
			})
			.catch(err => {
				let helpText = '';
				if (err.status === 401) {
					helpText = 'invalid username or password';
				}
				else {
					helpText = 'unknown error';
				}
				this.setState({ helpText });
			})
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
