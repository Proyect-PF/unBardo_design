import { composeWithDevTools, composeWithDevToolsLogOnly } from '@redux-devtools/extension';
import { applyMiddleware, compose, createStore } from "redux";

import thunk from "redux-thunk";
import reducers from "./reducers";


export const store = createStore(
    reducers,
     composeWithDevToolsLogOnly(applyMiddleware(thunk)),
     );
