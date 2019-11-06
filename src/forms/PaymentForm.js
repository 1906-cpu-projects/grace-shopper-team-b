import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements'

class PaymentForm extends Component {
  constructor() {
    super()
  }

  render() {

    return (
      <div>

      </div>
    )

  }
}



export default injectStripe(PaymentForm);




