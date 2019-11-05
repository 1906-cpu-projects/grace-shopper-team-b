import React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';
import { HashRouter, Switch, Link, Route, Redirect } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import Home from './pages/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import Nav from './Nav';
import Admin from './components/Admin';
import Login from './pages/Login';
import User from './components/User';
import OrderHistory from './components/OrderHistory';

import store, {
  attemptSessionLogin,
  setProductsThunk,
  setUsersThunk,
  setOrdersThunk,
  setOrderProductsThunk,
  setOrderHistoryThunk
} from './redux/store';
import CheckOut from './components/CheckOut';

const root = document.querySelector('#root');

class _App extends Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    store.dispatch(setProductsThunk());
    store.dispatch(attemptSessionLogin());
    store.dispatch(setUsersThunk());
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
            <Route exact path="/products" component={Products} />
            <Route
              exact
              path="/users/:id/cart"
              render={props => <Cart {...props} />}
            />
            <Route exact path="/users/:id/checkout" component={CheckOut}/>
            <Route exact path="/orders/:id" component={OrderHistory} />
            <Route exact path="/users/:id" component={User} />
            {loggedIn && <Redirect to="/" />}
            <Route path="/login" component={Login} exact />
            <Route exact path="/admin" component={Admin} />
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
    // console.log(attemptSessionLogin);
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
