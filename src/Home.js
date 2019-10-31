import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from './store';

const _Home = ({ auth, logout }) => (
<<<<<<< HEAD
  <div className={"container"}>
    Home - Welcome {auth.email}
    <button onClick={logout}>Logout</button>
||||||| merged common ancestors
  <div>
    Home - Welcome {auth.email}
    <button onClick={logout}>Logout</button>
=======
  <div className="container">
    <h2>Home</h2>
    <h4>Welcome {auth.email}</h4>
    <button
      type="button"
      className="btn btn-outline-secondary"
      onClick={logout}
    >
      Logout
    </button>
>>>>>>> 12641003e9a7583c02906d554293e13fae10848c
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
