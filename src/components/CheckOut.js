import React from 'react';
import { connect } from 'react-redux';

const _CheckOut = ({ auth, logout }) => (
  <div className="container">
    <h2>Check Out</h2>
    <h4>{auth.id ? auth.firstName : ""}!</h4>
    <p>You have checkouted and completed your order!</p>
    <p>Yay, for spending money!</p>
  </div>
);

const CheckOut = connect(
  ({ auth }) => {
    return { auth };
  },
)(_CheckOut);

export default CheckOut;
