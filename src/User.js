import React from 'react';
import { connect } from 'react-redux';
import UserUpdateForm from './forms/UserUpdateForm';

const _User = ({ users, auth, match }) => {
  // console.log('auth', auth)
  return (
    <div>
      <ul>
        {users.map(user =>
          user.id === match.params.id ? (
            <li className={'user'} key={user.id}>
              <h3>User Info</h3>
              Name: {user.firstName} {user.lastName}
              <br />
              Username: {user.username} <br />
              Email: {user.email}
              <br />
              Password: {user.password}
              <br />
              <br />
              <br />
              <h3>Shipping Address</h3>Street Address: {user.streetAddress}{' '}
              <br />
              City: {user.city} <br />
              State: {user.state} <br />
              ZIP Code: {user.zipcode} <br />
              <br />
              <br />
              <h3>Billing Address</h3>
              Street Address: {user.billStreetAddress} <br />
              City: {user.billCity} <br />
              State: {user.billState} <br />
              ZIP Code: {user.billZipcode} <br />
            </li>
          ) : (
            ''
          )
        )}
      </ul>

      <UserUpdateForm match={match.params.id} />
    </div>
  );
};

const User = connect(({ users, auth }) => {
  return {
    users,
    auth
  };
})(_User);

export default User;
