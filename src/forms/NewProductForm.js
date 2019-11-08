import React from "react";
import { connect } from "react-redux";
import { addProductThunk } from "../redux/thunks";

class NewProductForm extends React.Component {
  constructor() {
    super();
    this.state = {
      productName: "",
      description: "",
      price: "",
      imageURL: "",
      inventory: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(ev) {
    console.log(ev.target.value);
    this.setState({
      [ev.target.name]: ev.target.value
    });
  }
  handleSubmit(ev) {
    ev.preventDefault();
    const product = this.state;
    console.log("PRODUCT ", product);
    this.props.addProduct(product);
    this.setState({
      productName: "",
      description: "",
      price: "",
      imageURL: "",
      inventory: ""
    });
  }
  render() {
    return (
      <div>
        <h3> Add a new product</h3>
        <form method="post" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              className="form-control"
              value={this.state.productName}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              className="form-control"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="price"
              placeholder="Price"
              className="form-control"
              value={this.state.price}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="imageURL"
              placeholder="Image Link"
              className="form-control"
              value={this.state.imageURL}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="inventory"
              placeholder="Inventory"
              className="form-control"
              value={this.state.inventory}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type="submit" className="btn btn-outline-primary">
              Add New Product
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.products
});
const mapDispatchToProps = dispatch => {
  return {
    addProduct: product => dispatch(addProductThunk(product))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProductForm);
