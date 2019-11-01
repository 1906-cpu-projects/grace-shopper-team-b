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
const DELETE_ORDERPRODUCT = 'DELETE_ORDERPRODUCT';
const UPDATE_ORDERPRODUCT = 'UPDATE_ORDERPRODUCT';
const ADD_ORDERPRODUCT = 'ADD_ORDERPRODUCT';

///////////////////////////////////////////////////////////////////////////
////////////////////////REDUX - ACTION CREATORS////////////////////////////
///////////////////////////////////////////////////////////////////////////

/////////////////////////PRODUCT ACTION CREATORS//////////////////////////
const setProductsAction = products => ({ type: SET_PRODUCTS, products });

/////////////////////////USERS ACTION CREATORS//////////////////////////
const setUsersAction = users => ({ type: SET_USERS, users });
const updateUserAction = (user) => {
  return {
    type: UPDATE_USER, id: user.id, username: user.username, email: user.email, password: user.password, firstName: user.firstName, lastName: user.lastName, streetAddress: user.streetAddress, city: user.city, state: user.state, zipcode: user.zipcode, billStreetAddress: user.billStreetAddress, billCity: user.billCity, billState: user.billState, billZipcode: user.billZipcode, wishlist: user.wishlist
  };
}

/////////////////////////ORDER ACTION CREATORS//////////////////////////
const setOrdersAction = orders => ({ type: SET_ORDERS, orders });
const setOrderProducts = orderProducts => ({ type: SET_ORDERPRODUCTS, orderProducts });
const deleteOrderProducts = id => ({ type: DELETE_ORDERPRODUCT, id });
const updateOrderProduct = orderProduct => ({ type: UPDATE_ORDERPRODUCT, orderProduct });
const addOrderProduct = orderProduct => ({ type: ADD_ORDERPRODUCT, orderProduct });

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

const updateUserThunk = (id, username, email, password, firstName, lastName, streetAddress, city, state, zipcode, billStreetAddress, billCity, billState, billZipcode, wishlist) => {
  const user = {
    id: id,
    username: username,
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    streetAddress: streetAddress,
    city: city,
    state: state,
    zipcode: zipcode,
    billStreetAddress: billStreetAddress,
    billCity: billCity,
    billState: billState,
    billZipcode: billZipcode,
    wishlist: wishlist
  }
  return async (dispatch) => {
    await axios.put(`/api/users/${user.id}`, {
      username: user.username,
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      streetAddress: user.streetAddress,
      city: user.city,
      state: user.state,
      zipcode: user.zipcode,
      billStreetAddress: user.billStreetAddress,
      billCity: user.billCity,
      billState: user.billState,
      billZipcode: user.billZipcode,
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

const deleteOrderProductsThunk = (id) => {
  return async dispatch => {
    await axios.delete(`/api/orderProducts/${id}`);
    dispatch(deleteOrderProducts(id))
  }
}

const updateOrderProductThunk = (cartItem) => {
  return async dispatch => {
    const updated = (await axios.put(`/api/orderProducts/${cartItem.id}`, cartItem)).data
    dispatch(updateOrderProduct(updated))
  }
}

const addOrderProductThunk = (cartItem) => {
  return async dispatch => {
    const item = (await axios.post('/api/orderProducts', cartItem)).data
    dispatch(addOrderProduct(item))
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
    return state.map(user => action.id === user.id ? {
      ...user, username: action.username, email: action.email, password: action.password, firstName: action.firstName, lastName: action.lastName, streetAddress: action.streetAddress, city: action.city, state: action.state, zipcode: action.zipcode, billStreetAddress: action.billStreetAddress, billCity: action.billCity, billState: action.billState, billZipcode: action.billZipcode, wishlist: action.wishlist
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
  if (action.type === DELETE_ORDERPRODUCT) {
    state = state.filter(item => item.id !== action.id)
  }
  if (action.type === UPDATE_ORDERPRODUCT) {
    state = state.map(item => item.id === action.item.id ? action.item : item)
  }
  if (action.type === ADD_ORDERPRODUCT) {
    state = [...state, action.orderProduct]
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
  deleteOrderProductsThunk,
  updateOrderProductThunk,
  attemptLogin,
  attemptSessionLogin,
  logout
};
