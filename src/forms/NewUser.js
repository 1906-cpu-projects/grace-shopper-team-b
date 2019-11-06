import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

class NewUser extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      emailError: '',
      passwordError: ''
    };
    //this.onChange = this.onChange.bind(this);
    //this.attemptLogin = this.attemptLogin.bind(this);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  userInformation() {
    const { email, password } = this.state;
    return { email, password };
  }

  render() {
    const { onAddUser, onCloseClick } = this.props || {};

    return (
      <div className="modalBody">
        <button onClick={onCloseClick} className="modalCloseButton">
          x
        </button>

        <div className="modal">
          <h3>Sign Up Today!</h3>

          <label>Email</label>
          <input
            name="email"
            placeholder="Enter Email"
            value={this.state.email}
            onChange={ev => this.onChange(ev, 'email')}
          />
          <div>{this.state.emailError}</div>

          <label>Password</label>
          <input
            name="password"
            placeholder="Enter Password"
            value={this.state.password}
            onChange={ev => this.onChange(ev, 'password')}
          />
          <div>{this.state.passwordError}</div>

          <button onClick={() => onAddUser(this.userInformation())}>
            Save
          </button>
        </div>
      </div>
    );
  }
}

NewUser.defaultProps = {
  onAddUser: () => {},
  onCloseClick: () => {}
};

export default NewUser;
