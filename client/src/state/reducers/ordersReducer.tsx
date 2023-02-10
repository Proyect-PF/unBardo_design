import { ActionType } from "../action-types";
import { ActionOrders } from "../actions";
import { OrderState } from "../types";

const initialState: OrderState = {
  allOrders: [],
  order: { id: 0, fullname: "", email: "", createdAt: "", status: "" },
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
    case ActionType.GET_ORDER_BY_ID:
      return {
        ...state,
        order: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default ordersReducer;
