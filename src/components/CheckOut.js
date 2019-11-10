import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

const _CheckOut = ({ auth }) => {
  return (
    <div className="container">
      <h4>{auth.id ? auth.firstName : ""}, you are done with your order!</h4>
      <p>You have checkouted and completed your order!</p>
      <p>Yay, for spending money!</p>
      <p>Click here, if you wish to see your <Link to={`/orders/${auth.id}`}>Order History</Link></p>
    </div>
  )
};

const CheckOut = connect(
  ({ auth }) => {
    return { auth  };
  },
)(_CheckOut);

export default CheckOut;
