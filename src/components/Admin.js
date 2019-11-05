import React from 'react';
import { connect } from 'react-redux';

// Display users
// Delete a user
// Display product information
// Add new products
// Delete current products
// Update product information
// Display orders

class Admin extends React.Component {
  render() {
    console.log(this.props.products)
    console.log(this.props.orders)
    return (
      <div>
        <h3>Manage Orders</h3>
        <ul className={"admin"}>
          {
            this.props.orders.map(order =>
              <li key={order.id}>
                Order Status: {order.status}<br />
                Items Ordered:<ul>{order.items.map(item => <li key={item.id}>{item.product.productName}</li>)}</ul>
                Order Total: ${order.total}<br />
                Order placed on {order.orderDate}<br />
                Shipping Address: {order.shippingAddress}<br />
                <button>Delete Button</button>
                <br /> <br />
              </li>)
          }
        </ul>
        <br /> <br />
        <h3>Manage Products</h3>
        <ul>
          {
            this.props.products.map(product =>
              <li key={product.id}>
                Product: {product.productName}<br />
                Update Product |  Delete Product
                <br /> <br />
              </li>)
          }
        </ul>
        <br />
        <h3>Users</h3>
      </div >
    )
  }
}

const mapStateToProps = state => ({ users: state.users, orders: state.orders, products: state.products });
export default connect(mapStateToProps)(Admin);



