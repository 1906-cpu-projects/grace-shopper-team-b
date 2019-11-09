import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const AdminNav = ({ products, orders, users, auth }) => {
  return (
    <nav className="admin-nav">
      <Link className="nav-link" to={`/admin/${auth.id}`}>
        Manage Orders ({orders.length})
      </Link>
      <Link className="nav-link" to="/admin/newProduct">
        Add a New Product
      </Link>
      <Link className="nav-link" to="/admin/products">
        Manage Current Products ({products.length})
      </Link>
      <Link className="nav-link" to="/admin/users">
        Manage Users ({users.length})
      </Link>
    </nav>
  );
};

const mapStateToProps = state => ({
  users: state.users,
  orders: state.orders,
  products: state.products,
  auth: state.auth
});

export default connect(mapStateToProps)(AdminNav);
