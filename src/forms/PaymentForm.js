import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements'
import Axios from 'axios';

class PaymentForm extends Component {
  constructor() {
    super()
    this.state ={
      name: '',
      amount: ''
    }
  }
 async  handleSubmit(ev){
    ev.preventDefault();
    console.log('test');
    try{
      let {token} = await this.props.stripe.createToken({name: this.state.name})
      let amount = this.state.amount
      console.log(token)
      await axios.post('/api/donate', {body, amount})
    } catch(er){
      throw er;
    }
  }

  render() {

    return (
      <div>
        <form
          onSubmit={ev => this.handleSubmit(ev)}
        >
          <label>Name</label>
          <input
              type='text'
              className='input-group'
              value={this.state.name}
              onChange={ev => this.setState({name: ev.target.value})}/>
          <label>Amount</label>
          <input
            type='text'
            className='input-group'
            value={this.state.amount}
            onChange={ev => this.setState({amount: ev.target.value})}
          />
          <label>CC Number -- Exp. Date -- CVC</label>
          <CardElement />
          <button className='btn btn-outline-success'>Charge It!</button>
        </form>
      </div>
    )

  }
}



export default injectStripe(PaymentForm);




