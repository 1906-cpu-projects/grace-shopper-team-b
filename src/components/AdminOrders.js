import React from "react";
import { connect } from "react-redux";
import { deleteOrderThunk } from "../redux/thunks";

class Admin extends React.Component {
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
                  {order.items.map(item =>
                    item.product === null ? (
                      "Product no longer available"
                    ) : (
                      <li key={item.id}>{item.product.productName}</li>
                    )
                  )}
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.orders
});
const mapDispatchToProps = dispatch => {
  return {
    deleteOrder: order => dispatch(deleteOrderThunk(order))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
