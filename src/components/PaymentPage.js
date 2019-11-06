import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {StripeProvider, Elements} from 'react-stripe-elements';

import PaymentForm from '../forms/PaymentForm';


class PaymentPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <StripeProvider
      apiKey="pk_test_G4F5UhFtJcLZieeW0kr1MQQa00ul9VeIdT"
      // Rob's apiKey="pk_test_LxcyyDJDaxKtP8uy5xDO4xHr00zLPYZtPy"
      >
        <Elements>
          <PaymentForm  name={this.props.name} total={this.props.total}/>
        </Elements>

      </StripeProvider>

    )
  }
}

export default PaymentPage;
