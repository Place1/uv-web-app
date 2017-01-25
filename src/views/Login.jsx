import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/login';
import '../styles/Login.css';

function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => {
      dispatch(login(username, password));
    },
  };
}

@connect(null, mapDispatchToProps)
class LoginView extends React.Component {

  static propTypes = {
    login: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      helpText: '',
    };
  }

  handleLogin = (event) => {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    this.props.login(username, password);
  }

  render() {
    return (
      <div className="loginView">
        <form onSubmit={this.handleLogin} className="loginForm">
          <label htmlFor="username">username</label>
          <input
            required
            type="text"
            name="username"
          />
          <label htmlFor="password">password</label>
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
