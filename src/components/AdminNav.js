import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import store, { setUsersThunk } from "../redux/store";

class AdminNav extends React.Component {
  async componentDidMount() {
    store.dispatch(setUsersThunk());
  }
  render() {
    const auth = this.props.auth;
    console.log("AUTH ", auth);
    let userPath = `/admin/users`;
    let productPath = `/admin/products`;
    let newProductPath = `/admin/newProduct`;
    let adminPath = `/admin/${auth.id}`;

    if (auth.id === undefined) {
      userPath = "./login";
      adminPath = "/login";
      productPath = "/login";
      newProductPath = "/login";
    }
    if (auth.isAdmin === false) {
      adminPath = "/adminError";
    }
    return (
      <nav className="admin-nav">
        <Link className="nav-link" to={adminPath}>
          Manage Orders ({this.props.orders.length})
        </Link>
        <Link className="nav-link" to={newProductPath}>
          Add a New Product
        </Link>
        <Link className="nav-link" to={productPath}>
          Manage Current Products ({this.props.products.length})
        </Link>
        <Link className="nav-link" to={userPath}>
          Manage Users ({this.props.users.length})
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

export default connect(mapStateToProps)(AdminNav);
