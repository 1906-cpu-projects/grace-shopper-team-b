import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { attemptLogin } from '../redux/store';

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
    const { onCloseLoginClick } = this.props || {};
    const { onChange, attemptLogin } = this;
    return (
      <div className="container">
        <div className="container">
          <h6>
            Welcome to the grace shopper California, you can login anytime but
            you can never leave. Please login...
          </h6>
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
            <br />
            <br />
            <div>
              <p>New to the ACME Store?</p>
              <Link className="btn btn-outline-primary" to="/signup">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

_Login.defaultProps = {
  onCloseLoginClick: () => {}
};

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
