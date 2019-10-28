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
    super()
  }

  render() {
    const { products } = this.props;

    return (
      <div>
        <h1>Login page coming soon....</h1>
      </div>
    )

  }

}


const Login = connect(({products}) => {
  return {
    products
  }
})(_Login)



export default Login;
