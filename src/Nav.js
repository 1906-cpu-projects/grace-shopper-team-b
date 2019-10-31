import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const _Nav = ({ products, auth }) => {
  let userPath = `/users/${auth.id}`;

  if (auth.id === undefined) {
    userPath = '/login';
  }

  return (
    <nav>
      <Link className="nav-link" to="/">
        Home
      </Link>
      <Link className="nav-link" to="/products">
        Products ({products.length})
      </Link>
      <Link className="nav-link" to={userPath}>
        Profile
      </Link>
      <Link className="nav-link" to="/login">
        Login
      </Link>
      <Link className="nav-link" to="/cart">
        Cart
      </Link>
    </nav>
  );
};

const mapStateToProps = ({ products, auth }) => {
  return {
    products,
    auth
  };
};

const Nav = connect(mapStateToProps)(_Nav);

export default Nav;
