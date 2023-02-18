import React from 'react';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import Products from './containers/Products';
import reducer from './reducers/reducer';

const rootReducer = combineReducers({
  reducer,
});
const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware),
);

export default (props => (
  <Provider store={store}>
    <Products {...props} />
  </Provider>
));