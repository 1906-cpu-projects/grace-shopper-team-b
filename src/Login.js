import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
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
      .catch(ex => this.setState({ error: 'bad credentials' }));
  }
  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  render() {
    const { error, email, password } = this.state;
    const { onChange, attemptLogin } = this;
    return (
      <div className={"container"}>
        <h2>
          Welcome to the grace shopper California, you can login anytime but you
          can never leave. Please login...
        </h2>
        <form>
          {error && <div className="error">{error}</div>}
          <div>
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <button onClick={attemptLogin}>Login</button>
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
