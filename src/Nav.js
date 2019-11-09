import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../src/redux/store';

const _Nav = ({ products, auth }) => {
  let userPath = `/users/${auth.id}`;
  let orderPath = `/orders/${auth.id}`;
  let cartPath = `/users/${auth.id}/cart`;
  let adminPath = `/admin/${auth.id}`;

  if (auth.id === undefined) {
    userPath = '/login';
    orderPath = '/login';
    cartPath = '/login';
    adminPath = '/login';
  }
  if (auth.isAdmin === false) {
    adminPath = '/';
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
      <Link className="nav-link" to={orderPath}>
        Orders
      </Link>
      <Link className="nav-link" to={cartPath}>
        Cart
      </Link>

      {auth.id ? null : (
        <Link className="nav-link" to="/login">
          Login
        </Link>
      )}
      <Link className="nav-link" to={adminPath}>
        Admin
      </Link>
      <Link className="nav-link" to={adminPath}>
        Admin
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

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

const Nav = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Nav);

export default Nav;
