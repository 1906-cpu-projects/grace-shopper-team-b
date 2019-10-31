import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUsersThunk, setProductsThunk, setOrdersThunk, setOrderProductsThunk } from './store';



class _Cart extends React.Component {
  constructor(props){
    super();
  }
  async componentDidMount(){
    await this.props.getUsers()
    await this.props.getProducts()
    await this.props.getOrders()
    await this.props.getOrderProdcuts()
  }
  render(){
    const { orders , users, products, orderProducts, auth } = this.props;
    // console.log('auth', auth)
    // console.log('users', users)
    // console.log('orders',orders)
    const cart = orders.find(order => order.userId === auth.id && order.status ==='cart');
    console.log('cart', cart)
    // console.log('products', products)
    console.log('orderProducts', orderProducts)

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
                      Quantity <select>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                      </select><br/>
                      <button>Delete Item</button>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div id='total'>
          <div>
            Total ({orderProducts.filter(item => item.orderId === cart.id).length > 1 ? `${orderProducts.filter(item => item.orderId === cart.id).length} items`: '1 item' }): {cart.total}
          </div>
          <button className="btn btn-outline-success">Proceed to Checkout</button>
        </div>
      </div>
    );
  }
}

const mapPropsToDispatch = ({orders, users, products, orderProducts, auth}) => {
  return ({
    orders,
    users,
    products,
    orderProducts,
    auth
  })
};

const dispatchToProps = dispatch => {
  return ({
    getUsers: async () => dispatch(setUsersThunk()),
    getProducts: async () => dispatch(setProductsThunk()),
    getOrders: async () => dispatch(setOrdersThunk()),
    getOrderProdcuts: async () => dispatch(setOrderProductsThunk()),
  })
}

const Cart = connect(mapPropsToDispatch, dispatchToProps)(_Cart)

export default Cart;
