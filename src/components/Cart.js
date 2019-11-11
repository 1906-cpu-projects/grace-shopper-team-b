import React from 'react';
import { connect } from 'react-redux';
import {
  deleteOrderProductsThunk,
  updateOrderProductThunk,
  setOrdersThunk,

} from '../redux/store';
import { updateOrderThunk, updateProductThunk } from '../redux/thunks';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import {toast } from 'react-toastify';
import {totalPrice, totalItems, itemsCount} from '../utilities/cart'


toast.configure()

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
    this.completeOrder = this.completeOrder.bind(this);
    this.updateInventoryFromDelete = this.updateInventoryFromDelete.bind(this);
    this.updateInventoryFromQuantity = this.updateInventoryFromQuantity.bind(this);
    this.changePage = this.changePage.bind(this);
    this.handleToken = this.handleToken.bind(this);
  }
  async componentDidMount(props) {
    await this.props.setOrders()
    // const order = this.props.orders.find(order => order.status === 'cart' && order.userId === this.props.match.params.id)
    const order = (await axios.get(`/api/orders/${this.props.match.params.id}/cart`)).data
    this.setState({
      id: order.id,
      userId: order.userId,
      status: order.status,
      total: order.total,
      items: order.items,
      payment:''
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
    this.props.updateItem(item);
    this.setState({
      items: this.state.items.filter(thing => thing.id=== item.id ? item : thing)
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
    console.log('cartTotal', cartTotal)
    this.setState({ total: cartTotal})
    this.props.updateOrder({...this.state, total: cartTotal })
  }
  completeOrder(){
    this.props.updateOrder({...this.state, status: 'completed' })
  }
  async handleToken(token){
    const order = this.props.orders.find(order => order.status==='cart' && order.userId===this.props.match.params.id)
    const response = await axios.post('/api/checkout', {
      token,
      order
    })
    const {status} = response.data;
    if(status==='success'){
      toast('Success! Payment went through.', {type: 'success'})
      // this.setState({paymnent: 'completed'})
      this.completeOrder()
      this.changePage()
    } else{
      toast('Something went wrong!', {type: 'error'})
    }
  }
  render() {
    const { id, items} = this.state;
    const { auth, orders } = this.props;
    const order = this.props.orders.find(order => order.status === 'cart' && order.userId === this.props.match.params.id)
    console.log('state', this.state)
    if (id === undefined) {
      return (
        <div>
          You have gone through the chekout process for your previous order and have no active cart at this time. <br/>
          If you wish to continue to shop, take a look at our {<Link to='/products'>Products</Link>}
        </div>);
    }
        const cartTotal = totalPrice(items);
    return (
      <div>
        <h2>{auth.firstName}'s Shopping Cart</h2>
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
                        console.log('items', items)
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
                        this.setState({total: totalPrice})
                        this.updateInventoryFromDelete(item.product, item.quantity)
                        this.updateOrder((Number(totalPrice)-Number(item.subTotal)))
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
            Total ({itemsCount(totalItems(items))}
            ): ${totalPrice(items)}
          </h5>
          Please update cart total for accruate portroyal of cart! Thank you!
          <button onClick={()=>{
            this.setState({total: cartTotal})
            this.updateOrder(cartTotal)
          }}>
          Update Cart Total</button>
          <StripeCheckout
          stripeKey='pk_test_G4F5UhFtJcLZieeW0kr1MQQa00ul9VeIdT'
          token={this.handleToken}
          amount={totalPrice*100}
          name={`Order ID#${id}`}/>
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

