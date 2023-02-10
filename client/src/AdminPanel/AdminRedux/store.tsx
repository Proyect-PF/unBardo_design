import { createStore, applyMiddleware } from "redux";
import adminReducer from "./reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(
  adminReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
