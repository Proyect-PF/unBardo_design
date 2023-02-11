import { combineReducers } from "redux";
import adminReducer from "../../AdminPanel/AdminRedux/reducer";
import checkoutReducer from "./checkoutReducer";
import ordersReducer from "./ordersReducer";
import productReducer from "./productReducer";
import userReducer from "./userReducer";

//AL: multiple reducers will be combined here, this leads to a cleaner modularization
const reducers = combineReducers({
  products: productReducer,
  user: userReducer,
  checkout: checkoutReducer,
  orders: ordersReducer,
  admin: adminReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
