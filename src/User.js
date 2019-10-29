import React from 'react';
import { connect } from 'react-redux';

const _User = ({ users, match }) => {
  console.log("MATCH ", match.params.id)
  console.log("USER ", users)

  return (
    <div>
      <ul>
        {
          users.map(user => user.id === match.params.id ? <li className={"user"} key={user.id}>Name: {user.firstName} {user.lastName}<br /><br />Username: {user.username} < br /> Email: {user.email}<br /> Password: {user.password}<br /><br />Shipping Address: {user.shippingAddress} <br />Billing Address: {user.billingAddress} <br />WishList: {user.wishlist}<br /></li> : '')
        }
      </ul>

    </div >
  )
}

const User = connect(({ users }) => {
  return {
    users
  }
})(_User)



export default User;
