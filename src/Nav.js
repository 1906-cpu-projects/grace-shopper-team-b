import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const _Nav = ({ products }) => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Products ({products.length})</Link>
      <Link to="/about">About Us</Link>
      <Link to="/login">Login</Link>
      <Link to="/cart">Cart</Link>
    </nav>
  )
}


const mapStateToProps = ({products}) => {
  return {
    products
  }
}


const Nav = connect(mapStateToProps)(_Nav)

export default Nav;
