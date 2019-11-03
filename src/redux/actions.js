import { SET_PRODUCTS, SET_USERS, UPDATE_USER, SET_ORDERS, SET_ORDERPRODUCTS, DELETE_ORDERPRODUCT, UPDATE_ORDERPRODUCT, ADD_ORDERPRODUCT } from './constants';

// ACTION CREATORS

/////////////////////////USERS ACTION CREATORS//////////////////////////
export const setProductsAction = products => ({ type: SET_PRODUCTS, products });
export const setUsersAction = users => ({ type: SET_USERS, users });
export const updateUserAction = (user) => {
  return {
    type: UPDATE_USER,
    id: user.id,
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
  };
};

/////////////////////////ORDER ACTION CREATORS//////////////////////////
export const setOrdersAction = orders => ({ type: SET_ORDERS, orders });
export const setOrderProducts = orderProducts => ({ type: SET_ORDERPRODUCTS, orderProducts });
export const deleteOrderProducts = id => ({ type: DELETE_ORDERPRODUCT, id });
export const updateOrderProduct = orderProduct => ({ type: UPDATE_ORDERPRODUCT, orderProduct });
export const addOrderProduct = orderProduct => ({ type: ADD_ORDERPRODUCT, orderProduct });
