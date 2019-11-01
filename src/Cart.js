import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteOrderProductsThunk, updateOrderProductThunk } from './store';




class _Cart extends React.Component {
  constructor(props) {
    super();
    this.deleteItem = this.deleteItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }
  async deleteItem (id){
    await this.props.deleteItem(id)
  }
  async updateItem (item) {
    await this.props.updateItem(item)
  }
  render(){
    const { orders , users, products, orderProducts, auth, match } = this.props;
    // console.log('props', this.props)
    // console.log('auth', auth)
    // console.log('users', users)
    // console.log('orders',orders)
    const cart = orders.find(order => order.userId === auth.id && order.status ==='cart');
    const cartItems = orderProducts.filter(item => item.orderId === cart.id);
    const totalItems = cartItems.reduce(((sum, item) => sum + Number(item.quantity)), 0);
    console.log('totalItems', totalItems)
    const items = (total) => {
      if (total === 1){
        return '1 item'
      }
      if (total){
        return `${total} items`
      }
      else return '0 items'
    };
    console.log('cartitems', cartItems)
    const total = cartItems.reduce(((sum, item)=> sum + Number(item.subTotal)), 0)
    // console.log('total', total)
    // console.log('products', products)
    // console.log('orderProducts', orderProducts)

    return (
      <div>
        <h1>{auth.firstName}'s Shopping Cart</h1>
        <br/>
        <div id='cart'>
          <div>
            Order # {cart.id} <br/>
            Order Status: In Progress...
          </div>
          <div id='cartProducts'>
            {
              orderProducts.filter(item => item.orderId === cart.id).map( item => {
                const product = products.find(product => product.id === item.productId)
                return (
                  <div key={item.id} id='cartProduct'>
                    <div>
                      <img height="100" width="100" src={product.imageURL} />
                    </div>
                    <div>
                      Product Name: {product.productName} <br/>
                      Description: {product.description} <br/>
                      Price: ${product.price}<br/>
                      {product.inventory < 6 ? `Only ${product.inventory} left in stock - order soon` : ''}<br/>
                      Quantity {item.quantity}
                      Change Quantity <select>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                      </select><br/>
                      <button onClick={ () => this.deleteItem(item.id)}>Delete Item </button>
                      Item id: {item.id}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div id='total'>
          <div>
            Total (
            {

              items(totalItems)
            }
            ): ${total}
          </div>
          <button className="btn btn-outline-success">Proceed to Checkout</button>
        </div>
      </div>
    );
  }
}

const mapPropsToDispatch = ({orders, users, products, orderProducts, auth, match}) => {
  return ({
    orders,
    users,
    products,
    orderProducts,
    auth,
    match
  })
};

const dispatchToProps = dispatch => {
  return ({
    deleteItem: async (id) => dispatch(deleteOrderProductsThunk(id)),
    updateItem: async (item) => dispatch(updateOrderProductThunk(item))
  })
}

const Cart = connect(mapPropsToDispatch, dispatchToProps)(_Cart)

export default Cart;
