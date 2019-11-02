import React from 'react';
import { connect } from 'react-redux';
import {
  setUsersThunk,
  setProductsThunk,
  setOrdersThunk,
  setOrderProductsThunk
} from './store';

class _OrderHistory extends React.Component {
  constructor(props) {
    super();
  }
  async componentDidMount() {
    await this.props.getUsers();
    await this.props.getProducts();
    await this.props.getOrders();
    await this.props.getOrderProdcuts();
  }
  render() {
    const { orders, users, products, orderProducts, auth } = this.props;
    // console.log('auth', auth)
    // console.log('users', users)
    // console.log('orders',orders)
    const ordersHistory = orders.filter(
      order => order.userId === auth.id && order.status === 'completed'
    );
    // console.log('cart', cart)
    // console.log('products', products)
    // console.log('orderProducts', orderProducts)

    // console.log("ORDERS HISTORY====", ordersHistory)

    return (
      <div>
        <h1>{auth.firstName}'s Previous Orders</h1>
        <br />
        <div id="order-history">
          {ordersHistory.map(order => (
            <div key={order.id}>
              <br />
              Order # {order.id} <br />
              Order Status: {order.status}
              <br />
              Order Total: ${order.total} <br />
              <br />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapPropsToDispatch = ({
  orders,
  users,
  products,
  orderProducts,
  auth
}) => {
  return {
    orders,
    users,
    products,
    orderProducts,
    auth
  };
};

const dispatchToProps = dispatch => {
  return {
    getUsers: async () => dispatch(setUsersThunk()),
    getProducts: async () => dispatch(setProductsThunk()),
    getOrders: async () => dispatch(setOrdersThunk()),
    getOrderProdcuts: async () => dispatch(setOrderProductsThunk())
  };
};

const OrderHistory = connect(
  mapPropsToDispatch,
  dispatchToProps
)(_OrderHistory);

export default OrderHistory;
