import React from "react";
import { Component } from "react";
import { render } from "react-dom";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider, connect } from "react-redux";

import Home from './pages/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import Nav from './Nav';
import Admin from './components/Admin';
import Login from './pages/Login';
import User from './components/User';
import OrderHistory from './components/OrderHistory';
import NewUser from './forms/NewUser';
import ProductAZ from './components/ProductAZ';
import LowHigh from './components/LowHigh';
import HighLow from './components/HighLow';
import AdminError from './components/AdminError';
import Under50 from './components/Under50';
import CheckOut from "./components/CheckOut";
import PaymentPage from "./components/PaymentPage";
import Over50 from "./components/Over50";

import store, {
  attemptSessionLogin,
  setProductsThunk,
  setOrdersThunk,
  setOrderProductsThunk,
  setOrderHistoryThunk
} from "./redux/store";


const root = document.querySelector("#root");

class _App extends Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    store.dispatch(setProductsThunk());
    store.dispatch(attemptSessionLogin());
    store.dispatch(setOrdersThunk());
    store.dispatch(setOrderProductsThunk());
    store.dispatch(setOrderHistoryThunk());
  }

  render() {
    const { loggedIn } = this.props;
    return (
      <Provider store={store}>
        <HashRouter>
          <Route component={Nav} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/admin/:id"
              render={props => <Admin {...props} />}
            />
            <Route exact path="/products" component={Products} />
            <Route exact path="/products/A-Z" component={ProductAZ} />
            <Route exact path="/products/Price-Low-High" component={LowHigh} />
            <Route exact path="/products/Price-High-Low" component={HighLow} />
            <Route exact path="/products/UnderFifty" component={Under50} />
            <Route exact path="/products/OverFifty" component={Over50} />
            <Route exact path="/users/:id/checkout" component={CheckOut} />
            <Route exact path="/users/:id/payment" component={PaymentPage} />
            <Route path="/adminError" component={AdminError} exact />
            <Route
              exact
              path="/users/:id/cart"
              render={props => <Cart {...props} />}
            />
            <Route exact path="/orders/:id" component={OrderHistory} />
            <Route exact path="/users/:id" component={User} />} />
            <Route path="/signup" component={NewUser} exact />
            {loggedIn && <Redirect to="/" />}
            <Route path="/login" component={Login} exact />
          </Switch>
        </HashRouter>
      </Provider>
    );
  }
}

const App = connect(
  ({ auth }) => {
    return {
      loggedIn: !!auth.id
    };
  },
  dispatch => {
    return {
      attemptSessionLogin: () => dispatch(attemptSessionLogin())
    };
  }
)(_App);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
