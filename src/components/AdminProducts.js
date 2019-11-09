import React from "react";
import { connect } from "react-redux";
import { deleteProductThunk } from "../redux/thunks";
import AdminProductUpdate from "../forms/AdminProductUpdate";

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
        <h3>Manage Products</h3>
        <h5 className="low-inventory">Low Inventory on:</h5>
        <ul className="low-inventory">
          {this.props.products.map(_product => {
            if (_product.inventory < 3) {
              return (
                <li key={_product.id}>
                  {_product.productName}: {_product.inventory} left.
                </li>
              );
            }
          })}
        </ul>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});
const mapDispatchToProps = dispatch => {
  return {
    deleteProduct: product => dispatch(deleteProductThunk(product))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
