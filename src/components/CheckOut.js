import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import PaymentPage from './PaymentPage';

const _CheckOut = ({ auth, orders }) => {
  console.log('orders', orders)
  const cart = orders.find( order => order.userId=== auth.id && order.status ==='cart')
  console.log('cart', cart)
  return (
    <div className="container">
      {/* <h2>Continue to Payment</h2> */}
      <h4>{auth.id ? auth.firstName : ""}, you are almost done with your order!</h4>
      <p>All you need to do is pay. Please provide your credit card info below</p>
      {/* <p>You have checkouted and completed your order!</p>
      <p>Yay, for spending money!</p>
      <p>Click here, if you wish to see your <Link to={`/orders/${auth.id}`}>Order History</Link></p> */}
      <hr/>
      <PaymentPage  name={auth.firstName} total={cart.total}/>
      <hr/>
    </div>
  )
};

const CheckOut = connect(
  ({ auth, orders }) => {
    return { auth, orders  };
  },
)(_CheckOut);

export default CheckOut;
