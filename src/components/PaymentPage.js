import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {StripeProvider, Elements} from 'react-stripe-elements';

import PaymentForm from '../forms/PaymentForm';


class PaymentPage extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <StripeProvider apiKey="pk_test_LxcyyDJDaxKtP8uy5xDO4xHr00zLPYZtPy">
        <Elements>
          <PaymentForm />
        </Elements>

      </StripeProvider>

    )
  }
}

export default PaymentPage;
