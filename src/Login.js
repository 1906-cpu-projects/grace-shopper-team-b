import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/*
const Products = () => {
  return (
    <div>
      <h1> Products coming soon...</h1>
    </div>
  )
}

*/

class _Login extends Component {
  constructor() {
    super();
  }

  render() {
    const { products } = this.props;

    return (
      <div>
        <h1>Login</h1>
        <form method="post" action="/login">
          <input type="email" name="email" placeholder="Email" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <input type="submit" />
        </form>
        <a href="/register">Register</a>
      </div>
    );
  }
}

const Login = connect(({ products }) => {
  return {
    products
  };
})(_Login);

export default Login;
