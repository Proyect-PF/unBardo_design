import { ActionType } from "../action-types";
import { ActionOrders } from "../actions";
import { OrderState } from "../types";

const initialState: OrderState = {
  allOrders: [],
};

const ordersReducer = (
  state: OrderState = initialState,
  action: ActionOrders
) => {
  switch (action.type) {
    case ActionType.GET_ALL_ORDERS:
      return {
        ...state,
        allOrders: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default ordersReducer;
