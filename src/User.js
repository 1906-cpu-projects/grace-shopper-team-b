import React from 'react';
import { connect } from 'react-redux';
import UserUpdateForm from './forms/UserUpdateForm';

const _User = ({ users, auth, match }) => {
  return (
    <div>
      <ul>
        {
          users.map(user => user.id === match.params.id ? <li className={"user"} key={user.id}>Name: {user.firstName} {user.lastName}<br /><br />Username: {user.username} < br /> Email: {user.email}<br /> Password: {user.password}<br /><br />Shipping Address: {user.shippingAddress} <br />Billing Address: {user.billingAddress} <br />WishList: {user.wishlist}<br /></li> : '')
        }
      </ul>
      <br /><br />
      <UserUpdateForm match={match.params.id} />
    </div >
  )
}

const User = connect(({ users, auth }) => {
  return {
    users,
    auth
  }
})(_User)



export default User;
