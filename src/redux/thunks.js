import axios from 'axios';
import { SET_AUTH } from './constants';
import {
  setProductsAction,
  setUsersAction,
  setOrdersAction,
  setOrderProducts,
  setOrderHistoryAction,
  addOrderProduct,
  addProductAction,
  addUserAction,
  updateUserAction,
  updateOrderProduct,
  updateOrder,
  updateProductAction,
  deleteOrderProducts,
  deleteProductAction,
  deleteUserAction,
  deleteOrderAction
} from './actions';

////////////////////////     REDUX - THUNKS    ////////////////////////////
///////////////////////////////////////////////////////////////////////////

////////////////////////     AUTH - THUNKS    //////////////////////////

export const attemptLogin = (credentials, history) => {
  return async dispatch => {
    const auth = (await axios.post('/api/sessions', credentials)).data;
    dispatch({ type: SET_AUTH, auth });
    history.push('/');
  };
};

export const attemptSessionLogin = () => {
  return async dispatch => {
    const auth = (await axios.get('/api/sessions')).data;
    dispatch({ type: SET_AUTH, auth });
  };
};

export const logout = () => {
  return async dispatch => {
    await axios.delete('/api/sessions');
    dispatch({ type: SET_AUTH, auth: {} });
  };
};

////////////////////////     PRODUCT - THUNKS    //////////////////////////

export const setProductsThunk = () => {
  return async dispatch => {
    const allProducts = (await axios.get('/api/products')).data;
    dispatch(setProductsAction(allProducts));
  };
};

export const addProductThunk = product => {
  console.log('THUNKS ', product);
  return async dispatch => {
    const newProduct = await axios.post('/api/products', product);
    dispatch(addProductAction(newProduct.data));
  };
};

export const updateProductThunk = product => {
  return async dispatch => {
    await axios.put(`/api/products/${product.id}`, {
      productName: product.productName,
      description: product.description,
      price: product.price,
      imageURL: product.imageURL,
      inventory: product.inventory
    }).data;

    dispatch(updateProductAction(product));
  };
};

export const deleteProductThunk = product => {
  return async dispatch => {
    await axios.delete(`/api/products/${product.id}`);
    dispatch(deleteProductAction(product));
  };
};

////////////////////////     USERS - THUNKS    //////////////////////////

export const setUsersThunk = () => {
  return async dispatch => {
    const allUsers = (await axios.get('/api/users')).data;
    // console.log('THUNKS ', allUsers);
    dispatch(setUsersAction(allUsers));
  };
};

export const addNewUserThunk = newUser => {
  return async dispatch => {
    const user = (await axios.post('/api/users', newUser)).data;
    dispatch(addUserAction(user));
  };
};

export const updateUserThunk = (
  id,
  username,
  email,
  password,
  firstName,
  lastName,
  streetAddress,
  city,
  state,
  zipcode,
  billStreetAddress,
  billCity,
  billState,
  billZipcode
) => {
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
    billZipcode: billZipcode
  };
  return async dispatch => {
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
      billZipcode: user.billZipcode
    }).data;
    dispatch(updateUserAction(user));
  };
};

export const deleteUserThunk = user => {
  return async dispatch => {
    await axios.delete(`/api/users/${user.id}`);
    dispatch(deleteUserAction(user));
  };
};

////////////////////////     ORDERS - THUNKS    //////////////////////////

export const setOrdersThunk = () => {
  return async dispatch => {
    const allOrders = (await axios.get('/api/orders')).data;
    dispatch(setOrdersAction(allOrders));
  };
};

export const updateOrderThunk = order => {
  return async dispatch => {
    await axios.put(`/api/orders/${order.id}`, {
      id: order.id,
      total: order.total,
      items: order.items
    }).data;
    dispatch(updateOrder(order));
  };
};

export const deleteOrderThunk = order => {
  return async dispatch => {
    await axios.delete(`/api/orders/${order.id}`);
    dispatch(deleteOrderAction(order));
  };
};

////////////////////////     ORDERED PRODUCTS - THUNKS    //////////////////////////
export const setOrderProductsThunk = () => {
  return async dispatch => {
    const allOrderProducts = (await axios.get('/api/orderProducts')).data;
    dispatch(setOrderProducts(allOrderProducts));
  };
};

export const addOrderProductThunk = payload => {
  return async dispatch => {
    const item = (await axios.post('/api/orderProducts', payload)).data;
    dispatch(addOrderProduct(item));
  };
};

export const updateOrderProductThunk = cartItem => {
  // console.log("cart item in THunKS", cartItem);
  return async dispatch => {
    await axios.put(`/api/orderProducts/${cartItem.id}`, {
      id: cartItem.id,
      quantity: cartItem.quantity,
      subTotal: cartItem.subTotal
    }).data;
    dispatch(updateOrderProduct(cartItem));
  };
};

export const deleteOrderProductsThunk = id => {
  return async dispatch => {
    await axios.delete(`/api/orderProducts/${id}`);
    dispatch(deleteOrderProducts(id));
  };
};

////////////////////////     ORDER HISTORY - THUNKS    //////////////////////////
export const setOrderHistoryThunk = () => {
  return async dispatch => {
    const allOrderHistory = (await axios.get('/api/completedorders/')).data;
    dispatch(setOrderHistoryAction(allOrderHistory));
  };
};

export const setUserOrderHistoryThunk = () => {
  return async dispatch => {
    const allOrderHistory = (await axios.get('/api/completedorders/')).data;
    dispatch(setOrderHistoryAction(allOrderHistory));
  };
};
