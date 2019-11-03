import React from 'react';
import { connect } from 'react-redux';
import {
  deleteOrderProductsThunk,
  updateOrderProductThunk,
  setOrderProductsThunk,
  setOrdersThunk,
  setProductsThunk,
  setUsersThunk
} from './store';
import axios from 'axios';

class _Cart extends React.Component {
  constructor(props) {
    super();
    this.state = {
      id: '',
      userId: '',
      status:'',
      total:''
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }
  async componentDidMount(props) {
    const order = (await axios.get(`api/orders/${this.props.match.params.id}/cart`)).data;
    this.setState({
      id: order.id,
      userId: order.userId,
      status: order.status,
      total: order.total
    });

  }
  deleteItem(id) {
    this.props.deleteItem(id);
  }
  updateItem(item) {
    this.props.updateItem(item);
  }
  render() {
    const { id } = this.state;
    const { products, orderProducts, auth } = this.props;
    const cart = id;
    if (cart === undefined) {
      return 'You have no cart at this time.';
    }
    // console.log('cart', cart)
    // console.log('match', match)
    // console.log('auth', auth)
    const cartItems = orderProducts.filter(item => item.orderId === cart);
    const totalItems = cartItems.reduce(
      (sum, item) => sum + Number(item.quantity),
      0
    );
    const items = total => {
      if (total === 1) {
        return '1 item';
      }
      if (total) {
        return `${total} items`;
      } else return '0 items';
    };
    const totalPrice = cartItems
      .reduce((sum, item) => sum + Number(item.subTotal), 0)
      .toFixed(2);
    return cart === 'undefined' ? (
      'Cart is unavailable at this time.'
    ) : (
      <div>
        <h1>{auth.firstName}'s Shopping Cart</h1>
        <br />
        <div id="cart">
          <div>
            Order # {cart} <br />
            Order Status: In Progress...
          </div>
          <div id="cartProducts">
            {orderProducts
              .filter(item => item.orderId === cart)
              .map(item => {
                const product = products.find(
                  product => product.id === item.productId
                );
                return (
                  <div key={item.id} id="cartProduct">
                    <div>
                      <img height="150" width="150" src={product.imageURL} />
                    </div>
                    <div>
                      Product Name: {product.productName} <br />
                      Description: {product.description} <br />
                      Price: ${product.price}
                      <br />
                      Quantity {item.quantity}
                      <br />
                      Change Quantity{' '}
                      <select>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                      </select>
                      <br />
                      {product.inventory < 6
                        ? `Only ${product.inventory} left in stock - order soon`
                        : ''}
                      <br />
                      <button className="btn btn-outline-success" onClick={() => this.deleteItem(item.id)}>
                        Delete Item{' '}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div id="total">
          <div>
            Total ({items(totalItems)}
            ): ${totalPrice}
          </div>
          <button className="btn btn-outline-success">
            Proceed to Checkout
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ orders, users, products, orderProducts, auth }) => {
  return {
    orders,
    users,
    products,
    orderProducts,
    auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: async () => dispatch(setUsersThunk()),
    getProducts: async () => dispatch(setProductsThunk()),
    getOrders: async () => dispatch(setOrdersThunk()),
    getOrderProdcuts: async () => dispatch(setOrderProductsThunk()),
    deleteItem: async id => dispatch(deleteOrderProductsThunk(id)),
    updateItem: async item => dispatch(updateOrderProductThunk(item))
  };
};

const Cart = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Cart);

export default Cart;
