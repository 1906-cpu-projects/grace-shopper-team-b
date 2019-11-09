import React from "react";
import { connect } from "react-redux";
import store, { deleteUserThunk, setUsersThunk } from "../redux/store";

class AdminUsers extends React.Component {
  async componentDidMount() {
    store.dispatch(setUsersThunk());
  }

  render() {
    const user = this.props.auth;
    console.log("PROPS.AUTH ", user);
    return (
      <div>
        <h3>Manage Users</h3>
        <ul className="admin-users">
          {this.props.users.map(user => (
            <li key={user.id}>
              <h4>User</h4>
              Name: {user.firstName} {user.lastName}
              <br />
              Email: {user.email}
              <br />
              username: {user.username}
              <br />
              <br />
              <h6>Shipping Address</h6>
              Street: {user.streetAddress}
              <br />
              City: {user.city}
              <br />
              State: {user.state}
              <br />
              ZipCode: {user.zipcode}
              <br />
              <br />
              <h6>Billing Address</h6>
              Street: {user.billStreetAddress}
              <br />
              City: {user.billCity}
              <br />
              State: {user.billState}
              <br />
              ZipCode: {user.billZipcode}
              <br /> <br />
              <button
                className="btn btn-outline-danger"
                onClick={ev => this.props.deleteUser(user)}
              >
                Delete User
              </button>
              <br />
              <br />
              <br />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  auth: state.auth
});
const mapDispatchToProps = dispatch => {
  return {
    deleteUser: user => dispatch(deleteUserThunk(user))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUsers);
