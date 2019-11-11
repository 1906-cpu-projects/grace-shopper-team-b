import { combineReducers } from "redux";

import {
  SET_AUTH,
  SET_PRODUCTS,
  SET_USERS,
  SET_ORDERPRODUCTS,
  SET_ORDER_HISTORY,
  SET_ORDERS,
  ADD_ORDERPRODUCT,
  ADD_PRODUCT,
  ADD_USER,
  UPDATE_AUTH,
  UPDATE_USER,
  UPDATE_ORDER,
  UPDATE_ORDERPRODUCT,
  UPDATE_PRODUCT,
  DELETE_ORDERPRODUCT,
  DELETE_USER,
  DELETE_PRODUCT,
  DELETE_ORDER
} from "./constants";

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
  if (action.type === ADD_PRODUCT) {
    return [...state, action.product];
  }
  if (action.type === UPDATE_PRODUCT) {
    return state.map(product =>
      action.id === product.id
        ? {
            ...product,
            productName: action.productName,
            description: action.description,
            price: action.price,
            imageURL: action.imageURL,
            inventory: action.inventory
          }
        : product
    );
  }
  if (action.type === DELETE_PRODUCT) {
    return state.filter(product => product.id !== action.product.id);
  }
  return state;
};

////////////////////////   REDUX - USERS REDUCER   ////////////////////

const userReducer = (state = [], action) => {
  if (action.type === SET_USERS) {
    state = action.users;
  }

  if (action.type === ADD_USER) {
    return [...state, action.user];
  }

  if (action.type === UPDATE_USER) {
    return state.map(user =>
      action.id === user.id
        ? {
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
          }
        : user
    );
  }
  if (action.type === DELETE_USER) {
    return state.filter(user => user.id !== action.user.id);
  }
  return state;
};

////////////////////////   REDUX - ORDERS REDUCER   ////////////////////

const orderReducer = (state = [], action) => {
  if (action.type === SET_ORDERS) {
    state = action.orders;
  }
  if (action.type === UPDATE_ORDER) {
    // console.log('order from reducer', action.order)
    state = state.map(order =>
      order.id === action.order.id ? action.order : order
    );
  }
  if (action.type === DELETE_ORDER) {
    return state.filter(order => order.id !== action.order.id);
  }
  return state;
};

const orderProdutsReducer = (state = [], action) => {
  if (action.type === SET_ORDERPRODUCTS) {
    state = action.orderProducts;
  }
  if (action.type === DELETE_ORDERPRODUCT) {
    state = state.filter(item => item.id !== action.id);
  }
  if (action.type === UPDATE_ORDERPRODUCT) {
    // console.log('orderProduct from reducer', action.orderProduct)

    state = state.map(item =>
      item.id === action.orderProduct.id ? action.orderProduct : item
    );
  }
  if (action.type === ADD_ORDERPRODUCT) {
    state = [...state, action.orderProduct];
  }
  // console.log('state from reducer', state)
  return state;
};

////////////////////////   REDUX - ORDER HISTORY REDUCER   ////////////////////

const orderHistoryReducer = (state = [], action) => {
  if (action.type === SET_ORDER_HISTORY) {
    state = action.orderHistory;
  }
  return state;
};

////////////////////////   REDUX - COMBINE REDUCERS    ////////////////////
export const reducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  users: userReducer,
  orders: orderReducer,
  orderProducts: orderProdutsReducer,
  orderHistory: orderHistoryReducer
});
