import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class _Products extends Component {
  constructor() {
    super();
  }

  render() {
    const { products } = this.props;

    return (
      <div className={"container"}>
        <h1>Our Products</h1>
<<<<<<< HEAD
        <div id='products'>
          {
            products.map(product => <div key={product.id}> <br />
              Product Name: {product.productName} <br />
              Description: {product.description} <br />
              Price: ${product.price} <br />
              Amount In Stock: {product.inventory} <br />
              Product Image: <br /> <img height="200" width="200" src={product.imageURL} /> <br />
              <button>Add to Cart</button>
            </div>
            )
          }
||||||| merged common ancestors
        <div id='products'>
          {
            products.map(product => <div key={product.id}> <br/>
                Product Name: {product.productName} <br />
                Description: {product.description} <br />
                Price: ${product.price} <br />
                Amount In Stock: {product.inventory} <br/>
                Product Image: <br /> <img height="200" width="200" src={product.imageURL} /> <br />
                <button>Add to Cart</button>
              </div>
            )
          }
=======
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
              <button type="submit" className="btn btn-outline-success">
                Add to Cart
              </button>
            </div>
          ))}
>>>>>>> 12641003e9a7583c02906d554293e13fae10848c
        </div>
      </div>
    );
  }
}

<<<<<<< HEAD

const Products = connect(({ products }) => {
||||||| merged common ancestors

const Products = connect(({products}) => {
=======
const Products = connect(({ products }) => {
>>>>>>> 12641003e9a7583c02906d554293e13fae10848c
  return {
    products
  };
})(_Products);

export default Products;
