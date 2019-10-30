import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const _Nav = ({ products, auth }) => {

  let userPath = `/users/${auth.id}`

  if (auth.id === undefined) {
    userPath = '/login'
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Products ({products.length})</Link>
      <Link to={userPath}>Profile</Link>
      <Link to="/login">Login</Link>
      <Link to="/cart">Cart</Link>
    </nav>
  )
}


const mapStateToProps = ({products, auth}) => {
  return {
    products,
    auth
  }
}


const Nav = connect(mapStateToProps)(_Nav)

export default Nav;
