import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



class _Products extends Component {
  constructor() {
    super()
  }

  render() {
    const { products } = this.props;

    return (
      <div>
        <h1>Our Products</h1>
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
        </div>

      </div>
    )

  }

}


const Products = connect(({products}) => {
  return {
    products
  }
})(_Products)



export default Products;
