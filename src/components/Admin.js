import React from "react";
import { connect } from "react-redux";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import AdminNav from "./AdminNav";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";
import AdminUsers from "./AdminUsers";
import NewProductForm from "../forms/NewProductForm";
import Login from "../pages/Login";

class Admin extends React.Component {
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
      adminPath = "/";
    }
    console.log("PROPS", this.props);
    return (
      <div>
        <HashRouter>
          <Route component={AdminNav} />
          <Switch>
            <Route exact path={userPath} component={AdminUsers} />
            <Route exact path={newProductPath} component={NewProductForm} />
            <Route exact path={productPath} component={AdminProducts} />
            <Route exact path={adminPath} component={AdminOrders} />
            {/* <Redirect exact path="/login" component={Login} /> */}
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  orders: state.orders,
  products: state.products,
  auth: state.auth
});

export default connect(mapStateToProps)(Admin);
