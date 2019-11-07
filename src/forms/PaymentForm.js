import React from 'react';
import { Component } from 'react';
import axios from 'axios';

import { CardElement, injectStripe, ReactStripeElements } from 'react-stripe-elements'

class PaymentForm extends Component {
  constructor(props) {
    super(props)
    this.state ={
      name: this.props.name,
      amount: this.props.total
    }
  }
 async handleSubmit(ev){
    ev.preventDefault();
    console.log('test');
    try{
      let {token} = await this.props.stripe.createToken({name: this.state.name})
      let amount = this.state.amount
      console.log(token)
      await axios.post('/api/donate', {token, amount})
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




