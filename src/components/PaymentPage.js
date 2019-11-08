import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {StripeProvider, Elements} from 'react-stripe-elements';

import PaymentForm from '../forms/PaymentForm';




class _PaymentPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // console.log('props', this.props)
    const { auth, orders } = this.props;
    console.log('orders', orders)
    const cart= orders.find( order =>  order.userId === auth.id && order.status==='cart')
    console.log('cart', cart)

    return (
      <StripeProvider
      apiKey="pk_test_G4F5UhFtJcLZieeW0kr1MQQa00ul9VeIdT"
      // Rob's apiKey="pk_test_LxcyyDJDaxKtP8uy5xDO4xHr00zLPYZtPy"
      >
        <Elements>
          <PaymentForm  name={auth.firstName} total={this.props.total}/>
        </Elements>

      </StripeProvider>

    )
  }
}

const mapStateToProps = ({ orders, auth  }) =>{
  return {
    orders,
    auth
  }
}

const PaymentPage = connect(mapStateToProps)(_PaymentPage)

export default PaymentPage;
