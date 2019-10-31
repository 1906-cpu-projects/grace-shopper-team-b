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
    const { orders , users, products, orderProducts } = this.props;
    const _orderItems = orderProducts.map( item => {
        const productInfo = products.filter( product => product.id === item.productId)[0];
        return ({...item, productInfo})
      }
    );
    const _orders = orders.map( order => {
      const userInfo = users.filter(user => user.id === order.userId);
      const orderItems = _orderItems.filter( item => item.orderId === order.id)
      return ({...order, userInfo, orderItems})

    });
    // console.log(products, users, orders, orderProducts)
    //  console.log('new orders', _orders)
    let thing = _orders[0]
    // console.log(thing.userInfo)
    return (
      <div>
        <h1>Shopping Carts</h1>
        <br/>
        {
          orders.map( order => <li key={order.id}>
            {
              order.status === 'cart' ? (
                <div>
                  Order #: {order.id}<br/>
                  Order Status: {order.status}<br/>
                  {users.filter( user => user.id ===order.userId).map(user => (
                      <div>
                        User: {user.firstName}
                      </div>
                    )
                  )}
                  {orderProducts.filter( item => item.orderId === order.id).map( item => {
                    const product = products.filter(product => product.id === item.productId)[0]
                    // console.log(product)
                    return (<div key={product.id}>
                      Product Name: {product.productName}<br/>
                      Price: {product.price}
                      </div>)
                  })}
                  Total: ???
                   {/* need to add a function to make total here */}

                  <hr/>
                  <br/>
                </div>
              ) : ''
            }
          </li>)
        }
        <div id='cart'>
        </div>
        <div id='total'>

        </div>
      </div>
    );
  }
}

const mapPropsToDispatch = ({orders, users, products, orderProducts}) => {
  return ({
    orders,
    users,
    products,
    orderProducts
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
