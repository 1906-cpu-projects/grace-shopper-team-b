import React from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { logout, addNewUserThunk } from '../redux/store';
import NewUser from '../forms/NewUser';
import Login from '../pages/Login';
=======
import { logout } from '../redux/store';
>>>>>>> 5302b103361f687ae8fd749a5bca49ecc0010ab0

const initialState = {
  email: '',
  password: ''
};

class _Home extends React.Component {
  constructor() {
    super();
    this.state = initialState;
<<<<<<< HEAD
    // this.routeChange = this.routeChange.bind(this);
=======
>>>>>>> 5302b103361f687ae8fd749a5bca49ecc0010ab0
  }

  render() {
    const { auth, logout } = this.props;

    return (
      <div className="container">
        <h2>Home</h2>
        <h4>Welcome {auth.id ? auth.firstName : 'Guest'}!</h4>
        {auth.id ? (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={logout}
          >
            Logout
          </button>
        ) : null}
      </div>
    );
  }
}

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
