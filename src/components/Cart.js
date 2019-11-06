import React from 'react';
import { connect } from 'react-redux';
import {
  deleteOrderProductsThunk,
  updateOrderProductThunk,
  setOrderProductsThunk,
  setOrdersThunk,
  setProductsThunk,
  setUsersThunk
} from '../redux/store';
import axios from 'axios';
import { updateOrderThunk } from '../redux/thunks';
import { Link } from 'react-router-dom'

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
    // this.updateOrder = this.updateOrder.bind(this);
  }
  async componentDidMount(props) {
    const order = (await axios.get(`api/orders/${this.props.match.params.id}/cart`)).data;
    // console.log('order', order)
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
  updateItem(item) {
    this.props.updateItem(item);
    this.setState({
      items: this.state.items.filter(thing => thing.id=== item.id ? item : thing)
    })
  }
  completeOrder(total){

    this.props.completeOrder({...this.state, total: total, status: 'completed'})
  }
  render() {
    const { id, items } = this.state;
    const { auth, orders } = this.props;
    // console.log('', items)
    // console.log('auth', auth)
    if (!auth) {
      return (
        <div>
          If you wish to continue to shop, take a look at our {<Link to='/products'>Products</Link>}
        </div>);
    }
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
        <div id="cart">
          <div>
            Order # {id} <br />
            Order Status: In Progress...
          </div>
          <div id="cartProducts">
            {items.map(item => {
              const inventoryNumber = [];
              for(let i=1; i<=item.product.inventory; i++){
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
                      <select onChange={(ev)=> this.updateItem({...item, quantity: ev.target.value, subTotal: ev.target.value*Number(item.price)})}>
                        {
                          inventoryNumber.map(number => (
                            <option key={number} value={number} selected={item.quantity=== number}>{number}</option>
                          ))
                        }
                      </select>
                      {item.product.inventory < 6
                        ? `Only ${item.product.inventory} left in stock - order soon`
                        : ''}
                      <br />
                      <button className="btn btn-outline-success" onClick={() => this.deleteItem(item.id)}>
                        Delete Item{' '}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div id="total">
          <h5>
            Total ({itemsCount(totalItems)}
            ): ${totalPrice}
          </h5>
          <br/>
          <button
            className="btn btn-outline-success"
            onClick={()=> {
              this.completeOrder(totalPrice)
            }}
          >
            {<Link to={`/users/${auth.id}/checkout`}>Proceed to Checkout</Link>}
          </button>
        </div>
      </div>
      );
  }
}

const mapStateToProps = ({ auth, orders }) => {
  return {
    auth,
    orders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: id => dispatch(deleteOrderProductsThunk(id)),
    updateItem:  item => dispatch(updateOrderProductThunk(item)),
    completeOrder: (order) => dispatch(updateOrderThunk(order))
  };
};

const Cart = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Cart);

export default Cart;
