import { combineReducers, createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

//////////////////////////////////////////////////////////////////////////
/////////////////////////REDUX - ACTION TYPES/////////////////////////////
//////////////////////////////////////////////////////////////////////////

/////////////////////////AUTH - ACTION TYPES//////////////////////////
const SET_AUTH = 'SET_AUTH';

/////////////////////////PRODUCTS - ACTION TYPES//////////////////////////
const SET_PRODUCTS = 'SET_PRODUCTS';

/////////////////////////USERS- ACTION TYPES//////////////////////////
const SET_USERS = 'SET_USERS';
const UPDATE_USER = 'UPDATE_USER';

/////////////////////////ORDERS- ACTION TYPES//////////////////////////
const SET_ORDERS = 'SET_ORDERS';
const SET_ORDERPRODUCTS = 'SET_ORDERPRODUCTS';

///////////////////////////////////////////////////////////////////////////
////////////////////////REDUX - ACTION CREATORS////////////////////////////
///////////////////////////////////////////////////////////////////////////

/////////////////////////PRODUCT ACTION CREATORS//////////////////////////
const setProductsAction = products => ({ type: SET_PRODUCTS, products });

/////////////////////////USERS ACTION CREATORS//////////////////////////
const setUsersAction = users => ({ type: SET_USERS, users });
const updateUserAction = (user) => {
  console.log("UPDATE USER ACTION ", user)
  return { type: UPDATE_USER, id: user.id, username: user.username, email: user.email, password: user.password, firstName: user.firstName, lastName: user.lastName, shippingAddress: user.shippingAddress, billingAddress: user.billingAddress, wishlist: user.wishlist };
}

/////////////////////////ORDER ACTION CREATORS//////////////////////////
const setOrdersAction = orders => ({ type: SET_ORDERS, orders });
const setOrderProducts = orderProducts => ({ type: SET_ORDERPRODUCTS, orderProducts });

///////////////////////////////////////////////////////////////////////////
////////////////////////     REDUX - THUNKS    ////////////////////////////
///////////////////////////////////////////////////////////////////////////

////////////////////////     AUTH - THUNKS    //////////////////////////

const attemptLogin = (credentials, history) => {
  return async dispatch => {
    const auth = (await axios.post('/api/sessions', credentials)).data;
    dispatch({ type: 'SET_AUTH', auth });
    history.push('/');
  };
};

const attemptSessionLogin = () => {
  return async dispatch => {
    const auth = (await axios.get('/api/sessions')).data;
    dispatch({ type: 'SET_AUTH', auth });
  };
};

const logout = () => {
  return async dispatch => {
    await axios.delete('/api/sessions');
    dispatch({ type: 'SET_AUTH', auth: {} });
  };
};

////////////////////////     PRODUCT - THUNKS    //////////////////////////

const setProductsThunk = () => {
  return async dispatch => {
    const allProducts = (await axios.get('/api/products')).data;
    dispatch(setProductsAction(allProducts));
  };
};

////////////////////////     USERS - THUNKS    //////////////////////////

const setUsersThunk = () => {
  return async dispatch => {
    const allUsers = (await axios.get('/api/users')).data;
    // console.log('THUNKS ', allUsers);
    dispatch(setUsersAction(allUsers));
  };
};

const updateUserThunk = (id, username, email, password, firstName, lastName, shippingAddress, billingAddress, wishlist) => {
  const user = {
    id: id,
    username: username,
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    shippingAddress: shippingAddress,
    billingAddress: billingAddress,
    wishlist: wishlist
  }
  console.log("USER THUNKS ", user)
  return async (dispatch) => {
    await axios.put(`/api/users/${user.id}`, {
      username: user.username,
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      shippingAddress: user.shippingAddress,
      billingAddress: user.billingAddress,
      wishlist: user.wishlist
    }).data;
    // console.log('THUNKS ', allUsers);
    dispatch(updateUserAction(user));
  };
};

////////////////////////     ORDERS - THUNKS    //////////////////////////

const setOrdersThunk = () => {
  return async dispatch => {
    const allOrders = (await axios.get('/api/orders')).data;
    dispatch(setOrdersAction(allOrders));
  };
};

const setOrderProductsThunk = () => {
  return async dispatch => {
    const allOrderProducts = (await axios.get('/api/orderProducts')).data;
    dispatch(setOrderProducts(allOrderProducts))
  }
}

///////////////////////////////////////////////////////////////////////////
////////////////////////     REDUX - REDUCERS    //////////////////////////
///////////////////////////////////////////////////////////////////////////

////////////////////////   REDUX - AUTH REDUCER   ////////////////////

const authReducer = (state = {}, action) => {
  if (action.type === SET_AUTH) {
    state = action.auth;
  }
  return state;
};

////////////////////////   REDUX - PRODUCTS REDUCER   ////////////////////

const productReducer = (state = [], action) => {
  if (action.type === SET_PRODUCTS) {
    state = action.products;
  }
  return state;
};

////////////////////////   REDUX - USERS REDUCER   ////////////////////

const userReducer = (state = [], action) => {
  if (action.type === SET_USERS) {
    state = action.users;
  }
  if (action.type === UPDATE_USER) {
    console.log("ACTION ", action)
    return state.map(user => action.id === user.id ? {
      ...user, username: action.username, email: action.email, password: action.password, firstName: action.firstName, lastName: action.lastName, shippingAddress: action.shippingAddress, billingAddress: action.billingAddress, wishlist: action.wishlist
    } : user);
  }
  return state;
};

////////////////////////   REDUX - ORDERS REDUCER   ////////////////////

const orderReducer = (state = [], action) => {
  if (action.type === SET_ORDERS) {
    state = action.orders;
  }
  return state;
};

const orderProdutsReducer = (state = [], action) => {
  if (action.type === SET_ORDERPRODUCTS) {
    state = action.orderProducts;
  }
  return state;
};

////////////////////////   REDUX - COMBINE REDUCERS    ////////////////////
const reducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  users: userReducer,
  orders: orderReducer,
  orderProducts: orderProdutsReducer
});

//////////////////////////////////////////////////////////////////////////
////////////////////////  REDUX - CREATE STORE  ///////////////////////////
///////////////////////////////////////////////////////////////////////////

//REDUX STORE WITH MIDDLEWARE
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export { setProductsAction, setUsersAction };
export {
  setProductsThunk,
  setUsersThunk,
  updateUserThunk,
  setOrdersThunk,
  setOrderProductsThunk,
  attemptLogin,
  attemptSessionLogin,
  logout
};
