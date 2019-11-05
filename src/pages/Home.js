import React from 'react';
import { connect } from 'react-redux';
import { logout, addNewUser } from '../redux/store';
import NewUser from '../forms/NewUser';
import Login from '../pages/Login';

const initialState = {
  email: '',
  password: '',
  showSignUpModal: false,
  showLoginModal: false
};

class _Home extends React.Component {
  state = initialState;

  handleAddUser = userToAdd => {
    this.props.addUser(userToAdd);
    this.hideSignUpModal();
  };

  handleLoginUser = userToAdd => {
    // this.props.addUser(userToAdd);
    this.hideLoginModal();
  };

  showSignUpModal = () => {
    this.setState({ showSignUpModal: true });
  };

  hideSignUpModal = () => {
    this.setState({ showSignUpModal: false });
  };

  showLoginModal = () => {
    this.setState({ showLoginModal: true });
  };

  hideLoginModal = () => {
    this.setState({ showLoginModal: false });
  };

  render() {
    const { auth, logout, addNewUser } = this.props;
    const { showSignUpModal, showLoginModal } = this.state;

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
        ) : (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={this.showLoginModal}
          >
            Login
          </button>
        )}
        {showLoginModal ? (
          <Login
            onCloseLoginClick={this.hideLoginModal}
            onLoginUser={this.handleLoginUser}
          />
        ) : null}
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={this.showSignUpModal}
        >
          Sign up!
        </button>
        {showSignUpModal ? (
          <NewUser
            onCloseClick={this.hideSignUpModal}
            onAddUser={this.handleAddUser}
          />
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
      logout: () => dispatch(logout()),

      addUser: user => {
        dispatch(addNewUser(user));
      }
    };
  }
)(_Home);

export default Home;
