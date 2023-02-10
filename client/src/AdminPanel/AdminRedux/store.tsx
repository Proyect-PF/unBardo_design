import { createStore, applyMiddleware } from "redux";
import adminReducer from "./reducer";
import thunk from "redux-thunk";

export const store = createStore(adminReducer, {}, applyMiddleware(thunk));
