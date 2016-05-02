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
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleLogin(e) {
		e.preventDefault();
		const data = new FormData(this.refs.form);
		const xhr = new XMLHttpRequest();
		xhr.open('GET', 'http://localhost:8000/api/v0.2/user/');
		xhr.onreadystatechange = () => {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				this.props.setAuthStatus(true, data.get('username'), data.get('password'));
			}
		};
		xhr.setRequestHeader("Authorization", "Basic " + btoa(data.get('username') + ":" + data.get('password')));
		xhr.send(data);
	}

	render() {
		return (
			<div>
				<form ref="form" onSubmit={this.handleLogin}>
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
					<input type="submit" />
				</form>
			</div>
		);
	}
}

export default LoginView;
