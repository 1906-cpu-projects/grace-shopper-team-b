import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteOrderThunk, deleteProductThunk } from "../redux/thunks";
import AdminProductUpdate from "../forms/AdminProductUpdate";

// Display users
// Delete a user
// Display product information
// Add new products
// Delete current products
// Update product information
// Display orders

class Admin extends React.Component {
  constructor() {
    super();
    this.state = {
      productName: "",
      price: "",
      inventory: "",
      imageURL: "",
      description: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const product = this.props.products.map(_product => _product);
    const { productName, price, inventory, imageURL, description } = product;
    this.setState({
      productName: productName,
      price: price,
      inventory: inventory,
      imageURL: imageURL,
      description: description
    });
  }
  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  handleSubmit(ev) {
    ev.preventDefault();
  }
  render() {
    return (
      <div>
        <div className={"container-admin"}>
          <h3>Manage Orders</h3>
          <ul className={"admin"}>
            {this.props.orders.map(order => (
              <li key={order.id}>
                Order Status: {order.status}
                <br />
                Items Ordered:
                <ul>
                  {order.items.map(item => (
                    <li key={item.id}>{item.product.productName}</li>
                  ))}
                </ul>
                Order Total: ${order.total}
                <br />
                Order placed on {order.orderDate}
                <br />
                Shipping Address: {order.shippingAddress}
                <br />
                <br />
                <button
                  className="btn btn-outline-danger"
                  onClick={ev => this.props.deleteOrder(order)}
                >
                  {" "}
                  Delete
                </button>
                <br /> <br />
              </li>
            ))}
          </ul>
        </div>
        <br /> <br />
        <h3>Manage Products</h3>
        <ul className={"adminProducts"}>
          {this.props.products.map(product => (
            <li key={product.id}>
              <div>
                <AdminProductUpdate id={product.id} product={product} />
                <button
                  className="btn btn-outline-danger"
                  onClick={ev => this.props.deleteProduct(product)}
                >
                  {" "}
                  Delete Product
                </button>
              </div>
              <br /> <br />
            </li>
          ))}
        </ul>
        <br />
        <h3>Users</h3>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  orders: state.orders,
  products: state.products
});
const mapDispatchToProps = dispatch => {
  return {
    deleteOrder: order => dispatch(deleteOrderThunk(order)),
    deleteProduct: product => dispatch(deleteProductThunk(product))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
