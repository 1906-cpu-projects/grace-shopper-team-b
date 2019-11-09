import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../redux/store';

const initialState = {
  email: '',
  password: ''
};

class _Home extends React.Component {
  constructor() {
    super();
    this.state = initialState;
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
