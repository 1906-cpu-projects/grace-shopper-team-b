import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../src/redux/store';
import store, { setUsersThunk } from './redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAddressCard,
  faHome,
  faShoppingCart
} from '@fortawesome/free-solid-svg-icons';

class Nav extends React.Component {
  async componentDidMount() {
    store.dispatch(setUsersThunk());
  }
  render() {
    const auth = this.props.auth;
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
      adminPath = `/adminError`;
    }
    return (
      <nav>
        <Link className="nav-link" to="/">
          Home&nbsp;
          <FontAwesomeIcon icon={faHome} />
        </Link>
        <Link className="nav-link" to="/products">
          Products ({this.props.products.length})
        </Link>
        <Link className="nav-link" to={userPath}>
          Profile &nbsp;
          <FontAwesomeIcon icon={faAddressCard} />
        </Link>
        <Link className="nav-link" to={orderPath}>
          Orders
        </Link>
        <Link className="nav-link" to={cartPath}>
          Cart&nbsp;
          <FontAwesomeIcon icon={faShoppingCart} />
        </Link>
        {auth.id ? null : (
          <Link className="nav-link" to="/login">
            Login
          </Link>
        )}
        <Link className="nav-link" to={adminPath}>
          Admin
        </Link>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  orders: state.orders,
  products: state.products,
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
