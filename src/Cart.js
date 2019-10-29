import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



class Cart extends React.Component {
  constructor(){
    super();
  }
  render(){
    return (
      <div>
        <h1>Your Shopping Cart</h1>
        <div id='cart'>


        </div>
        <div id='total'>

        </div>
      </div>
    );
  }
}


// const _Cart = () => {
//   return (
//     <div>
//       <h1> Shopping Cart coming soon...</h1>
//     </div>
//   )
// }


// const dispatchToProps = (dispatch) => {
//   return {
//     delete: async ()=> dispatch(...'coming soon')
//   }
// }

// const Cart = connect(null, dispatchToProps)(_Cart)

export default Cart;
