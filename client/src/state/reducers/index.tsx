import { combineReducers } from "redux";
import productReducer from "./productReducer";

//AL: multiple reducers will be combined here, this leads to a cleaner modularization
const reducers = combineReducers({
  products: productReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
