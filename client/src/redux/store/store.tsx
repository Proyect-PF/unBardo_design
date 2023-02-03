import { combineReducers, createStore } from 'redux';
import { productReducer } from '../reducers/index';

const rootReducer = combineReducers({
  product: productReducer,
});

export const store = createStore(rootReducer);