import React from "react";
import { connect } from "react-redux";
import { updateProductThunk } from "../redux/thunks";

class AdminUpdateProduct extends React.Component {
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
  componentDidMount() {
    const product = this.props.product;
    this.setState({
      productName: product.productName,
      description: product.description,
      price: product.price,
      imageURL: product.imageURL,
      inventory: product.inventory
    });
  }
  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  handleSubmit(ev) {
    ev.preventDefault();
    const product = {
      id: this.props.id,
      productName: this.state.productName,
      description: this.state.description,
      price: this.state.price,
      imageURL: this.state.imageURL,
      inventory: this.state.inventory
    };
    this.props.updateProduct(product);
    this.setState({
      productName: product.productName,
      description: product.description,
      price: product.price,
      imageURL: product.imageURL,
      inventory: product.inventory
    });
  }
  render() {
    const product = this.props.products.find(_product => {
      if (_product.id === this.props.id) {
        return _product;
      }
    });

    return (
      <div>
        <ul>
          <li>
            <div>
              Product: {product.productName}
              <br />
              Description: {product.description}
              <br />
              Price: ${product.price}
              <br />
              Image Link: {product.imageURL}
              <br />
              Inventory: {product.inventory}
              <br />
            </div>
            <br /> <br />
          </li>
        </ul>
        <ul>
          <li>
            <div>
              <form method="post" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Product Name</label>
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
                  <label>Description</label>
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
                  <label>Price</label>
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
                  <label>Image Link</label>
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
                  <label>Inventory</label>
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
                    Update
                  </button>
                </div>
              </form>
            </div>
            <br />
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({ products: state.products });
const mapDispatchToProps = dispatch => {
  return {
    updateProduct: product => dispatch(updateProductThunk(product))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminUpdateProduct);
