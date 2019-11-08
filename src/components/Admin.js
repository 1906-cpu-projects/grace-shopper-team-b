import React from "react";
import { connect } from "react-redux";
import { HashRouter, Switch, Link, Route, Redirect } from "react-router-dom";

import AdminNav from "./AdminNav";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import AdminUsers from "./AdminUsers";
import NewProductForm from "../forms/NewProductForm";

class Admin extends React.Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Route component={AdminNav} />
          <Switch>
            <Route exact path="/admin/users" component={AdminUsers} />
            <Route exact path="/admin/newProduct" component={NewProductForm} />
            <Route exact path="/admin/products" component={AdminProducts} />
            <Route exact path="/admin/:id" component={AdminOrders} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  orders: state.orders,
  products: state.products
});

export default connect(mapStateToProps)(Admin);
