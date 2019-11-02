import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addOrderProductThunk } from './store';

class _Products extends Component {
  constructor() {
    super();
    this.addToCart = this.addToCart.bind(this);
  }
  async addToCart (item){
    // console.log('item added to cart', item);
    await this.props.addToCart(item)
  }
  render() {
    const { products, auth } = this.props;
    console.log('auth', auth)
    return (
      <div>
        <h1>Our Products</h1>
        <div id="products">
          {products.map(product => (
            <div key={product.id}>
              {' '}
              <br />
              Product Name: {product.productName} <br />
              Description: {product.description} <br />
              Price: ${product.price} <br />
              Amount In Stock: {product.inventory} <br />
              Product Image: <br />{' '}
              <img height="200" width="200" src={product.imageURL} /> <br />
              <br />
              <button type="submit" className="btn btn-outline-success" onClick={ () => this.addToCart({
                quantity: 1,
                price: product.price,
                subTotal: product.price,
                productId: product.id,
                userId: auth.id,
                orderId: ''
              })}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const dispatchToProps = dispatch => {
  return ({
    addToCart: async (item) => dispatch(addOrderProductThunk(item))
  })
}

const Products = connect(({ products, auth }) => {
  return {
    products,
    auth
  };
}, dispatchToProps)(_Products);

export default Products;
