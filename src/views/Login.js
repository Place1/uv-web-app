import React from 'react';
import { connect } from 'react-redux';
import { authChanged } from '../actions/AuthChanged';

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
		const data = new FormData(this.refs.form);
		const xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://localhost:8000/api/v0.2/getWebToken/');
		xhr.onreadystatechange = () => {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				switch(xhr.status) {
					case 200:
						const token = JSON.parse(xhr.responseText).token;
						this.props.setAuthStatus(true, token);
						window.localStorage.setItem('jwt', token);
						break;
					case 401:
						this.setState({
							helpText: 'invalid username or password'
						});
						break;
					default:
						this.setState({
							helpText: 'unknown error'
						});
						break;
				}
			}
		};
		xhr.send(data);
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
