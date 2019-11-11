import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../src/redux/store';
import store, { setUsersThunk } from './redux/store';

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
          Home
        </Link>
        <Link className="nav-link" to="/products">
          Products ({this.props.products.length})
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
      </nav>
    );
  }
}

// const _Nav = ({ products, auth, users }) => {
//   let userPath = `/users/${auth.id}`;
//   let orderPath = `/orders/${auth.id}`;
//   let cartPath = `/users/${auth.id}/cart`;
//   let adminPath = `/admin/${auth.id}`;

//   if (auth.id === undefined) {
//     userPath = "/login";
//     orderPath = "/login";
//     cartPath = "/login";
//     adminPath = "/login";
//   }
//   if (auth.isAdmin === false) {
//     adminPath = `/adminError`;
//   }

//   return (
//     <nav>
//       <Link className="nav-link" to="/">
//         Home
//       </Link>
//       <Link className="nav-link" to="/products">
//         Products ({products.length})
//       </Link>
//       <Link className="nav-link" to={userPath}>
//         Profile
//       </Link>
//       <Link className="nav-link" to={orderPath}>
//         Orders
//       </Link>
//       <Link className="nav-link" to={cartPath}>
//         Cart
//       </Link>
//       {auth.id ? null : (
//         <Link className="nav-link" to="/login">
//           Login
//         </Link>
//       )}
//       <Link className="nav-link" to={adminPath}>
//         Admin
//       </Link>
//     </nav>
//   );
// };

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

// const Nav = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(_Nav);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);

// export default Nav;
