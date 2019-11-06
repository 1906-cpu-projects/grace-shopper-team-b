import React from 'react';
import { connect } from 'react-redux';
import { logout, addNewUser } from '../redux/store';
import NewUser from '../forms/NewUser';

const initialState = {
  email: '',
  password: '',
  showSignUpModal: false
};

class _Home extends React.Component {
  state = initialState;
  constuctor() {
    this.routeChange = this.routeChange.bind(this);
  }

  handleAddUser = userToAdd => {
    this.props.addUser(userToAdd);
    this.hideSignUpModal();
  };

  showSignUpModal = () => {
    this.setState({ showSignUpModal: true });
  };

  hideSignUpModal = () => {
    this.setState({ showSignUpModal: false });
  };

  render() {
    const { auth, logout, addNewUser } = this.props;
    const { showSignUpModal } = this.state;

    return (
      <div className="container">
        <h2>Home</h2>
        <h4>Welcome {auth.id ? auth.firstName : 'Guest'}!</h4>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={logout}
        >
          Logout
        </button>
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
