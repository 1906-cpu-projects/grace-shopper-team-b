import React from 'react';
import { Component } from 'react';
import { render } from 'react-dom'
import "../app.css";
import { HashRouter, Switch, Link, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import Home from './Home'
import Products from './Products'
import About from './About'
import Contact from './Contact'
import Cart from './Cart'
import Nav from './Nav'
import Login from './Login'
import User from './User'

import store, { setProductsThunk, setUsersThunk } from './store';

const root = document.querySelector('#root')


class App extends Component {
  constructor() {
    super()
  }

  async componentDidMount() {
    store.dispatch(setProductsThunk());
    store.dispatch(setUsersThunk());
  }


  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Route component={Nav} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/products' component={Products} />
            <Route exact path='/about' component={About} />
            <Route exact path='/contact' component={Contact} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/users/:id' component={User} />
          </Switch>

        </HashRouter>
      </Provider>
    )
  }

}

render(<Provider store={store}><App /></Provider>, root)

