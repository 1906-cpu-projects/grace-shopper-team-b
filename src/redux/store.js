import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  attemptLogin,
  attemptSessionLogin,
  logout,
  setProductsThunk,
  setUsersThunk,
  updateUserThunk,
  setOrdersThunk,
  setOrderProductsThunk,
  deleteOrderProductsThunk,
  updateOrderProductThunk,
  addOrderProductThunk
} from './thunks';

import { reducer } from './reducer';
import { setProductsAction, setUsersAction } from './actions'


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
  addOrderProductThunk,
  updateOrderProductThunk,
  attemptLogin,
  attemptSessionLogin,
  logout
};
