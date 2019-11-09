import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import {
  deleteOrderProductsThunk,
  updateOrderProductThunk,
  setOrderProductsThunk,
  setOrdersThunk,
  setProductsThunk,
  setUsersThunk
} from '../redux/store';
import axios from 'axios';
import { updateOrderThunk, updateProductThunk } from '../redux/thunks';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

class _Cart extends React.Component {
  constructor(props) {
    super();
    this.state = {
      id: '',
      userId: '',
      status:'',
      total:'',
      items:[]
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.updateInventoryFromDelete = this.updateInventoryFromDelete.bind(this);
    this.updateInventoryFromQuantity = this.updateInventoryFromQuantity.bind(this);
    this.changePage = this.changePage.bind(this)
  }
  async componentDidMount(props) {
    await this.props.setOrders()
    const order = this.props.orders.find(order => order.status==='cart' && order.userId===this.props.match.params.id)
    // const order = (await axios.get(`api/orders/${this.props.match.params.id}/cart`)).data;
    // console.log('order in componentDidmount', order)
    this.setState({
      id: order.id,
      userId: order.userId,
      status: order.status,
      total: order.total,
      items: order.items
    });
  }
  deleteItem(id) {
    this.props.deleteItem(id);
    this.setState({
      items: this.state.items.filter(item => item.id !== id)
    })
  }
  changePage(){
    window.location.hash = `#/users/${this.props.match.params.id}/checkout`
  }
  updateItem(item) {
    console.log('updateItem', item)
    this.props.updateItem(item);
    this.setState({
      items: this.state.items.filter(thing => thing.id=== item.id ? item: thing)
    })
    console.log('state', this.state)
  }
  updateInventoryFromQuantity(item, number){
    let updated ={};
    if(number > item.quantity){
      updated = {...item.product, inventory: item.product.inventory -(number-item.quantity)}
    }
    if(number < item.quantity){
      updated = {...item.product, inventory: item.product.inventory + (item.quantity -number )}
    }
    this.props.updateInventory(updated)

  }
  updateInventoryFromDelete(product, number){
    const updated = {...product, inventory: (product.inventory + number)}
    this.props.updateInventory(updated)
  }
  updateOrder(cartTotal){
    this.props.updateOrder({...this.state, total: cartTotal })
  }
  render() {
    const { id, items } = this.state;
    const { auth, orders } = this.props;
    if (id === undefined) {
      return (
        <div>
          You have gone through the chekout process for your previous order and have no active cart at this time. <br/>
          If you wish to continue to shop, take a look at our {<Link to='/products'>Products</Link>}
        </div>);
    }
    const totalItems = items.reduce((sum, item) => sum + Number(item.quantity),0 );
    const itemsCount = total => {
      if (total === 1) {
        return '1 item';
      }
      if (total) {
        return `${total} items`;
      } else return '0 items';
    };
    const totalPrice = items
      .reduce((sum, item) => sum + Number(item.subTotal), 0)
      .toFixed(2);
    return (
      <div>
        <h1>{auth.firstName}'s Shopping Cart</h1>
        <br />
            Order # {id} <br />
            Order Status: In Progress...
          <div id="cartProducts">
            {items.map(item => {
              const inventoryNumber = [];
              for(let i=1; i<=item.product.inventory+item.quantity; i++){
                inventoryNumber.push(i)
              }
                return (
                  <div key={item.id} id="orderProducts">
                    <div>
                      <img height="150" width="150" src={item.product.imageURL} />
                    </div>
                    <div>
                      Product Name: {item.product.productName} <br />
                      Description: {item.product.description} <br />
                      Price: ${item.product.price}
                      <br />
                      Quantity
                      <select onChange={(ev)=> {
                        this.updateItem({...item, quantity: ev.target.value, subTotal: ev.target.value*Number(item.price)})
                        this.updateInventoryFromQuantity(item, ev.target.value)

                        location.reload()
                        }}>
                        {
                          inventoryNumber.map(number => (
                            <option key={number} value={number} selected={item.quantity=== number}>{number}</option>
                          ))
                        }
                      </select>
                      <br/>
                      {item.product.inventory < 6
                        ? `Only ${item.product.inventory} left in stock - order soon`
                        : ''}
                      <br />
                      <button className="btn btn-outline-success" onClick={() => {
                        this.deleteItem(item.id)
                        this.updateInventoryFromDelete(item.product, item.quantity)
                        this.updateOrder((Number(totalPrice)))
                      }}>
                        Delete Item{' '}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        <div id="total">
          <h5>
            Total ({itemsCount(totalItems)}
            ): ${totalPrice}
          </h5>
          <br/>
          Please refresh page for accruate portroyal of cart! Thank you!
          <button
            className="btn btn-outline-success"
            onClick={()=> {
              this.updateOrder(Number(totalPrice))
              console.log('orders after update', orders)
              this.changePage()
            }}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    orders: state.orders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOrders: () => dispatch(setOrdersThunk()),
    deleteItem: id => dispatch(deleteOrderProductsThunk(id)),
    updateItem:  item => dispatch(updateOrderProductThunk(item)),
    updateOrder: (order) => dispatch(updateOrderThunk(order)),
    updateInventory: product => dispatch(updateProductThunk(product))
  };
};

const Cart = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Cart);

export default Cart;
