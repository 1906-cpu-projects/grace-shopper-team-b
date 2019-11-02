import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import store, { attemptLogin } from './store';

class _Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: ''
    };
    this.onChange = this.onChange.bind(this);
    this.attemptLogin = this.attemptLogin.bind(this);
  }
  attemptLogin(ev) {
    ev.preventDefault();
    const credentials = { ...this.state };
    delete credentials.error;
    this.props
      .attemptLogin(credentials)
      .catch(ex =>
        this.setState({ error: "Email or password doesn't match." })
      );
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  render() {
    const { error, email, password } = this.state;
    const { onChange, attemptLogin } = this;
    return (
      <div className="container">
        <h4>
          Welcome to the grace shopper California, you can login anytime but you
          can never leave. Please login...
        </h4>
        <form>
          {error && (
            <div className="error alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={password}
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline-primary"
            onClick={attemptLogin}
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

const Login = connect(
  () => {
    return {};
  },
  (dispatch, { history }) => {
    return {
      attemptLogin: username => dispatch(attemptLogin(username, history))
    };
  }
)(_Login);

export default Login;
