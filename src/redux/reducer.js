import { combineReducers } from 'redux';

import {
  SET_AUTH, SET_PRODUCTS, SET_USERS, UPDATE_USER, SET_ORDERS,
  SET_ORDERPRODUCTS, DELETE_ORDERPRODUCT, UPDATE_ORDERPRODUCT, ADD_ORDERPRODUCT
} from './constants';

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
      ...user,
      username: action.username,
      email: action.email,
      password: action.password,
      firstName: action.firstName,
      lastName: action.lastName,
      streetAddress: action.streetAddress,
      city: action.city,
      state: action.state,
      zipcode: action.zipcode,
      billStreetAddress: action.billStreetAddress,
      billCity: action.billCity,
      billState: action.billState,
      billZipcode: action.billZipcode
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
export const reducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  users: userReducer,
  orders: orderReducer,
  orderProducts: orderProdutsReducer
});
