import React from 'react';
import { connect } from 'react-redux';
import {
  setUsersThunk,
  setProductsThunk,
  setOrdersThunk,
  setOrderProductsThunk,
  setOrderHistoryThunk
} from '../redux/store';

class _OrderHistory extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const {
      orders,
      users,
      products,
      orderProducts,
      auth,
      orderHistory,
      match
    } = this.props;
    // console.log('auth', auth)
    // console.log('users', users)
    // console.log('orders',orders)

    console.log('MATCH PARAMS ID', match.params.id);
    console.log('ORDERS======', orders);
    console.log('ORDER HISTORY======', orderHistory);

    const userOrders = orderHistory.filter(
      order => order.userId === auth.id && order.status === 'completed'
    );
    // console.log('cart', cart)
    // console.log('products', products)
    // console.log('orderProducts', orderProducts)

    console.log('ORDER HISTORY====', orderHistory);
    console.log('USER ORDERS====', userOrders);

    return (
      <div>
        <h1>{auth.firstName}'s Previous Orders ({userOrders.length})</h1>
        <br />
        <div id="order-history">
          {userOrders.map(order => (
            <div key={order.id} className="pastorder">
              <br />
              <h5>Order Number: #{order.id}</h5>
              <br />
              <h5>Order Total: ${order.total} </h5>
              <br />
              <strong>Order Status:</strong> {order.status}
              <br />
              <br />

               <strong>Products Ordered:</strong>
              {order.items.map(item => {
                // console.log("ITEM IN MAP====", item)
                  const product = products.find(
                    product => product.id === item.productId
                  );
                  // console.log("PRODUCT IN MAP====", product)
                    return(
                      <div id='orderProducts'>
                        <div>
                          <img height="100" width="100" src={product.imageURL} />
                        </div>
                        <div>
                          Product Name: {product.productName}<br />
                          Individual Price: ${item.price}<br/>
                          Quantity Ordered: {item.quantity}<br/>
                          Price of all Units: ${item.subTotal}
                        </div>

                      </div>
                    )
                  } )}

            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  orders,
  users,
  products,
  orderProducts,
  auth,
  orderHistory
}) => {
  return {
    orders,
    users,
    products,
    orderProducts,
    auth,
    orderHistory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: async () => dispatch(setUsersThunk()),
    getProducts: async () => dispatch(setProductsThunk()),
    getOrders: async () => dispatch(setOrdersThunk()),
    getOrderProdcuts: async () => dispatch(setOrderProductsThunk()),
    getOrderHistory: async () => dispatch(setOrderHistoryThunk())
  };
};

const OrderHistory = connect(
  mapStateToProps,
  mapDispatchToProps
)(_OrderHistory);

export default OrderHistory;
