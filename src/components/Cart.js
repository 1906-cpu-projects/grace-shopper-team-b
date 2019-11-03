import React from 'react';
import { connect } from 'react-redux';
import {
  deleteOrderProductsThunk,
  updateOrderProductThunk,
  setOrderProductsThunk,
  setOrdersThunk,
  setProductsThunk,
  setUsersThunk
} from '../redux/store';

class _Cart extends React.Component {
  constructor(props) {
    super();
    this.deleteItem = this.deleteItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }
  // async componentDidMount() {
  //   await this.props.getUsers()
  //   await this.props.getProducts()
  //   await this.props.getOrders()
  //   await this.props.getOrderProdcuts()
  // }
  async deleteItem(id) {
    await this.props.deleteItem(id);
  }
  async updateItem(item) {
    await this.props.updateItem(item);
  }
  render() {
    const { orders, products, orderProducts, auth, match } = this.props;
    const cart = orders.find(
      order => order.userId === match.params.id && order.status === 'cart'
    );
    if (cart === undefined) {
      return 'You have no cart at this time.';
    }
    // console.log('cart', cart)
    // console.log('match', match)
    // console.log('auth', auth)
    const cartItems = orderProducts.filter(item => item.orderId === cart.id);
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
    const total = cartItems
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
              Order # {cart.id} <br />
              Order Status: In Progress...
          </div>
            <div id="cartProducts">
              {orderProducts
                .filter(item => item.orderId === cart.id)
                .map(item => {
                  const product = products.find(
                    product => product.id === item.productId
                  );
                  return (
                    <div key={item.id} id="cartProduct">
                      <div>
                        <img height="100" width="100" src={product.imageURL} />
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
                        <button onClick={() => this.deleteItem(item.id)}>
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
              ): ${total}
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
