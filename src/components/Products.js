import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { addOrderProductThunk, updateProductThunk, setProductsThunk } from '../redux/store';

class _Products extends Component {
  constructor() {
    super();
    this.addToCart = this.addToCart.bind(this);
    this.updateInventory= this.updateInventory.bind(this);
  }
  componentDidMount(){
    this.props.set
  }
  addToCart(item) {
    console.log('item added to cart', item);
    this.props.addToCart(item);
  }
  updateInventory(item){
    console.log('item for update', item )
    this.props.updateInventory({...item, inventory: item.inventory-1});
  }
  render() {
    const { products, auth } = this.props;
    return (
      <div>
        <h1>Our Products</h1>
        <div id="products">
          {products.map(product => (
            <div key={product.id}>
              {" "}
              <br />
              Product Name: {product.productName} <br />
              Description: {product.description} <br />
              Price: ${product.price} <br />
              Amount In Stock: {product.inventory} <br />
              Product Image: <br />{" "}
              <img height="200" width="200" src={product.imageURL} /> <br />
              <br />
              <button
                type="submit"
                className="btn btn-outline-success"
                onClick={() => {
                    this.addToCart({
                    quantity: 1,
                    price: product.price,
                    subTotal: product.price,
                    productId: product.id,
                    userId: auth.id,
                    orderId: ''
                    })
                    this.updateInventory(product)
                }}
              >
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
  return {
    addToCart: item => dispatch(addOrderProductThunk(item)),
    updateInventory:  item => dispatch(updateProductThunk(item)),
    setProducts: ()=> dispatch(setProductsThunk())
  };
};

const Products = connect(
  ({ products, auth }) => {
    return {
      products,
      auth
    };
  },
  dispatchToProps
)(_Products);

export default Products;
