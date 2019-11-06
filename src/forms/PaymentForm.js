import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements'

class PaymentForm extends Component {
  constructor() {
    super()
    this.state ={
      name: '',
      amount: ''
    }
  }

  render() {

    return (
      <div>
        <form>
          <label>Name</label>
          <input
              type='text'
              className='input-group'
              value={this.state.name}
              onChange={ev => this.setState({name: ev.target.value})}/>
          <label>Amount</label>
          <input
            type='text'
            value={this.state.amount}
            onChange={ev => this.setState({amount: ev.target.value})}
          />
          <label>CC Number -- Exp. Date -- CVC</label>
          <CardElement />
          <button>Charge It!</button>
        </form>
      </div>
    )

  }
}



export default injectStripe(PaymentForm);




