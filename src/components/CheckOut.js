import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PaymentPage from './PaymentPage';

const _CheckOut = ({ auth }) => (
  <div className="container">
    <h2>Check Out</h2>
    <h4>{auth.id ? auth.firstName : ""}, you are almost done with your order!</h4>
    <p>You have checkouted and completed your order!</p>
    <p>Yay, for spending money!</p>
    <p>Click here, if you wish to see your <Link to={`/orders/${auth.id}`}>Order History</Link></p>
    <hr/>
    <PaymentPage  name={auth.firstName} total={150}/>
    <hr/>
  </div>
);

const CheckOut = connect(
  ({ auth }) => {
    return { auth };
  },
)(_CheckOut);

export default CheckOut;
