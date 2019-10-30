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

///////////////////////////////////////////////////////////////////////////
////////////////////////REDUX - ACTION CREATORS////////////////////////////
///////////////////////////////////////////////////////////////////////////

/////////////////////////PRODUCT ACTION CREATORS//////////////////////////
const setProductsAction = products => ({ type: SET_PRODUCTS, products });

/////////////////////////USERS ACTION CREATORS//////////////////////////
const setUsersAction = users => ({ type: SET_USERS, users });

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
    console.log('THUNKS ', allUsers);
    dispatch(setUsersAction(allUsers));
  };
};

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
  return state;
};

////////////////////////   REDUX - COMBINE REDUCERS    ////////////////////
const reducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  users: userReducer
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
  attemptLogin,
  attemptSessionLogin,
  logout
};
