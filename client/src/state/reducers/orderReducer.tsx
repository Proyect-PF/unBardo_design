import { ActionType } from '../action-types';
import { ActionOrderCheckout } from '../actions';
import { OrderDetails } from '../../types/types';

export interface OrderState {
  order: OrderDetails | [];
  orderData?: OrderDetails;
  error?: string | null;
}

const initialOrderState: OrderState = {
  order: [],
};

const orderDetailsReducer = (
  state: OrderState = initialOrderState,
  action: ActionOrderCheckout
) => {
  switch (action.type) {
    case ActionType.GET_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        orderData: action.payload,
        error: null,
      };
    case ActionType.GET_ORDER_DETAILS_FAILURE:
      return {
        ...state,
        orderData: initialOrderState.orderData,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default orderDetailsReducer;
