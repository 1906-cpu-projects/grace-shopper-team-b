import React from 'react';
import { connect } from 'react-redux';
import { logout, addNewUserThunk } from '../redux/store';
import NewUser from '../forms/NewUser';
import Login from '../pages/Login';

const initialState = {
  email: '',
  password: '',
  showSignUpModal: false
};

class _Home extends React.Component {
  // state = initialState;
  constructor() {
    super();
    this.state = initialState;
    // this.routeChange = this.routeChange.bind(this);
  }

  render() {
    const { auth, logout, addNewUser } = this.props;
    const { showSignUpModal } = this.state;

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
