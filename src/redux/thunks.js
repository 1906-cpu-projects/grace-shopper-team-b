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

export const addProductThunk = () => {
  // Add Product Thunk
};

export const updateProductThunk = (product) => {
  console.log('product', product)
  return async dispatch => {
    const updated = (await axios.put(`/api/products/${product.id}`, product)).data
    dispatch(updateProductAction(updated))
  }
  //Update Product Thunk
};

export const deleteProductThunk = () => {
  //Delete Product Thunk
};

////////////////////////     USERS - THUNKS    //////////////////////////

export const setUsersThunk = () => {
  return async dispatch => {
    const allUsers = (await axios.get('/api/users')).data;
    // console.log('THUNKS ', allUsers);
    dispatch(setUsersAction(allUsers));
  };
};

export const addNewUser = newUser => {
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

export const deleteUserThunk = () => {
  //Delete User Thunk
};

////////////////////////     ORDERS - THUNKS    //////////////////////////

export const setOrdersThunk = () => {
  return async dispatch => {
    const allOrders = (await axios.get('/api/orders')).data;
    dispatch(setOrdersAction(allOrders));
  };
};

export const updateOrderThunk = order => {
  console.log('order', order)
  return async dispatch => {
    const updated = (await axios.put(`/api/orders/${order.id}`, order)).data;
    console.log(updated)
    dispatch(updateOrder(updated));
  };
};

export const deleteOrderThunk = () => {
  //Delete Order
};

// export const setOrderThunk = () => {
//   return dispatch => {
//     const order = (await axios.get(`/api/orders/${order.id}`)).data
//     dispatch(set)
//   }
// }

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
  console.log('cart', cartItem);
  return async dispatch => {
    const updated = (await axios.put(
      `/api/orderProducts/${cartItem.id}`,
      cartItem
    )).data;
    console.log('updated', updated);
    dispatch(updateOrderProduct(updated));
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
