import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './store';

const _Home = ({ auth, logout }) => (
  <div className={"container"}>
    Home - Welcome {auth.email}
    <button onClick={logout}>Logout</button>
  </div>
);

const Home = connect(
  ({ auth }) => {
    return { auth };
  },
  dispatch => {
    return {
      logout: () => dispatch(logout())
    };
  }
)(_Home);

export default Home;
