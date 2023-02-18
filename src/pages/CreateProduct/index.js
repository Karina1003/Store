import React from 'react';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import CreateProduct from './containers/CreateProduct';
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
        <CreateProduct {...props} />
    </Provider>
));