import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addOrderProductThunk, updateProductThunk, setProductsThunk } from '../redux/store';

class _ProductAZ extends Component {
  constructor() {
    super();
    this.addToCart = this.addToCart.bind(this);
    this.updateInventory= this.updateInventory.bind(this);
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

    const sorted = [...products].sort((a,b)=> (a.productName > b.productName) ? 1 : -1)
    console.log(sorted)
    return (
      <div className="containerFluid">

        <div className="sidebar">
          <h3>Filter by:</h3>
          <br/>
          <Link to="/products/A-Z">A-Z</Link>
          <br/>
          <br/>

          <Link to="/products/Price-High-Low">Highest Price - Lowest Price </Link>
          <br/>
          <br/>
          <Link to="/products/Price-Low-High">LowestPrice - Highest Price </Link>
          <br/>
          <br/>
        </div>
        <div id="products">
          {sorted.map(product => (
            <div key={product.id}>
              {" "}
              <br />
              <h2>{product.productName}</h2>
              <img height="200" width="200" src={product.imageURL} /> <br />
              <br />
              Price: ${product.price} <br />
              Amount In Stock: {product.inventory} <br />
              Description: {product.description} <br /><br />
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
                }}>
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

const ProductAZ = connect(
  ({ products, auth }) => {
    return {
      products,
      auth
    };
  },
  dispatchToProps
)(_ProductAZ);

export default ProductAZ;
