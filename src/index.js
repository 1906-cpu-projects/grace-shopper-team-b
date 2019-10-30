import React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';
import { HashRouter, Switch, Link, Route, Redirect } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import Home from './Home';
import Products from './Products';
import About from './About';
import Contact from './Contact';
import Cart from './Cart';
import Nav from './Nav';
import Login from './Login';
import User from './User';

import store, {
  attemptSessionLogin,
  setProductsThunk,
  setUsersThunk
} from './store';

const root = document.querySelector('#root');

class _App extends Component {
  constructor() {
    super();
  }

  async componentDidMount() {
    store.dispatch(setProductsThunk());
    store.dispatch(setUsersThunk());
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
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/cart" component={Cart} />
            <Route path="/login" component={Login} exact />
            {loggedIn && <Redirect to="/" />}
            <Route exact path="/users/:id" component={User} />
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
    console.log(attemptSessionLogin);
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
