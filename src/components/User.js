import React from "react";
import { connect } from "react-redux";
import UserUpdateForm from "../forms/UserUpdateForm";
import store, { setUsersThunk } from "../redux/store";

class User extends React.Component {
  async componentDidMount() {
    store.dispatch(setUsersThunk());
  }
  render() {
    const _user =
      this.props.users.find(_user => _user.id === this.props.match.params.id) ||
      {};
    console.log("USER PROPS ", this.props);
    console.log("USER ", _user);
    return (
      <div>
        <ul>
          <li className={"user"} key={_user.id}>
            <h3>User Info</h3>
            Name: {_user.firstName} {_user.lastName}
            <br />
            Username: {_user.username} <br />
            Email: {_user.email}
            <br />
            <br />
            <h3>Shipping Address</h3>Street Address: {_user.streetAddress}{" "}
            <br />
            City: {_user.city} <br />
            State: {_user.state} <br />
            ZIP Code: {_user.zipcode} <br />
            <br />
            <br />
            <h3>Billing Address</h3>
            Street Address: {_user.billStreetAddress} <br />
            City: {_user.billCity} <br />
            State: {_user.billState} <br />
            ZIP Code: {_user.billZipcode} <br />
          </li>
        </ul>

        <UserUpdateForm user={_user} match={this.props.match.params.id} />
      </div>
    );
  }
}

const mapStateToProps = state => ({ users: state.users, auth: state.auth });
export default connect(mapStateToProps)(User);
